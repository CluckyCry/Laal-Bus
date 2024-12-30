import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Search } from 'lucide-react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed w-full z-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Left Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-sm font-medium text-white hover:text-white/80 transition-colors">Home</a>
            <a href="/collection" className="text-sm font-medium text-white hover:text-white/80 transition-colors">Collection</a>
            <a href="/services" className="text-sm font-medium text-white hover:text-white/80 transition-colors">Services</a>
            <a href="/about" className="text-sm font-medium text-white hover:text-white/80 transition-colors">About</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-white/80"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a href="/" className="text-2xl font-bold text-white hover:text-white/90 transition-colors">
              LaalBus
            </a>
          </div>

          {/* Right Search */}
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="text-white hover:text-white/80 transition-colors">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#2D0A0A]/95 backdrop-blur-sm border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="block px-3 py-2 text-sm text-white hover:text-white/80 hover:bg-white/10 rounded-md transition-colors"
            >
              Home
            </a>
            <a
              href="/collection"
              className="block px-3 py-2 text-sm text-white hover:text-white/80 hover:bg-white/10 rounded-md transition-colors"
            >
              Collection
            </a>
            <a
              href="/services"
              className="block px-3 py-2 text-sm text-white hover:text-white/80 hover:bg-white/10 rounded-md transition-colors"
            >
              Services
            </a>
            <a
              href="/about"
              className="block px-3 py-2 text-sm text-white hover:text-white/80 hover:bg-white/10 rounded-md transition-colors"
            >
              About
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

