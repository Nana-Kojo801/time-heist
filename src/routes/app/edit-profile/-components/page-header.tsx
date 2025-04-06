import { Link } from "@tanstack/react-router"
import BackLink from "@/components/back-link"

export function PageHeader() {
  return (
    <div className="py-4 px-4 sm:px-6 border-b border-border/20 bg-background/80 backdrop-blur-sm z-10">
      <Link to="/app/profile">
        <BackLink label="EDIT PROFILE" />
      </Link>
    </div>
  )
} 