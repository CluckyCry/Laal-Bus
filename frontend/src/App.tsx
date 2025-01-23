import type React from "react"
import { useState } from "react"
import LandingPage from "./components/LandingPage"
import DriverView from "./components/DriverView"
import UserView from "./components/UserView"
import DriverLoginPage from "./components/DriverLoginPage"
import Footer from "./components/footer"
import { SettingsProvider } from "./components/contexts/SettingsContext" // Import SettingsProvider

type Role = "none" | "driver" | "user"

const App: React.FC = () => {
  const [role, setRole] = useState<Role>("none")
  const [isDriverAuthenticated, setIsDriverAuthenticated] = useState(false)

  const DriverAuthWrapper: React.FC = () => {
    if (!isDriverAuthenticated) {
      return (
        <DriverLoginPage onSuccessfulLogin={() => setIsDriverAuthenticated(true)} onCancel={() => setRole("none")} />
      )
    }
    return (
      <SettingsProvider>
        {" "}
        {/* Wrap DriverView with SettingsProvider */}
        <DriverView
          onLogout={() => {
            setIsDriverAuthenticated(false)
            setRole("none")
          }}
        />
      </SettingsProvider>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {role === "none" && <LandingPage setRole={setRole} />}
      {role === "driver" && <DriverAuthWrapper />}
      {role === "user" && <UserView />}
      <Footer />
    </div>
  )
}

export default App

