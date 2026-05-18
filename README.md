# Email Accounts Manager

A Next.js web application designed to help you quickly generate temporary cPanel email accounts, check their IMAP inbox (with full HTML rendering), and permanently delete the accounts when you are done. Perfect for verifying accounts like Figma without clogging up your main email server.

## Features
- **Auto-Create**: Instantly generate new email accounts via cPanel UAPI.
- **Inbox Viewer**: Log in via IMAP and view incoming emails safely isolated in an iframe.
- **Auto-Delete**: One-click permanent deletion of the email account from your cPanel server.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configuration
Copy the `.env.example` file to `.env.local` and fill in your cPanel details:
```bash
cp .env.example .env.local
```
*(Make sure to generate an API Token inside your cPanel dashboard).*

### 3. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Upload to GitHub

Follow these steps to push your local project to a new repository on GitHub:

### 1. Initialize Git (if not already initialized)
Open your terminal in the project directory and run:
```bash
git init
```

### 2. Add all files to staging
```bash
git add .
```

### 3. Commit your changes
```bash
git commit -m "Initial commit: Email Accounts Manager"
```

### 4. Create a new repository on GitHub
1. Go to [GitHub](https://github.com/) and log in.
2. Click the **"+"** icon in the top right corner and select **"New repository"**.
3. Name your repository (e.g., `email-accounts-manager`).
4. Leave it as Public or Private, and **do not** initialize it with a README, .gitignore, or license (since you already have local files).
5. Click **"Create repository"**.

### 5. Link local repository to GitHub
Copy the URL of your new GitHub repository and run these commands in your terminal:
```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY-NAME.git
```
*(Replace the URL with your actual repository URL)*

### 6. Push to GitHub
```bash
git push -u origin main
```
Your code is now live on GitHub!
