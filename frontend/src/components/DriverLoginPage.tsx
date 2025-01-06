'use client'

import React, { useState } from 'react'
import { User, LockIcon, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface DriverLoginPageProps {
  onSuccessfulLogin: () => void
  onCancel: () => void
}

const DriverLoginPage: React.FC<DriverLoginPageProps> = ({ onSuccessfulLogin, onCancel }) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (password === 'secret123') {
        onSuccessfulLogin()
      } else {
        setError('Incorrect password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20" />
        <div className="grid-background absolute inset-0" />
      </div>

      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
        src="/RedBusBG.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-[90%] max-w-sm bg-black/30 border border-white/20 rounded-2xl shadow-2xl p-8 relative z-10 backdrop-blur-xl transform transition-all duration-300 hover:backdrop-blur-2xl hover:bg-black/40"
      >
        {/* Avatar Container */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute -top-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-24 h-24 bg-gray-900/80 border-2 border-white/30 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
            <User className="w-12 h-12 text-white/70" />
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black shadow-emerald-500/50" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 mb-8"
        >
          <h1 className="text-white text-2xl font-bold text-center">Driver Login</h1>
        </motion.div>

        {/* Form */}
        <motion.form 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          <div>
            <label htmlFor="password" className="block text-sm text-gray-400 mb-2 font-medium">
              PASSWORD
            </label>
            <div className="relative group">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-gray-900/50 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                required
                disabled={isLoading}
              />
              <LockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-pink-500 transition-colors duration-300" />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm font-medium bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2"
            >
              {error}
            </motion.p>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white border border-red-500/20 rounded-lg py-3 font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                'Login'
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white border border-white/10 rounded-lg py-3 font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>

          <div className="text-center">
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300 hover:underline underline-offset-4"
            >
              Forgot your password?
            </a>
          </div>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default DriverLoginPage

