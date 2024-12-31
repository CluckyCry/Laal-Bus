'use client'

import { MapPin, Bus, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navbar } from './Navbar'

type LandingPageProps = {
  setRole: (role: 'none' | 'driver' | 'user') => void
}

export default function LandingPage({ setRole }: LandingPageProps) {
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-20 space-y-8 lg:space-y-0 lg:space-x-8">
            {/* Hero Content */}
            <div className="lg:w-1/2 text-center lg:text-left w-full">
              <motion.h1
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Track Your Bus in{' '}
                <span className="text-red-600">Real-Time</span>
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8"
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

            {/* Hero Card */}
            <div className="lg:w-1/2 w-full max-w-md mx-auto">
              <div className="relative">
                <div className="absolute -inset-4 bg-red-100 rounded-full blur-3xl opacity-30"></div>
                <Card className="relative bg-white/50 backdrop-blur-sm border-0 shadow-xl p-4 sm:p-6 rounded-2xl">
                  <div className="aspect-square w-full rounded-xl bg-gray-100 p-4">
                    <div className="h-full w-full rounded-lg bg-gray-200 relative">
                      <div className="absolute top-4 left-4 right-4">
                        <div className="h-10 bg-white rounded-lg shadow-sm flex items-center px-4 gap-2">
                          <MapPin className="h-5 w-5 text-red-500" />
                          <span className="text-gray-400 text-sm sm:text-base">Search your destination...</span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-sm sm:text-base">Next Bus</span>
                            <span className="bg-red-500 px-2 py-1 rounded text-xs sm:text-sm">5 min</span>
                          </div>
                          <div className="text-xs sm:text-sm text-red-100">Route 42 - Downtown Express</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-12 lg:py-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-white">Why Choose Our Bus Tracker?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
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