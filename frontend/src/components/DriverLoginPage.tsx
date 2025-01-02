import React, { useState } from 'react';
import { LockIcon, XIcon } from 'lucide-react';
import laalBusLogo from '../assets/laabuslogo1.png';
interface DriverLoginPageProps {
  onSuccessfulLogin: () => void;
  onCancel: () => void;
}

const DriverLoginPage: React.FC<DriverLoginPageProps> = ({ 
  onSuccessfulLogin, 
  onCancel 
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'secret123') {
      onSuccessfulLogin();
    } else {
      setError('Incorrect password');
    }
  };

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
    <div className="absolute left-1/2 transform -translate-x-1/2 mt-4">
          <a href="/" className="transition-colors">
            <img 
              src={laalBusLogo} 
              alt="LaalBus Logo" 
              className="h-14 w-22" 
            />
          </a>
        </div>
        <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 ">
  <div className="relative w-full max-w-md hover:scale-105">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-lg transform transition-all duration-300 hover:scale-105">
              </div>
    <div className="relative p-8 rounded-lg shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Driver Login</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-white text-sm font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white/20 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
              required
              placeholder="secret123"
            />
            <LockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          </div>
        </div>
        {error && (
          <p className="text-yellow-300 text-sm font-medium">{error}</p>
        )}
        <div className="flex justify-between space-x-4">
          <button
            type="submit"
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  </div>
  );
};

export default DriverLoginPage;

