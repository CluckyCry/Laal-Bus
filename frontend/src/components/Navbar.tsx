import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Search, ChevronDown } from 'lucide-react'
import laalBusLogo from '../assets/laabuslogo1.png'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)


  const routes = [
  { name: 'Route 1', subscript: 'Model Colony to Dockyard' },
  { name: 'Route 2', subscript: 'North Karachi to Indus Hospital' },
  { name: 'Route 3', subscript: 'UP Mor to Nasir Jump' },
  { name: 'Route 4', subscript: 'Power House to Keamari' },
  { name: 'Route 9', subscript: 'Gulshan e Hadeed to Tower' },
  { name: 'Route 10', subscript: 'Numaish to Ibrahim Hyderi' },
  { name: 'Route 11', subscript: 'Shireen Jinnah Colony to Miran Nakka Lyari' },
  { name: 'Route 12', subscript: 'Nadi Kinara Khokrapar - Lucky Star Saddar' },
  { name: 'EV-1',     subscript: 'CMH Malir to Abdullah Shah Ghazi Shrine' },
  { name: 'EV-2',     subscript: 'Bahria Town to Malir Halt' },
  { name: 'EV-3',     subscript: 'Malir Cantt Check Post 5 to Numaish' },
];


  return (
    <nav className="fixed w-full z-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Left Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-sm font-medium text-white hover:text-white/80 transition-colors">
              Home
            </a>
            <div
              className="relative group"
            >
              <button
                className="text-sm font-medium text-white hover:text-white/80 transition-colors flex items-center"
              >
                Routes <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {routes.map((route, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      {route.name} <sub className="text-xs text-gray-500">{route.subscript}</sub>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <a
              href="https://github.com/Asad-noob69/RedBus-API"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white hover:text-white/80 transition-colors"
            >
              API
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-pink-400"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a href="/" className="transition-colors">
              <img 
                src={laalBusLogo} 
                alt="LaalBus Logo" 
                className="h-14 w-22" 
              />
            </a>
          </div>

          {/* Right Search */}
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="text-white hover:text-pink-400 transition-colors">
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
            <div>
              <button
                className="w-full text-left px-3 py-2 text-sm text-white hover:text-white/80 hover:bg-white/10 rounded-md transition-colors flex items-center justify-between"
              >
                Routes <ChevronDown className="h-4 w-4" />
              </button> 
              <div className="pl-6 space-y-1">
                {routes.map((route, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block px-3 py-2 text-sm text-white hover:text-white/80 hover:bg-white/10 rounded-md transition-colors"
                  >
                    {route.name} <sub className="text-xs text-gray-300">{route.subscript}</sub>
                  </a>
                ))}
              </div>
            </div>
            <a
              href="https://github.com/Asad-noob69/RedBus-API"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-sm text-white hover:text-white/80 hover:bg-white/10 rounded-md transition-colors"
            >
              API
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
