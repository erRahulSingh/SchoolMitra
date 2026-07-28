import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

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
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Header />
            <main className="page-wrapper">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
