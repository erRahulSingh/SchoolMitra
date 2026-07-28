import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SchoolMitra - All-in-One School ERP & Live Transport GPS Tracking",
  description: "Transform your school administration with automated admissions, fee collection, parent app, driver app, and live GPS bus tracking.",
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
