# Easy POS Frontend

A modern Point of Sale (POS) system built with [Next.js](https://nextjs.org), [Redux Toolkit](https://redux-toolkit.js.org/), and [Tailwind CSS](https://tailwindcss.com/).

## Features

- **RBAC (Role-Based Access Control)**: Secure routing for Admin and Cashier roles using Middleware.
- **State Management**: Robust handling with Redux Toolkit and RTK Query.
- **Authentication**: JWT-based authentication with secure cookie storage.

## Live Demo

- **Backend API**: [https://pos-server-7ga3.onrender.com/api/v1](https://pos-server-7ga3.onrender.com/api/v1)

### Test Credentials

| Role        | Email                         | Password   |
| ----------- | ----------------------------- | ---------- |
| **Admin**   | \`admin@gmail.com\`           | \`123456\` |
| **Cashier** | \`ruhulamin.cse56@gmail.com\` | \`123456\` |

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/ruhulamin-programming/pos_frontend.git
cd pos_frontend
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Run the development server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- \`src/app\`: Next.js App Router (UI Pages & Layouts)
- \`src/components\`: Reusable UI components (Shared, Admin, Cashier)
- \`src/lib\`: Redux store, API services (RTK Query), and global providers
- \`src/proxy.ts\`: Next.js Middleware for Route Protection & RBAC

## Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build the application for production
- \`npm run start\` - Start production server
