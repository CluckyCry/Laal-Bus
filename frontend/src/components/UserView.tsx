import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import io from "socket.io-client";
import '../assets/leafletIcons';
import { BottomNav } from './BottomNavUser';

interface DriverLocation {
  id: string;
  position: LatLngExpression;
  path?: LatLngExpression[];
}

const UserView: React.FC = () => {
  const [driverLocations, setDriverLocations] = useState<DriverLocation[]>([]);
  const [followingDriverId, setFollowingDriverId] = useState<string | null>(null);

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
        // Find existing driver
        const existingDriverIndex = prevLocations.findIndex(
          (driver) => driver.id === data.id
        );

        if (existingDriverIndex !== -1) {
          // Update existing driver's location and path
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
          // Add new driver
          return [...prevLocations, { ...data, path: [data.position] }];
        }
      });
    });

    socket.on("driverLocations", (drivers) => {
      console.log("Received driver locations:", drivers);

      const updatedLocations = Object.entries(drivers).map(([id, position]) => ({
        id,
        position: position as LatLngExpression,
        path: [position as LatLngExpression]
      }));

      setDriverLocations(updatedLocations);
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

  return (
    <div className="h-screen relative flex flex-col">
      <h2 className="text-2xl font-bold p-4">User View</h2>

      <div className="flex-grow relative">
        <MapContainer
          center={[24.8607, 67.0011] as LatLngExpression}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
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
      </div>

      <BottomNav
        driverLocations={driverLocations}
        followingDriverId={followingDriverId}
        setFollowingDriverId={setFollowingDriverId}
      />
    </div>
  );
};

export default UserView;

