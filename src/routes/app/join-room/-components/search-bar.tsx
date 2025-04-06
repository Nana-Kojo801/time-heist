import { Search } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { itemVariants } from "./animations"

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
}

export function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="mb-6"
    >
      <div className="relative">
        <Input
          type="text"
          placeholder="Search rooms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-card/50 backdrop-blur-sm border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary/50"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary size-5" />
      </div>
    </motion.div>
  )
} 