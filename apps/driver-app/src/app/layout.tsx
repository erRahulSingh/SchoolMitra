import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SchoolMitra Driver Mobile App",
  description: "Driver app for GPS trip management, student pickup checklist, emergency SOS, and telemetry logging.",
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
