# 🎓 MentorLagbe – Online Tuition Management Platform

MentorLagbe is a full-stack online tuition management platform that connects students, tutors, and guardians. Students can explore available tuition opportunities, apply for suitable jobs, and bookmark their favorite listings. Tutors can manage their applications and tuition activities, while administrators manage users and platform operations.

<div align="center">

### Find Tutors. Apply for Tuition. Learn Without Limits.

A modern full-stack tuition management platform connecting students, tutors, and guardians through a simple and organized online experience.

<br />

[🌐 Live Demo](https://mentor-lagbe-rouge.vercel.app/) · [💻 Frontend Repository](https://github.com/asifdev62/MentorLagbe) · [⚙️ Backend Repository](https://github.com/asifdev62/MentorLagbe-Server)

<br />

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-333333?style=for-the-badge)

</div>

---

### Homepage Preview

<div align="center">

![MentorLagbe Homepage](./public/images/homepage-preview.png)

</div>

---

## 📖 About The Project

**MentorLagbe** is a full-stack online tuition management platform designed to connect students, tutors, and guardians.

Students can explore approved tuition opportunities, search for suitable listings, submit applications, track application status, and bookmark their favorite tuitions.

Tutors can explore tuition opportunities and manage their applications, while administrators can manage users, roles, and tuition listings.

The platform provides a role-based dashboard, secure authentication, and a structured interface to make the tuition searching and hiring process easier.

### 🔗 Project Links

| Resource | Link |
|---|---|
| 🌐 Live Website | [MentorLagbe Live Demo](https://mentor-lagbe-rouge.vercel.app/) |
| 💻 Frontend Source Code | [MentorLagbe Frontend](https://github.com/asifdev62/MentorLagbe) |
| ⚙️ Backend Source Code | [MentorLagbe Server](https://github.com/asifdev62/MentorLagbe-Server) |

---

## ✨ Features

### 👨‍🎓 Student Features

- 🎓 Browse approved tuition listings.
- 🔍 Search and filter tuitions by class, subject, location, and tuition type.
- 📄 View detailed tuition information.
- 📝 Apply for available tuition opportunities.
- 📊 Track submitted application status.
- 🔖 Bookmark favorite tuition listings.
- 🆓 Free plan supports up to 5 bookmarks.
- ⭐ Student Pro plan supports unlimited bookmarks.
- 👤 Manage personal profile.

### 👨‍🏫 Tutor Features

- 🔎 Explore available tuition opportunities.
- 📝 Apply for suitable tuition jobs.
- 📋 Manage submitted applications.
- 📊 Track application status.
- 👤 Manage profile information.

### 🛡️ Admin Features

- 👥 View registered users.
- ⚙️ Manage user roles.
- 📚 Manage tuition listings.
- 📊 Review and manage platform activities.

### 🔐 Authentication & Security

- Better Auth authentication system.
- Email and password authentication.
- Role-based access control.
- Protected dashboard routes.
- Server-side session verification.
- Secure backend API communication.
- Admin API secret for protected internal API requests.

---

## 📸 Application Screenshots

<div align="center">

### 🏠 Homepage

![Homepage](./public/screenshots/homepage.png)

*Explore the MentorLagbe platform.*

---

### 🎓 Student Dashboard

![Student Dashboard](./public/screenshots/student-dashboard.png)

*Access student activities and dashboard features.*

---

### 🔍 Browse Tuitions

![Browse Tuitions](./public/screenshots/browse-tuitions.png)

*Find suitable tuition opportunities using search and filters.*

---

### 📄 Tuition Details

![Tuition Details](./public/screenshots/tuition-details.png)

*Explore tuition information and apply for opportunities.*

---

### 🔖 My Bookmarks

![My Bookmarks](./public/screenshots/bookmarks.png)

*Save and manage favorite tuition listings.*

---

### 📝 My Applications

![My Applications](./public/screenshots/my-applications.png)

*Track submitted tuition applications.*

---

### 👨‍🏫 Tutor Dashboard

![Tutor Dashboard](./public/screenshots/tutor-dashboard.png)

*Manage tutor activities and applications.*

---

### 🛡️ Admin Dashboard

![Admin Dashboard](./public/screenshots/admin-dashboard.png)

*Manage users, roles, and platform operations.*

</div>

---

## 🛠️ Technology Stack

### Frontend

<p>
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind" alt="Frontend Technologies" />
</p>

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| React | Building interactive user interfaces |
| TypeScript | Type-safe development |
| Tailwind CSS | Responsive styling |
| Better Auth | Authentication and session management |
| Lucide React | Icons |
| Sonner | Toast notifications |

### Backend & Database

<p>
  <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb" alt="Backend Technologies" />
</p>

| Technology | Purpose |
|---|---|
| Node.js | Backend JavaScript runtime |
| Express.js | REST API development |
| MongoDB | Database and data storage |
| REST API | Frontend and backend communication |

### Development Tools

<p>
  <img src="https://skillicons.dev/icons?i=git,github,vscode,vercel" alt="Development Tools" />
</p>

- Git & GitHub
- Visual Studio Code
- Vercel

---

## 🔒 Authentication & Security

Security and role-based access are important parts of MentorLagbe.

### Better Auth

Better Auth is used to handle authentication and session management.

### Role-Based Access Control

The platform supports three user roles:

- **Student** — Browse tuitions, apply, and manage bookmarks.
- **Tutor** — Explore tuition opportunities and manage applications.
- **Admin** — Manage users, roles, and platform operations.

### Protected Routes

Protected dashboard routes use server-side session verification to restrict access based on authentication and user roles.

### Backend API Security

The frontend communicates with a separate Express.js backend. Protected internal API requests use an admin API secret stored in server-side environment variables.

**Important:** Authentication and authorization should also be verified on the backend. Frontend route protection alone is not sufficient to secure API endpoints.

---

## 🏗️ Project Architecture

MentorLagbe uses separate frontend and backend repositories.

```text
                 ┌──────────────────────┐
                 │        User          │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   Next.js Frontend   │
                 │ React + TypeScript   │
                 └──────────┬───────────┘
                            │
                       API Requests
                            │
                            ▼
                 ┌──────────────────────┐
                 │   Express Backend    │
                 │       Node.js        │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │       MongoDB        │
                 │   Application Data   │
                 └──────────────────────┘
```

### Repository Structure

| Repository | Responsibility |
|---|---|
| MentorLagbe | Frontend, UI, routing, and authentication integration |
| MentorLagbe-Server | Backend API and database operations |

---

## 🚀 Getting Started

Follow these instructions to run MentorLagbe locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/)
- npm

### 1. Clone the Frontend Repository

```bash
git clone https://github.com/asifdev62/MentorLagbe.git
```

### 2. Navigate to the Frontend Directory

```bash
cd MentorLagbe
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Frontend Environment Variables

Create a `.env` file in the frontend project root.

Example:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

MONGODB_URL=your_mongodb_connection_string

BETTER_AUTH_SECRET=your_secure_auth_secret

ADMIN_API_SECRET=your_long_random_secret
```

Replace the placeholder values with your actual credentials.

**Important:** Never commit your `.env` file or expose private secrets in frontend code. Keep server-only secrets on the server.

### 5. Run the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## ⚙️ Backend Setup

MentorLagbe uses a separate Express.js backend repository.

### 1. Clone the Backend Repository

```bash
git clone https://github.com/asifdev62/MentorLagbe-Server.git
```

### 2. Navigate to the Backend Directory

```bash
cd MentorLagbe-Server
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Backend Environment Variables

Create a `.env` file in the backend project root.

Example:

```env
PORT=5000

MONGODB_URL=your_mongodb_connection_string

ADMIN_API_SECRET=your_long_random_secret
```

Make sure the environment variable names match your backend source code.

The frontend and backend must use the same `ADMIN_API_SECRET` value for protected internal API requests.

### 5. Start the Backend Server

```bash
npm run dev
```

Check the backend repository's `package.json` if your development script uses a different command.

---

## 🗄️ Database

MentorLagbe uses MongoDB for data storage.

**Database:** `mentorlagbe`

### Main Collections

| Collection | Purpose |
|---|---|
| `user` | User information and roles |
| `tuitions` | Tuition listings |
| `applications` | Student and tutor applications |
| `bookmarks` | Saved tuition listings |
| `payments` | Payment-related records |

---

## 📌 Application Routes

| Route | Description |
|---|---|
| `/browse-tuitions` | Browse available tuitions |
| `/browse-tuitions/[id]` | Tuition details |
| `/dashboard/student` | Student dashboard |
| `/dashboard/student/browse-tuitions` | Student tuition browsing |
| `/dashboard/student/my-application` | Student applications |
| `/dashboard/student/bookmarks` | Saved tuitions |
| `/dashboard/student/profile` | Student profile |

---

## 🌐 Deployment

The frontend is deployed using [Vercel](https://vercel.com/).

The backend can be deployed on a Node.js-compatible hosting platform.

### Deployment Checklist

- Configure all required environment variables.
- Add the production frontend URL to the authentication configuration.
- Configure backend CORS for the production frontend domain.
- Verify MongoDB connection settings.
- Configure matching API URLs.
- Keep all private secrets secure.
- Test authentication and protected routes after deployment.

### Live Website

🌐 [https://mentor-lagbe-rouge.vercel.app/](https://mentor-lagbe-rouge.vercel.app/)

---

## 🎯 Project Goal

The goal of MentorLagbe is to make the tuition searching and hiring process easier, more organized, and more accessible through a role-based online platform.

It aims to provide a convenient experience for students, tutors, and administrators in one place.

---

## 🔮 Future Improvements

- Advanced tuition search and filtering.
- Enhanced application management.
- Improved student and tutor profiles.
- Additional payment features.
- More dashboard analytics.
- Enhanced notification system.

---

## 🤝 Contributing

Suggestions and contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Commit your changes.
5. Open a pull request.

---

## 📄 License

Add a `LICENSE` file if you intend to distribute MentorLagbe under a specific open-source license.

---

## 👨‍💻 Developer

<div align="center">

### Md Asif Ali

**Full Stack Web Developer | CSE Student**

<a href="https://github.com/asifdev62">
  <img src="https://img.shields.io/badge/GitHub-asifdev62-181717?style=for-the-badge&logo=github" alt="GitHub" />
</a>

<br />

<a href="https://linkedin.com/in/asifali62/">
  <img src="https://img.shields.io/badge/LinkedIn-Md_Asif_Ali-0A66C2?style=for-the-badge&logo=linkedin" alt="LinkedIn" />
</a>

<br /><br />

[🌐 Live Website](https://mentor-lagbe-rouge.vercel.app/) · [💻 Frontend GitHub](https://github.com/asifdev62/MentorLagbe) · [⚙️ Backend GitHub](https://github.com/asifdev62/MentorLagbe-Server)

</div>

---

<div align="center">

### 🎓 MentorLagbe

**Connecting Students with the Right Tutors.**

Built with ❤️ using Next.js, TypeScript, Express.js, and MongoDB.

<br />

[🌐 Live Demo](https://mentor-lagbe-rouge.vercel.app/) · [💻 Frontend Repository](https://github.com/asifdev62/MentorLagbe) · [⚙️ Backend Repository](https://github.com/asifdev62/MentorLagbe-Server)

<br />

⭐ If you find this project interesting, consider giving it a star!

</div>
## 🌐 Live Demo

- **Live Website:** [Add your deployed frontend URL]
- **Frontend Repository:** [Add frontend GitHub URL]
- **Backend Repository:** [Add backend GitHub URL]

## ✨ Key Features

### 👨‍🎓 Student
- Browse approved tuition listings.
- Search and filter tuitions by class, subject, location, and tuition type.
- View detailed tuition information.
- Apply for available tuition opportunities.
- Track application status.
- Bookmark favorite tuitions.
- Free plan supports up to 5 bookmarks.
- Student Pro plan supports unlimited bookmarks.
- Manage personal profile.

### 👨‍🏫 Tutor
- Explore available tuition opportunities.
- Apply for suitable tuition jobs.
- Manage submitted applications.
- Track application status.
- Manage profile information.

### 🛡️ Admin
- View and manage registered users.
- Manage user roles.
- Manage tuition listings.
- Review and manage platform activities.

### 🔐 Authentication & Security
- Better Auth authentication system.
- Email and password authentication.
- Role-based access control.
- Protected dashboard routes.
- Server-side session verification.
- Secure backend API communication.
- Admin API secret for protected internal API requests.

## 🛠️ Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Better Auth
- Lucide React
- Sonner

### Backend
- Node.js
- Express.js
- MongoDB
- REST API

### Tools & Platforms
- Git & GitHub
- VS Code
- Vercel

## 📸 Project Preview

<!-- Add your project screenshots here -->

<!--
![MentorLagbe Homepage](./public/screenshots/homepage.png)
-->

## 📁 Project Structure

```text
mentorlagbe/
├── public/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── dashboard/
│   │   │   ├── student/
│   │   │   ├── tutor/
│   │   │   └── admin/
│   │   ├── browse-tuitions/
│   │   └── ...
│   ├── components/
│   ├── lib/
│   │   ├── actions/
│   │   ├── api/
│   │   └── auth.ts
│   └── ...
├── .env
├── package.json
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd mentorlagbe
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

MONGODB_URL=your_mongodb_connection_string

BETTER_AUTH_SECRET=your_secure_auth_secret

ADMIN_API_SECRET=your_long_random_secret
```

**Important:** Replace the placeholder values with your actual credentials. Never commit your `.env` file or expose private secrets in frontend code.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🖥️ Backend Setup

MentorLagbe uses a separate Express.js backend.

```bash
git clone YOUR_BACKEND_REPOSITORY_URL

cd mentorlagbe-server

npm install
```

Configure the backend environment variables according to your backend configuration, including:

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
ADMIN_API_SECRET=your_long_random_secret
```

Start the backend:

```bash
npm run dev
```

Make sure the frontend and backend use matching API URLs and the same `ADMIN_API_SECRET` value.

## 🗄️ Database

MentorLagbe uses MongoDB for data storage.

**Database:** `mentorlagbe`

Main collections include:

- `user`
- `tuitions`
- `applications`
- `bookmarks`
- `payments`

## 📌 Application Routes

| Route | Description |
|---|---|
| `/browse-tuitions` | Browse available tuitions |
| `/browse-tuitions/[id]` | Tuition details |
| `/dashboard/student` | Student dashboard |
| `/dashboard/student/browse-tuitions` | Student tuition browsing |
| `/dashboard/student/my-application` | Student applications |
| `/dashboard/student/bookmarks` | Saved tuitions |
| `/dashboard/student/profile` | Student profile |

## 🚀 Deployment

The frontend can be deployed using [Vercel](https://vercel.com/).

The backend can be deployed on a Node.js-compatible hosting platform.

Before deployment:
- Configure all required environment variables.
- Add the production frontend URL to the authentication configuration.
- Configure backend CORS for the production frontend domain.
- Verify MongoDB connection settings.
- Keep all private secrets secure.

## 🎯 Project Goal

The goal of MentorLagbe is to make the tuition searching and hiring process easier, more organized, and more accessible through a role-based online platform.

## 👨‍💻 Developer

**Md Asif Ali**

Full Stack Web Developer | CSE Student

- GitHub: [@asifdev62](https://github.com/asifdev62)
- LinkedIn: [Md Asif Ali](https://linkedin.com/in/asifali62/)

---

⭐ If you find this project interesting, consider giving it a star!
