import { betterAuth } from "better-auth";
import { MongoClient, type Db } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  throw new Error("MONGODB_URL is not set");
}

type MongoGlobal = typeof globalThis & {
  __mentorlagbeMongoClient?: MongoClient;
  __mentorlagbeAuth?: AuthInstance;
};

const globalForMongo = globalThis as MongoGlobal;

/**
 * Serverless deployments can reuse a module across invocations. Cache the
 * client on `globalThis` so every route chunk shares one connection pool
 * instead of opening a new client per bundle.
 *
 * If the initial connection fails MongoDB closes the topology permanently.
 * Dropping the cached client/auth in that case lets the next request start
 * with a fresh connection instead of reusing a dead client and throwing
 * `MongoTopologyClosedError`.
 */
function createMongoClient(): MongoClient {
  const client = new MongoClient(mongoUrl as string, {
    maxPoolSize: 10,
    maxIdleTimeMS: 60_000,
    serverSelectionTimeoutMS: 10_000,
    connectTimeoutMS: 10_000,
  });

  globalForMongo.__mentorlagbeMongoClient = client;

  const resetIfCurrent = () => {
    if (globalForMongo.__mentorlagbeMongoClient === client) {
      globalForMongo.__mentorlagbeMongoClient = undefined;
      globalForMongo.__mentorlagbeAuth = undefined;
    }
  };

  client.on("close", resetIfCurrent);

  // Start connecting eagerly. The driver queues operations until this
  // resolves, so better-auth can use the db immediately.
  client.connect().catch((error) => {
    resetIfCurrent();
    console.error("MongoDB connection failed:", error);
  });

  return client;
}

function getMongoClient(): MongoClient {
  return (globalForMongo.__mentorlagbeMongoClient ??= createMongoClient());
}

function createAuth() {
  const client = getMongoClient();
  const database = client.db("mentorlagbe");

  return betterAuth({
    database: mongodbAdapter(database, {
      client,
    }),

    emailAndPassword: {
      enabled: true,
    },

    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    },

    user: {
      additionalFields: {
        role: {
          type: "string",
          required: false,
          defaultValue: "student",
          input: true,

          // Normal users cannot assign themselves admin role.
          transform: {
            input: (value) => (value === "tutor" ? "tutor" : "student"),
          },
        },
      },
    },
  });
}

type AuthInstance = ReturnType<typeof createAuth>;

export function getAuth(): AuthInstance {
  return (globalForMongo.__mentorlagbeAuth ??= createAuth());
}

/**
 * Force the next call to `getAuth()` / `db` to use a new MongoClient.
 * Used when a topology-closed error is detected at a call site.
 */
export function resetMongoConnection() {
  globalForMongo.__mentorlagbeMongoClient = undefined;
  globalForMongo.__mentorlagbeAuth = undefined;
}

export function isMongoTopologyClosedError(error: unknown): boolean {
  let current: unknown = error;

  for (let depth = 0; depth < 5 && current; depth++) {
    if (!(current instanceof Error)) return false;

    if (
      current.name === "MongoTopologyClosedError" ||
      current.message.includes("Topology is closed")
    ) {
      return true;
    }

    current = (current as Error & { cause?: unknown }).cause;
  }

  return false;
}

function wrapGetSession(api: AuthInstance["api"]) {
  return new Proxy(api, {
    get(target, property) {
      const value = Reflect.get(target, property, target);

      if (property !== "getSession" || typeof value !== "function") {
        return value;
      }

      return async (...args: unknown[]) => {
        try {
          return await (value as (...a: unknown[]) => unknown).apply(
            target,
            args
          );
        } catch (error) {
          if (!isMongoTopologyClosedError(error)) throw error;

          resetMongoConnection();
          const freshApi = getAuth().api;
          return (freshApi.getSession as (...a: unknown[]) => unknown)(...args);
        }
      };
    },
  });
}

/**
 * Kept as a proxy so existing `auth.api.getSession(...)` / `auth.handler`
 * imports keep working while the underlying instance can be rebuilt after a
 * connection failure.
 */
export const auth = new Proxy({} as AuthInstance, {
  get(_target, property) {
    const instance = getAuth();
    const value = Reflect.get(instance, property, instance);

    if (property === "api") {
      return wrapGetSession(value as AuthInstance["api"]);
    }

    if (property === "handler" && typeof value === "function") {
      return async (request: Request) => {
        try {
          return await (value as (request: Request) => Promise<Response>).call(
            instance,
            request
          );
        } catch (error) {
          if (!isMongoTopologyClosedError(error)) throw error;

          resetMongoConnection();
          return getAuth().handler(request);
        }
      };
    }

    return typeof value === "function" ? value.bind(instance) : value;
  },
  has(_target, property) {
    return property in getAuth();
  },
});

/**
 * Collection access is proxied through the current client. This is used by
 * the payment actions, which read/write MongoDB directly.
 */
export const db = new Proxy({} as Db, {
  get(_target, property) {
    const database = getMongoClient().db("mentorlagbe");
    const value = Reflect.get(database, property, database);
    return typeof value === "function" ? value.bind(database) : value;
  },
});

export type UserRole = "student" | "tutor" | "admin";
