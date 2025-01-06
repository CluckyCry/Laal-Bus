'use client'

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { motion } from 'framer-motion';
import { AlertCircle, MessageSquare, User, Settings, Loader2, MapIcon, Share2Icon, BookmarkIcon, CompassIcon, UserIcon } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import io from "socket.io-client";
import '../assets/leafletIcons';


interface DriverLocation {
  id: string;
  position: LatLngExpression;
  path?: LatLngExpression[];
}

const UserView: React.FC = () => {
  const [driverLocations, setDriverLocations] = useState<DriverLocation[]>([]);
  const [followingDriverId, setFollowingDriverId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Socket connection
  const socketRef = useRef(
    io(import.meta.env.VITE_BACKEND_URL, {
      autoConnect: false,
    })
  );

  useEffect(() => {
    const socket = socketRef.current;
    socket.connect();
    socket.emit("user-connected");

    // Listen for driver location updates
    socket.on("driverLocationUpdate", (data: DriverLocation) => {
      console.log("Received driver location update:", data);

      setDriverLocations((prevLocations) => {
        const existingDriverIndex = prevLocations.findIndex(
          (driver) => driver.id === data.id
        );

        if (existingDriverIndex !== -1) {
          const updatedLocations = [...prevLocations];
          const existingDriver = updatedLocations[existingDriverIndex];

          updatedLocations[existingDriverIndex] = {
            ...existingDriver,
            position: data.position,
            path: [
              ...(existingDriver.path || []),
              data.position
            ]
          };

          return updatedLocations;
        } else {
          return [...prevLocations, { ...data, path: [data.position] }];
        }
      });
      setIsLoading(false);
    });

    socket.on("driverLocations", (drivers) => {
      console.log("Received driver locations:", drivers);

      const updatedLocations = Object.entries(drivers).map(([id, position]) => ({
        id,
        position: position as LatLngExpression,
        path: [position as LatLngExpression]
      }));

      setDriverLocations(updatedLocations);
      setIsLoading(false);
    });

    socket.on("driverCheck", (socketId) => {
      console.log("Driver disconnected:", socketId);
      setDriverLocations((prevDrivers) =>
        prevDrivers.filter((driverObj) => driverObj.id !== socketId)
      );
    });

    return () => {
      socket.offAny();
      socket.disconnect();
    };
  }, []);

  // Component to handle map center when following a driver
  const FollowDriverView = ({ driverId }: { driverId: string }) => {
    const map = useMap();
    const driver = driverLocations.find(d => d.id === driverId);

    useEffect(() => {
      if (driver && driver.position) {
        map.setView(driver.position, 15);
      }
    }, [driver?.position]);

    return null;
  };

  const handleEmergency = () => {
    console.log("Emergency button pressed");
  };

  const handleMessage = () => {
    console.log("Message button pressed");
  };

  const handleProfile = () => {
    console.log("Profile button pressed");
  };

  const handleSettings = () => {
    console.log("Settings button pressed");
  };

  return (
    <div className="h-screen relative flex flex-col bg-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        <div className="grid-background absolute inset-0" />
      </div>

      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10"
      >
            <div className="flex justify-between items-center p-4 bg-black/30 backdrop-blur-xl border-b border-white/10">
            <h2 className="text-5xl font-bold text-white flex-grow text-center font-agharti">PASSENGER VIEW</h2>
        </div>
      </motion.div>

      {/* Map Container */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-grow relative z-10"
      >
        <div className="h-full w-full rounded-lg overflow-hidden shadow-2xl">
          {isLoading ? (
            <div className="h-full flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-white">
                <Loader2 className="w-6 h-6 animate-spin" />
                <p>Loading driver locations...</p>
              </div>
            </div>
          ) : (
            <MapContainer
              center={[24.8607, 67.0011] as LatLngExpression}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              zoomControl={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {followingDriverId && (
                <FollowDriverView driverId={followingDriverId} />
              )}

              {driverLocations.map((driver) => (
                <React.Fragment key={driver.id}>
                  <Marker position={driver.position}>
                    <Popup>Driver ID: {driver.id}</Popup>
                  </Marker>

                  {driver.path && driver.path.length > 1 && (
                    <Polyline
                      positions={driver.path}
                      color="blue"
                      weight={3}
                      opacity={0.7}
                    />
                  )}
                </React.Fragment>
              ))}
            </MapContainer>
          )}
        </div>
      </motion.div>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10"
      >
        <nav className="bg-black/30 backdrop-blur-xl border-t border-white/10 p-4">
          <div className="flex justify-between items-center max-w-screen-xl mx-auto">
            <button 
              onClick={() => console.log("Map button clicked")}
              className="p-3 hover:bg-blue-700/50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              <MapIcon className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={() => console.log("Share button clicked")}
              className="p-3 hover:bg-blue-700/50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              <Share2Icon className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={() => console.log("Bookmark button clicked")}
              className="p-3 hover:bg-blue-700/50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              <BookmarkIcon className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={() => console.log("Compass button clicked")}
              className="p-3 hover:bg-blue-700/50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              <CompassIcon className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={handleProfile}
              className="p-3 hover:bg-blue-700/50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              <UserIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </nav>
      </motion.div>
    </div>
  );
};

export default UserView;

