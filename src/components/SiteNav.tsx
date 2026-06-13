import { Link } from "@tanstack/react-router";
import { NekoLogo } from "./NekoLogo";

export function SiteNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/65 backdrop-blur-xl border-b border-border/40 transition-all duration-300">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Link 
          to="/" 
          className="hover:opacity-90 active:scale-95 transition-all duration-200"
          aria-label="neko home"
        >
          <NekoLogo size={22} />
        </Link>
        <div className="flex items-center gap-6 sm:gap-8">
          <Link
            to="/ai"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-foreground after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
            activeProps={{ className: "text-foreground after:scale-x-100" }}
          >
            AI
          </Link>
          <Link
            to="/storage"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-foreground after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
            activeProps={{ className: "text-foreground after:scale-x-100" }}
          >
            Storage
          </Link>
          <Link
            to="/software"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-foreground after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
            activeProps={{ className: "text-foreground after:scale-x-100" }}
          >
            Software
          </Link>
          <Link
            to="/specs"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-foreground after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
            activeProps={{ className: "text-foreground after:scale-x-100" }}
          >
            Specs
          </Link>
          <Link
            to="/pre-order"
            className="text-xs sm:text-sm font-medium bg-foreground text-background px-4 py-1.5 rounded-full hover:bg-foreground/90 active:scale-95 transition-all shadow-sm hover:shadow-md"
          >
            Pre-order
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="py-16 px-6 border-t border-border/40 bg-secondary/20">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-8">
        <Link to="/" className="hover:opacity-90 transition-opacity">
          <NekoLogo size={18} />
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-muted-foreground">
          <Link to="/ai" className="hover:text-foreground transition-colors">
            AI
          </Link>
          <Link to="/storage" className="hover:text-foreground transition-colors">
            Storage
          </Link>
          <Link to="/software" className="hover:text-foreground transition-colors">
            Software
          </Link>
          <Link to="/specs" className="hover:text-foreground transition-colors">
            Specs
          </Link>
          <Link to="/pre-order" className="hover:text-foreground transition-colors">
            Pre-order
          </Link>
        </div>
        <p className="text-[11px] text-muted-foreground/60">© 2026 neko systems. All rights reserved.</p>
      </div>
    </footer>
  );
}
