'use client'

import React, { useState } from 'react'
import { MapPin, Bus, User, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Navbar } from './Navbar'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

type LandingPageProps = {
  setRole: (role: 'none' | 'driver' | 'user') => void
}

// Custom component to handle search and map control
function SearchHandler({ searchQuery }: { searchQuery: string }) {
  const map = useMap()

  React.useEffect(() => {
    const handleSearch = async () => {
      try {
        if (!searchQuery) return

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchQuery
          )}`
        )
        const data = await response.json()

        if (data && data.length > 0) {
          const { lat, lon } = data[0]
          const newCenter: [number, number] = [parseFloat(lat), parseFloat(lon)]
          map.panTo(newCenter)
        }
      } catch (error) {
        console.error('Error searching location:', error)
      }
    }

    handleSearch()
  }, [searchQuery, map])

  return null
}

export default function LandingPage({ setRole }: LandingPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [mapCenter, setMapCenter] = useState<[number, number]>([24.8607, 67.0011]) // Default coordinates

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-red-50 to-white overflow-x-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/RedBusBG.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-20 space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="lg:w-1/2 text-center lg:text-left w-full">
              <motion.h1
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-8xl font-agharti font-bold text-white mb-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                TRACK YOUR BUS IN{' '} <br></br>
                <span className="text-red-600">REAL-TIME</span>
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 font-oldMoney "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Know exactly where your bus is and when it will arrive. Safe,
                reliable, and convenient tracking for everyone.
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => setRole('driver')}
                >
                  <Bus className="mr-2 h-5 w-5" />
                  I'm a Driver
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-red-600 text-red-600 hover:bg-red-50"
                  onClick={() => setRole('user')}
                >
                  <User className="mr-2 h-5 w-5" />
                  I'm a Passenger
                </Button>
              </div>
            </div>

            <div className="lg:w-1/2 w-full max-w-md mx-auto">
              <div className="relative">
                <div className="absolute -inset-4 bg-red-100 rounded-full blur-3xl opacity-30"></div>
                <Card className="relative bg-white/50 backdrop-blur-sm border-0 shadow-xl p-4 sm:p-6 rounded-2xl">
                  <div className="aspect-square w-full rounded-xl bg-gray-200 p-4">
                    <div className="h-full w-full rounded-lg relative overflow-hidden">
                      <div className="absolute top-4 left-4 right-4 z-[1000]">
                        <div className="flex items-center bg-white rounded-lg shadow-sm">
                          <MapPin className="ml-3 h-5 w-5 text-red-500" />
                          <Input
                            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                            placeholder="Search your destination..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) =>
                              setSearchQuery((e.target as HTMLInputElement).value) 
                            }
                          />
                          <button
                            onClick={() => setSearchQuery(searchQuery)}
                            className="p-2 hover:bg-gray-100 rounded-r-lg"
                          >
                            <Search className="h-5 w-5 text-gray-500" />
                          </button>
                        </div>
                      </div>

                      <MapContainer
                        center={mapCenter}
                        zoom={13}
                        scrollWheelZoom={false}
                        className="h-full w-full z-0"
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <SearchHandler searchQuery={searchQuery} />
                      </MapContainer>

                      
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-12 lg:py-20 font-helvetica">
            <h2 className="text-5xl lg:text-5xl xl:text-8xl font-bold text-center mb-8 sm:mb-12 text-white font-agharti font-bold">
              WHY CHOOSE OUR <span className="text-red-600">BUS</span> TRACKER?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                {React.cloneElement(feature.icon, { className: "w-6 h-6 text-red-600" })}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-red-600">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-300">{feature.description}</p>
              </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    title: 'Real-Time Tracking',
    description: 'Know exactly where your bus is with live GPS tracking and estimated arrival times.',
    icon: <MapPin className="w-6 h-6 text-red-600" />,
  },
  {
    title: 'Multiple Routes',
    description: 'Access information for all bus routes in your city with just a few taps.',
    icon: <Bus className="w-6 h-6 text-red-600" />,
  },
  {
    title: 'User Friendly',
    description: 'Simple and intuitive interface designed for both drivers and passengers.',
    icon: <User className="w-6 h-6 text-red-600" />,
  },
]