import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import DriverView from './components/DriverView';
import UserView from './components/UserView';
import DriverLoginPage from './components/DriverLoginPage'; // New component

type Role = 'none' | 'driver' | 'user';

const App: React.FC = () => {
  const [role, setRole] = useState<Role>('none');
  const [isDriverAuthenticated, setIsDriverAuthenticated] = useState(false);

  // New component for driver authentication
  const DriverAuthWrapper: React.FC = () => {
    if (!isDriverAuthenticated) {
      return (
        <DriverLoginPage 
          onSuccessfulLogin={() => setIsDriverAuthenticated(true)}
          onCancel={() => setRole('none')}
        />
      );
    }
    return <DriverView onLogout={() => {
      setIsDriverAuthenticated(false);
      setRole('none');
    }} />;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {role === 'none' && <LandingPage setRole={setRole} />}
      {role === 'driver' && <DriverAuthWrapper />}
      {role === 'user' && <UserView />}
    </div>
  );
};

export default App;