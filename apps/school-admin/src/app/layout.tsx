import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/context/ThemeContext";

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
          <div className="app-container">
            <Sidebar />
            <div className="main-content">
              <Header />
              <main className="page-wrapper">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
