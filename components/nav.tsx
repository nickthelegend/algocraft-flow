"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Nav() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/build/transactions", label: "Build Transactions" },
    { href: "/build/contracts", label: "Build Contracts" },
    { href: "/build/contracts/noob", label: "🎮 Easy Mode" },
    { href: "/docs", label: "Docs" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <motion.nav
      className="flex justify-between items-center px-4 md:px-6 py-4 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50 w-full"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Logo - CHANGE: Updated branding to Flow */}
      <Link href="/" className="flex items-center gap-2 flex-shrink-0">
        <motion.div
          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Flow
        </motion.div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors ${
              isActive(link.href) ? "text-secondary" : "text-muted-foreground hover:text-secondary"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right Section - Mobile Menu */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */
        <div className="md:hidden">
          <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Toggle mobile menu">
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {navLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link
                    href={link.href}
                    className={`w-full cursor-pointer ${isActive(link.href) ? "bg-accent/10" : ""}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
}
      </div>
    </motion.nav>
  )
}
