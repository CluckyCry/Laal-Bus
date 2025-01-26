import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import DriverView from "./components/DriverView";
import UserView from "./components/UserView";
import DriverLoginPage from "./components/DriverLoginPage";
import Footer from "./components/footer";
import { SettingsProvider } from "./components/contexts/SettingsContext"; // Import SettingsProvider
import SettingsPage from "./components/SettingsPage";

type Role = "none" | "driver" | "user";

const App: React.FC = () => {
  const [role, setRole] = useState<Role>("none");
  const [isDriverAuthenticated, setIsDriverAuthenticated] = useState(false);

  const DriverAuthWrapper: React.FC = () => {
    if (!isDriverAuthenticated) {
      return (
        <DriverLoginPage
          onSuccessfulLogin={() => setIsDriverAuthenticated(true)}
          onCancel={() => setRole("none")}
        />
      );
    }
    return (
      <SettingsProvider>
        <DriverView
          onLogout={() => {
            setIsDriverAuthenticated(false);
            setRole("none");
          }}
        />
      </SettingsProvider>
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage setRole={setRole} />} />
          {/* driverlogin */}
          <Route path="/driverlogin" element={<DriverLoginPage onSuccessfulLogin={() => setIsDriverAuthenticated(true)} onCancel={() => setRole("none")} />} />
          {/* Driver View */}
          <Route
            path="/driverview"
            element={role === "driver" ? <DriverAuthWrapper /> : <Navigate to="/" />}
          />

          {/* User View */}
          <Route path="/userview" element={role === "user" ? <UserView /> : <Navigate to="/" />} />
          
          {/* Settings Page */}
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;