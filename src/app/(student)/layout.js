
"use client";

import { useState, useEffect } from "react";

import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";

export default function StudentLayout({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [student, setStudent] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function fetchStudent() {
      try {
        const response = await fetch("/api/auth/me");
        const result = await response.json();

        if (response.ok && result.success && active) {
          setStudent(result.user || result.data || null);
        }
      } catch (error) {
        console.error("Unable to load student profile:", error);
      } finally {
        if (active) setIsUserLoading(false);
      }
    }

    fetchStudent();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        student={student}
        isLoading={isUserLoading}
        onToggleMobileSidebar={() =>
          setIsMobileSidebarOpen((prev) => !prev)
        }
      />

      <div className="flex">
        <Sidebar
          student={student}
          isLoading={isUserLoading}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}