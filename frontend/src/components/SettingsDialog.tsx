import React from "react"
import { useSettings } from "./contexts/SettingsContext"
import { useNavigate } from "react-router-dom"

const SettingsDialog: React.FC = () => {
  const { isSettingsOpen, closeSettings } = useSettings()
  const navigate = useNavigate()

  const handleOpenSettingsPage = () => {
    closeSettings() // Optional: Close the modal if it's used anywhere else.
    navigate("/settings") // Navigate to the settings page.
  }

  return (
    <button onClick={handleOpenSettingsPage} className="btn">
      Open Settings
    </button>
  )
}

export default SettingsDialog
