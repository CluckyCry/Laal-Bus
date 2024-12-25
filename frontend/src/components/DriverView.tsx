import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL);


const DriverView: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (location) => {
        const newPosition: [number, number] = [
          location.coords.latitude,
          location.coords.longitude,
        ];
        setPosition(newPosition); // Update position
      },
      (error) => console.error('Error getting location:', error),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (position) {
      console.log('Socket ID:', socket.id); // Log socket.id
      socket.emit('updateLocation', { id: socket.id, position });
      console.log('Location emitted:', { id: socket.id, position }); // Log emitted data
    }
  }, [position]);

  return (
    <div className="h-screen">
      <h2 className="text-2xl font-bold p-4">Driver View</h2>
      {position ? (
        <MapContainer center={position} zoom={13} style={{ height: 'calc(100% - 60px)' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading your location...</p>
      )}
    </div>
  );
};

export default DriverView;
