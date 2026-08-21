import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { SchoolStatusGuard } from "@/components/guards/SchoolStatusGuard";
import AppLayout from "@/components/layout/AppLayout";

export const metadata: Metadata = {
  title: "SchoolMitra ERP - School Management Portal",
  description: "Comprehensive School ERP Software for Admissions, Attendance, Fees, Exams, and Live Transport GPS Tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <SchoolStatusGuard>
            <AppLayout>{children}</AppLayout>
          </SchoolStatusGuard>
        </ThemeProvider>
      </body>
    </html>
  );
}
