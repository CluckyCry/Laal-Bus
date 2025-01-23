'use client'

import React, { useEffect, useState, useRef } from 'react'
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup 
} from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import { motion } from 'framer-motion'
import { 
  AlertCircle, 
  AlertTriangle, 
  MessageSquare, 
  User, 
  Settings, 
  Loader2 
} from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import io from 'socket.io-client'
import { Button } from '@/components/ui/button'
import ProfileSidebar from './ProfileSIdebar'
import { useSettings } from './contexts/SettingsContext'


interface DriverViewProps {
  onLogout: () => void
}

const DriverView: React.FC<DriverViewProps> = ({ onLogout }) => {
  const [position, setPosition] = useState<LatLngExpression | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { openSettings } = useSettings()
  const socketRef = useRef<any>(null)

  // Create socket connection once
  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_BACKEND_URL, {
      autoConnect: false
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  // Geolocation tracking
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (location) => {
        const newPosition: [number, number] = [
          location.coords.latitude,
          location.coords.longitude,
        ]
        setPosition(newPosition)
        setIsLoading(false)
      },
      (error) => {
        console.error('Error getting location:', error)
        setIsLoading(false)
      },
      { enableHighAccuracy: true }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  // Location emission
  useEffect(() => {
    if (position && socketRef.current) {
      if (!socketRef.current.connected) {
        socketRef.current.connect()
      }

      const timeoutId = setTimeout(() => {
        console.log("Emitting location with ID:", socketRef.current.id, {
          id: socketRef.current.id,
          position: position
        })

        socketRef.current.emit('updateLocation', { 
          id: socketRef.current.id, 
          position: position 
        })
      }, 100)

      return () => clearTimeout(timeoutId)
    }
  }, [position])

 //bottombar 
 
 const handleEmergency = () => {
  console.log("Emergency button pressed")
  // Add emergency logic here
}

const handleMessage = () => {
  console.log("Message button pressed")
  // Add messaging logic here
}

const handleProfile = () => {
  console.log("Profile button pressed")
  setIsProfileOpen(true)
}

const handleSettings = () => {
  console.log("Settings button pressed")
  openSettings()
}

    return (
      <>
      <div className="h-screen relative flex flex-col bg-gray-900">
        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5" />
          <div className="grid-background absolute inset-0" />
        </div>

        {/* Header */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative z-10">
          <div className="flex justify-between items-center p-4 bg-black/30 backdrop-blur-xl border-b border-white/10">
            <h2 className="text-5xl font-bold text-white flex-grow text-center font-agharti">DRIVER VIEW</h2>
            <button
              onClick={onLogout}
              className="group relative px-6 py-2.5 font-medium text-white transition-all duration-300"
            >
              <span className="absolute inset-0 h-full w-full rounded-lg bg-gradient-to-br from-red-600 to-red-800 shadow-lg shadow-red-500/40 transition-all duration-300 group-hover:scale-105 group-hover:shadow-red-500/50" />
              <span className="absolute inset-0 h-full w-full rounded-lg bg-gradient-to-br from-red-500 to-red-700 opacity-0 blur transition-all duration-300 group-hover:opacity-30" />
              <span className="relative flex items-center gap-1">
                Logout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </div>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-grow relative z-10"
        >
          {position ? (
            <div className="h-full w-full rounded-lg overflow-hidden shadow-2xl">
              <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }} zoomControl={false}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                  <Popup>Your current location</Popup>
                </Marker>
              </MapContainer>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-black/20 backdrop-blur-sm">
              {isLoading ? (
                <div className="flex items-center gap-3 text-white">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <p>Loading your location...</p>
                </div>
              ) : (
                <p className="text-white">Unable to get your location</p>
              )}
            </div>
          )}
        </motion.div>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative z-10"
        >
          <nav className="bg-black/30 backdrop-blur-xl border-t border-white/10 p-4">
            <div className="max-w-screen-xl mx-auto flex justify-around items-center">
              <button
                onClick={handleEmergency}
                className="flex flex-col items-center gap-1 text-red-500 hover:text-red-400 transition-colors duration-300"
              >
                <AlertTriangle className="w-6 h-6" />
                <span className="text-xs font-medium">Emergency</span>
              </button>
              <button
                onClick={handleMessage}
                className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors duration-300"
              >
                <MessageSquare className="w-6 h-6" />
                <span className="text-xs font-medium">Message</span>
              </button>
              <button
                onClick={handleProfile}
                className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors duration-300"
              >
                <User className="w-6 h-6" />
                <span className="text-xs font-medium">Profile</span>
              </button>
              <button
                onClick={handleSettings}
                className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors duration-300"
              >
                <Settings className="w-6 h-6" />
                <span className="text-xs font-medium">Settings</span>
              </button>
            </div>
          </nav>
        </motion.div>
        <ProfileSidebar isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      </div>
    </>
  )
}

export default DriverView

