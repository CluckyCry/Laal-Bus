import type React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface ProfileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Driver Profile</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          {/* Placeholder for profile information */}
          <p>Name: John Doe</p>
          <p>ID: 12345</p>
          <p>Vehicle: Toyota Camry</p>
          {/* Add more profile information as needed */}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ProfileSidebar

