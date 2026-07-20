"use client";

import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserInitial } from "@/components/ui/user-initial";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface DashboardNavbarProps {
  title?: string;
  subtitle?: string;
}

export function DashboardNavbar({
  title = "Dashboard",
  subtitle = "Plan today, finish what matters.",
}: DashboardNavbarProps) {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border bg-background px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger />

        <div className="min-w-0">
          <h1 className="truncate font-heading text-base font-semibold text-[#191C1D] dark:text-white">
            {title}
          </h1>

          <p className="hidden text-sm text-muted-foreground sm:block">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        {currentUser ? (
          <Button
            aria-label="Logout"
            className="gap-2 px-3"
            onClick={handleLogout}
            size="sm"
            type="button"
            variant="outline"
          >
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        ) : (
          <Button asChild className="gap-2 px-3" size="sm" variant="outline">
            <Link href="/login">
              <LogIn className="size-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          </Button>
        )}
        <UserInitial />
      </div>
    </header>
  );
}
