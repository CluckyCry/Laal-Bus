import React, { useState, useEffect, useRef } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, MessageSquare, User, Settings, Loader2, Search, MapIcon, Share2Icon, BookmarkIcon, CompassIcon, UserIcon, X, MapPin} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import io from "socket.io-client";
import '../assets/leafletIcons';

interface DriverLocation {
  id: string;
  position: LatLngExpression;
  path?: LatLngExpression[];
}

interface SearchResult {
  display_name: string;
  lat: number;
  lon: number;
}

const UserView: React.FC = () => {
  const navigate = useNavigate();
  const [driverLocations, setDriverLocations] = useState<DriverLocation[]>([]);
  const [followingDriverId, setFollowingDriverId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDriversCount, setActiveDriversCount] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<SearchResult | null>(null);

  const socketRef = useRef(
    io(import.meta.env.VITE_BACKEND_URL, {
      autoConnect: false,
    })
  );

  useEffect(() => {
    const socket = socketRef.current;
    socket.connect();
    socket.emit("user-connected");

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

    const fetchActiveDriversCount = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/drivers/active-count`);
        const data = await response.json();
        console.log(data.count)
        setActiveDriversCount(data.count);
      } catch (error) {
        console.error("Error fetching active drivers count:", error);
      }
    };

    fetchActiveDriversCount();

    socket.on("active-drivers-updated", fetchActiveDriversCount);

    const intervalId = setInterval(fetchActiveDriversCount, 30000);

    return () => {
      socket.offAny();
      socket.disconnect();
      clearInterval(intervalId);
    };
  }, []);

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

  const handleProfile = () => {
    setShowProfile(!showProfile);
  };

  const mapRef = useRef<any>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const results: SearchResult[] = await response.json();
      
      setSearchResults(results);
      
      if (results.length > 0) {
        const firstResult = results[0];
        setSelectedLocation(firstResult);
        
        // Zoom to location if map is available
        if (mapRef.current) {
          const map = mapRef.current;
          map.setView([firstResult.lat, firstResult.lon], 13);
        }
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleLocationSelect = (location: SearchResult) => {
    setSelectedLocation(location);
    if (mapRef.current) {
      const map = mapRef.current;
      map.setView([location.lat, location.lon], 13);
    }
    setSearchResults([]);
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
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-black/30 backdrop-blur-xl border-b border-white/10">
          <h2 className="text-xl sm:text-5xl font-bold text-white flex-grow text-center font-agharti">PASSENGER VIEW</h2>
          <div className="text-white text-xs sm:text-lg flex items-center mt-2 sm:mt-0">
            <div className={`w-3 h-3 rounded-full mr-2 ${activeDriversCount > 0 ? 'bg-green-500' : 'bg-green-500/50'}`}></div>
            {activeDriversCount} Active Driver{activeDriversCount !== 1 ? 's' : ''}
          </div>
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
              onClick={() => setShowSearchBox(true)}
              className="p-3 hover:bg-blue-700/50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              <Search className="w-6 h-6 text-white" />
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

      <AnimatePresence>
        {showProfile && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-0 right-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50"
          >
            <div className="p-6 h-full text-white">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Profile</h2>
                <button 
                  onClick={() => setShowProfile(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                    <UserIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold">User Name</h3>
                    <p className="text-sm text-gray-400">user@example.com</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <button className="w-full p-4 text-left hover:bg-white/10 rounded-lg transition-colors flex items-center space-x-3">
                    <MapIcon className="w-5 h-5" />
                    <span>My Routes</span>
                  </button>
                  <button className="w-full p-4 text-left hover:bg-white/10 rounded-lg transition-colors flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5" />
                    <span>Messages</span>
                  </button>
                  <button 
                  onClick={() => navigate("/settings")}
                  className="w-full p-4 text-left hover:bg-white/10 rounded-lg transition-colors flex items-center space-x-3">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </button>
                  <button className="w-full p-4 text-left hover:bg-white/10 rounded-lg transition-colors flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5" />
                    <span>Help & Support</span>
                  </button>
                </div>

                <button className="w-full p-4 text-left text-red-400 hover:bg-white/10 rounded-lg mt-auto transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showSearchBox && (
        <div className="absolute z-50 top-24 left-5 p-4 bg-gray-900/95 backdrop-blur-xl border-l border-white/20 shadow-2xl border rounded-lg w-80">
        <div className="flex items-center justify-between mb-2">
          <input
            type="text"
            placeholder="Search city, country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="border border-white/10 text-gray-100 p-2 w-full rounded-md mr-2 bg-gray-900/95 focus:outline-none"
          />
          <button onClick={handleSearch}>
            <Search className="w-6 h-6 mr-5 text-gray-400 hover:text-gray-200" />
          </button>
          <button onClick={() => setShowSearchBox(false)}>
            <X className="w-6 h-6 text-gray-400 hover:text-gray-200" />
          </button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="max-h-48 overflow-y-auto bg-gray-800/50 rounded-md mt-2">
            {searchResults.slice(0, 5).map((result, index) => (
              <button
                key={index}
                onClick={() => handleLocationSelect(result)}
                className="w-full p-2 text-left hover:bg-white/10 flex items-center space-x-2"
              >
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-200 truncate">
                  {result.display_name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      )}
      
    </div>
  );
};

export default UserView;