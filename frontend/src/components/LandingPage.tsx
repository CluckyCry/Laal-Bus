import React from 'react';

type LandingPageProps = {
  setRole: (role: 'none' | 'driver' | 'user') => void;
};

const LandingPage: React.FC<LandingPageProps> = ({ setRole }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to Bus Tracker</h1>
      <div className="space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setRole('driver')}
        >
          I'm a Driver
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setRole('user')}
        >
          I'm a User
        </button>
      </div>
    </div>
  );
};

export default LandingPage;