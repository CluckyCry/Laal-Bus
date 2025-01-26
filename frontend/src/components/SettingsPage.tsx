import React from "react";
import { useNavigate } from "react-router-dom";
import { X, Bell, MapPin, Bus, Wallet, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
}

const MenuItem = ({ icon, label, description }: MenuItemProps) => (
  <Card className="flex items-center justify-between p-4 hover:bg-accent cursor-pointer transition-colors">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-full bg-red-100">{icon}</div>
      <div>
        <h3 className="font-medium">{label}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
    <MapPin className="w-4 h-4 text-muted-foreground" />
  </Card>
);

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto h-screen bg-background md:max-w-2xl lg:max-w-3xl">
      {/* Header */}
      <div className="bg-red-600 text-white p-6 pt-12 rounded-b-[2rem]">
        <div className="flex justify-between mb-4">
          <Button variant="ghost" size="icon" className="hover:bg-red-500 text-white" onClick={() => navigate("/")}>
            <X className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-red-500 text-white">
            <Bell className="w-6 h-6" />
          </Button>
        </div>
        <div className="text-center mb-20">
          <h1 className="text-2xl font-bold mb-1 md:text-3xl lg:text-4xl">LaalBus</h1>
          <p className="text-sm opacity-80 md:text-base">Track your bus in real-time</p>
        </div>
      </div>

      {/* Profile Section */}
      <div className="relative px-6">
        <div className="absolute left-1/2 -translate-x-1/2 -top-12">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-red-500 flex items-center justify-center">
            <Bus className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 mt-16 space-y-3">
        <MenuItem
          icon={<MapPin className="w-5 h-5 text-red-600" />}
          label="Live Tracking"
          description="Track your bus in real-time"
        />
        <MenuItem
          icon={<History className="w-5 h-5 text-red-600" />}
          label="Travel History"
          description="View your past journeys"
        />
        <MenuItem
          icon={<Wallet className="w-5 h-5 text-red-600" />}
          label="Payment Methods"
          description="Manage your payment options"
        />
        <MenuItem
          icon={<Bus className="w-5 h-5 text-red-600" />}
          label="My Routes"
          description="View your favorite routes"
        />
      </div>
    </div>
  );
};

export default SettingsPage;