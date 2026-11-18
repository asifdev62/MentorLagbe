import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("mentorlagbe");

export type UserRole = "student" | "tutor";

export const auth = betterAuth({
  database: mongodbAdapter(db, {
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
      // Saved on the `user` document in MongoDB, e.g. { role: "tutor" }
      role: {
        type: "string",
        required: false,
        defaultValue: "student",
        input: true,
        // Never trust the client: anything other than "tutor" becomes "student".
        transform: {
          input: (value) => (value === "tutor" ? "tutor" : "student"),
        },
      },
    },
  },
});
