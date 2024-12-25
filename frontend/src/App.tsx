import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import DriverView from './components/DriverView';
import UserView from './components/UserView';

type Role = 'none' | 'driver' | 'user';

const App: React.FC = () => {
  const [role, setRole] = useState<Role>('none');

  return (
    <div className="min-h-screen bg-gray-100">
      {role === 'none' && <LandingPage setRole={setRole} />}
      {role === 'driver' && <DriverView />}
      {role === 'user' && <UserView />}
    </div>
  );
};

export default App;