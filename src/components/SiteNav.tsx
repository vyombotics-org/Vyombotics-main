import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, LayoutDashboard } from "lucide-react";
import logo from "@/assets/logo.png";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/integrations/firebase/client";
import { NotificationBell } from "@/components/NotificationBell";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function SiteNav() {
  const { user, primaryRole, loading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const signOut = async () => {
    await auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav className="glass-strong mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-6 py-3">
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label="Vyombotics — Academy of Future Education"
        >
          <img
            src={logo}
            alt="Vyombotics Academy of Future Education"
            className="h-9 w-auto md:h-10"
          />
        </Link>

        <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link to="/courses" className="transition-colors hover:text-foreground">
            {t("nav.courses")}
          </Link>
          <Link to="/shop" className="transition-colors hover:text-foreground">
            Shop
          </Link>
          <Link to="/faculty" className="transition-colors hover:text-foreground">
            {t("nav.faculty")}
          </Link>
          <Link to="/feedback" className="transition-colors hover:text-foreground">
            {t("nav.reviews")}
          </Link>
          <Link to="/faq" className="transition-colors hover:text-foreground">
            {t("nav.faq")}
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          {loading ? null : user ? (
            <>
              <NotificationBell />
              <Button asChild variant="ghost" size="sm">
                <Link to="/dashboard">
                  <LayoutDashboard className="h-4 w-4" />{" "}
                  {primaryRole === "admin"
                    ? t("nav.admin")
                    : primaryRole === "instructor"
                      ? t("nav.studio")
                      : t("nav.dashboard")}
                </Link>
              </Button>
              <Button onClick={signOut} variant="ghost" size="sm" aria-label={t("nav.signout")}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/auth" search={{ mode: "login" } as any}>
                  {t("nav.login")}
                </Link>
              </Button>
              <Button asChild size="sm" className="btn-glow text-primary-foreground">
                <Link to="/auth" search={{ mode: "signup" } as any}>
                  {t("nav.signup")}
                </Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
