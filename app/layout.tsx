import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Email Accounts Manager",
  description: "Create cPanel emails and check inbox",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
