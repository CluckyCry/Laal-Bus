import type React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const SettingsPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">General Settings</h2>
          {/* Add general settings options here */}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
          {/* Add account settings options here */}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Notification Preferences</h2>
          {/* Add notification settings options here */}
        </div>
      </div>
      <Button
        onClick={() => navigate("/driver")}
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to Driver View
      </Button>
    </div>
  )
}

export default SettingsPage

