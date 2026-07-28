import type { Metadata } from "next";
import "./globals.css";
import SuperAdminSidebar from "@/components/layout/SuperAdminSidebar";
import SuperAdminHeader from "@/components/layout/SuperAdminHeader";

export const metadata: Metadata = {
  title: "SchoolMitra Super Admin Console",
  description: "Internal company management platform for multi-tenant school governance, revenue, billing, and server telemetry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <SuperAdminSidebar />
          <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
            <SuperAdminHeader />
            <main style={{ flex: 1, padding: '2rem' }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
