import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SchoolMitra - All-in-One School ERP & Live Transport GPS Tracking",
  description: "Transform your school administration with automated admissions, fee collection, parent app, driver app, and live GPS bus tracking.",
  icons: {
    icon: "/images/resources/logo.png",
    shortcut: "/images/resources/logo.png",
    apple: "/images/resources/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/resources/logo.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/images/resources/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/resources/logo.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
