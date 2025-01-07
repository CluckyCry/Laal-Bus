'use client'

import { FC } from 'react'
import { Twitter, Linkedin, Github } from 'lucide-react'

const Footer: FC = () => {
  return (
    <footer className="bg-black text-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto pt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          {/* Logo, Image, and Copyright */}
          <div className="space-y-4">
            <div className="flex flex-col items-center md:items-start">
              <div className="w-20 h-20 md:w-24 md:h-24 relative mb-4">
                <img
                  src="./busfavicon.png"
                  alt="LaalBus Logo"
                  className="rounded-full w-full h-full object-contain md:object-cover"
                />
              </div>
              <div className="text-2xl font-bold text-center md:text-left">LaalBus</div>
            </div>
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} LaalBus Solutions Private Limited.
              <br className="md:hidden" /> All rights reserved.
            </p>
          </div>

          {/* Navigation and Contact */}
          <div className="space-y-4 md:text-right">
            <div className="flex space-x-6">
              <a href="/contact" className="hover:text-gray-300 transition-colors">
                Contact
              </a>
              <a href="/about" className="hover:text-gray-300 transition-colors">
                About
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://x.com/asadaliabbasi_"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://www.linkedin.com/in/asadali1234/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://github.com/Asad-noob69"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>

            <a
              href="mailto:asadaliabbasi787@gmail.com"
              className="block text-gray-400 hover:text-gray-300 transition-colors"
            >
              asadaliabbasi787@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/923705764856"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 rounded-full p-3 shadow-lg hover:bg-green-600 transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 text-white"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </footer>
  )
}

export default Footer
