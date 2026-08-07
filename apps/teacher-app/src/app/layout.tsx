import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "SchoolMitra — Teacher App",
  description: "Mobile App Portal for Teachers, Educators and School Instructors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <ThemeProvider>
          <div className="mobile-app-shell">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
