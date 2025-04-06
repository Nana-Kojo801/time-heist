import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="py-12 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Time Heist
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              A multiplayer game of precision timing and team coordination.
            </p>
          </div>
          <div className="flex gap-6">
            <Link
              to="/tutorial"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              How to Play
            </Link>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary/10 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Time Heist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
