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
