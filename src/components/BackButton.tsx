import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  to: string;
  label?: string;
  /**
   * When true, the button is only visible on mobile (hidden at md+).
   * Useful when a desktop breadcrumb already provides back navigation.
   */
  mobileOnly?: boolean;
  className?: string;
};

/**
 * Shared back button for detail pages. Renders a pill-style button on mobile
 * and a subtle inline link on desktop for consistent back navigation across
 * marketplace and news detail pages.
 */
export function BackButton({ to, label = "Back", mobileOnly = false, className = "" }: BackButtonProps) {
  const visibility = mobileOnly ? "inline-flex md:hidden" : "inline-flex";
  return (
    <Link
      to={to}
      aria-label={label}
      className={`${visibility} items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition hover:border-electric/40 md:border-0 md:bg-transparent md:px-0 md:py-0 md:font-normal md:text-muted-foreground md:hover:text-foreground ${className}`}
    >
      <ArrowLeft className="h-4 w-4 md:h-3 md:w-3" /> {label}
    </Link>
  );
}
