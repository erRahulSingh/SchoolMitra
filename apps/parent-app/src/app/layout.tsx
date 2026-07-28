import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SchoolMitra Parent Mobile App",
  description: "Parent mobile app for attendance, live bus GPS tracking, fee payments, and teacher chat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
