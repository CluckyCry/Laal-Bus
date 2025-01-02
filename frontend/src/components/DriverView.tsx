import React, { useEffect, useState, useRef } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup 
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';
import { BottomNavDriver } from './BottomNavDriver';

interface DriverViewProps {
  onLogout: () => void;
}

const DriverView: React.FC<DriverViewProps> = ({ onLogout }) => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const socketRef = useRef<any>(null);

  // Create socket connection once
  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_BACKEND_URL, {
      autoConnect: false
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Geolocation tracking
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (location) => {
        const newPosition: [number, number] = [
          location.coords.latitude,
          location.coords.longitude,
        ];
        setPosition(newPosition);
      },
      (error) => console.error('Error getting location:', error),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Location emission
  useEffect(() => {
    if (position && socketRef.current) {
      // Ensure socket is connected
      if (!socketRef.current.connected) {
        socketRef.current.connect();
      }

      // Wait a bit to ensure connection is established
      const timeoutId = setTimeout(() => {
        console.log("Emitting location with ID:", socketRef.current.id, {
          id: socketRef.current.id,
          position: position
        });

        socketRef.current.emit('updateLocation', { 
          id: socketRef.current.id, 
          position: position 
        });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [position]);

  const handleEmergency = () => {
    console.log("Emergency button pressed");
    // Add emergency logic here
  };

  const handleMessage = () => {
    console.log("Message button pressed");
    // Add messaging logic here
  };

  const handleProfile = () => {
    console.log("Profile button pressed");
    // Add profile viewing/editing logic here
  };

  const handleSettings = () => {
    console.log("Settings button pressed");
    // Add settings logic here
  };

  return (
    <div className="h-screen relative flex flex-col">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-bold">Driver View</h2>
        <button 
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <div className="flex-grow relative">
        {position ? (
          <MapContainer 
            center={position} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>You are here</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p className="text-center mt-4">Loading your location...</p>
        )}
      </div>
      <BottomNavDriver
        onEmergency={handleEmergency}
        onMessage={handleMessage}
        onProfile={handleProfile}
        onSettings={handleSettings}
      />
    </div>
  );
};

export default DriverView;

