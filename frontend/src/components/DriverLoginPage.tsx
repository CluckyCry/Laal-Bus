import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, LockIcon, Loader2 } from 'lucide-react';
import io from 'socket.io-client';

interface DriverLoginPageProps {
  onSuccessfulLogin: () => void;
  onCancel: () => void;
}

const DriverLoginPage: React.FC<DriverLoginPageProps> = ({ onSuccessfulLogin, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/driver/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        const socket = io(import.meta.env.VITE_BACKEND_URL);
        socket.emit('driver-login');
        onSuccessfulLogin();
        //navigate to driverview after succesfull login
        navigate('/driverview');

      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20" />
        <div className="grid-background absolute inset-0" />
      </div>

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
        className="w-full max-w-sm bg-black/30 border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 relative z-10 backdrop-blur-xl transform transition-all duration-300 hover:backdrop-blur-2xl hover:bg-black/40"
      >
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute -top-12 left-0 right-0 mx-auto w-20 sm:w-24"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-900/80 border-2 border-white/30 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
            <User className="w-10 h-10 sm:w-12 sm:h-12 text-white/70" />
            <div className="absolute bottom-1 right-1 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded-full border-2 border-black shadow-emerald-500/50" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 sm:mt-12 mb-6 sm:mb-8"
        >
          <h1 className="text-white text-xl sm:text-2xl font-bold text-center">Driver Login</h1>
        </motion.div>

        <motion.form 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit} 
          className="space-y-4 sm:space-y-6"
        >
          <div>
            <label htmlFor="password" className="block text-sm text-gray-400 mb-1 sm:mb-2 font-medium">
              secret123
            </label>
            <div className="relative group">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-gray-900/50 border-2 border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                required
                disabled={isLoading}
              />
              <LockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 sm:w-5 sm:h-5 group-focus-within:text-pink-500 transition-colors duration-300" />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs sm:text-sm font-medium bg-red-500/10 border border-red-500/20 rounded-lg px-3 sm:px-4 py-2"
            >
              {error}
            </motion.p>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white border border-red-500/20 rounded-lg py-2 sm:py-3 text-sm sm:text-base font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
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
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white border border-white/10 rounded-lg py-2 sm:py-3 text-sm sm:text-base font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default DriverLoginPage;

