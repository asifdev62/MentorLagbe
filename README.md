# 🎓 MentorLagbe – Online Tuition Management Platform

MentorLagbe is a full-stack online tuition management platform that connects students, tutors, and guardians. Students can explore available tuition opportunities, apply for suitable jobs, and bookmark their favorite listings. Tutors can manage their applications and tuition activities, while administrators manage users and platform operations.

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
