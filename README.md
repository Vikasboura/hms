# Hospital Management System (HMS)

A modern, multi-tenant Hospital Management System built with **Next.js 15**, **TypeScript**, and **Prisma**. This application is designed to streamline hospital operations, managing everything from patient registration to billing and lab reports.


## 🚀 Features

-   **Multi-Tenancy**: Support for multiple hospitals/clinics on a single instance using subdomains.
-   **Role-Based Access Control (RBAC)**: Granular permissions for Admins, Doctors, Nurses, Receptionists, Pharmacists, and Lab Technicians.
-   **Patient Management**: Comprehensive patient records, history, and OPD/IPD status.
-   **Doctor & Staff Management**: Manage profiles, schedules, and specializations.
-   **Appointments**: Easy scheduling and management of patient appointments.
-   **Prescriptions**: Digital prescription generation and management.
-   **Pharmacy & Inventory**: Track medicine stock and manage pharmacy sales.
-   **Lab Reports**: Manage pathology and radiology reports with AI-powered analysis integration.
-   **Billing & Invoicing**: Integrated billing system with **Razorpay** support for payments.
-   **Authentication**: Secure login with email/password and phone number support via **NextAuth.js**.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Auth**: [NextAuth.js](https://next-auth.js.org/) (v5)
-   **Forms**: React Hook Form + Zod
-   **Payments**: Razorpay

## ⚡ Getting Started

### Prerequisites

-   Node.js 18+
-   PostgreSQL Database

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/vikasboura/hospital-hms.git
    cd hospital-hms
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Copy `.env.example` to `.env` and fill in your details:
    ```bash
    cp .env.example .env
    ```
    *   `DATABASE_URL`: Your PostgreSQL connection string.
    *   `AUTH_SECRET`: Generate a random secret (e.g., `openssl rand -base64 32`).
    *   `RESEND_API_KEY`: For email notifications.
    *   `RAZORPAY_KEY_ID` & `SECRET`: For payments.

4.  **Database Setup:**
    ```bash
    npx prisma generate
    npx prisma db push
    npx prisma db seed # Seeds default roles and admin
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

-   `/app`: Next.js App Router pages and layouts.
-   `/components`: Reusable UI components (Shadcn UI).
-   `/lib`: Utility functions and shared logic.
-   `/prisma`: Database schema and seed scripts.
-   `/actions`: Server actions for data mutation.
-   `/types`: TypeScript type definitions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
