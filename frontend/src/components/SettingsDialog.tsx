import type React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useSettings } from "./contexts/SettingsContext"

const SettingsDialog: React.FC = () => {
  const { isSettingsOpen, closeSettings } = useSettings()

  return (
    <Dialog open={isSettingsOpen} onOpenChange={closeSettings}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {/* Add your settings content here */}
          <p>Settings content goes here</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SettingsDialog

