import { MapIcon, Share2Icon, BookmarkIcon, CompassIcon, UserIcon } from 'lucide-react'
import { LatLngExpression } from 'leaflet'

interface BottomNavProps {
  driverLocations: Array<{
    id: string;
    position: LatLngExpression;
    path?: LatLngExpression[];
  }>;
  followingDriverId: string | null;
  setFollowingDriverId: (id: string | null) => void;
}

export function BottomNav({ driverLocations, followingDriverId, setFollowingDriverId }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1000]">
      {/* Bus Selection Pagination */}
      {driverLocations.length > 1 && (
        <div className="mx-4 mb-2">
          <h3 className="text-center text-sm font-medium mb-2 text-gray-600">Select a bus to follow:</h3>
          <div className="bg-red-700/30 backdrop-blur-sm rounded-lg p-3 shadow-lg flex justify-center gap-2">
            {driverLocations.map((driver, index) => (
              <button
                key={driver.id}
                onClick={() => setFollowingDriverId(
                  followingDriverId === driver.id ? null : driver.id
                )}
                className={`
                  min-w-[40px] h-8 rounded-md text-sm font-medium transition-all duration-300 ease-in-out
                  ${followingDriverId === driver.id 
                    ? 'bg-white text-red-700 shadow-md transform scale-105' 
                    : 'bg-red-600/50 hover:bg-red-500/70 text-white hover:shadow-md hover:scale-105'
                  }
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 shadow-lg px-6 py-4">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <button className="p-3 hover:bg-red-700/50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110">
            <MapIcon className="w-6 h-6 text-white" />
          </button>
          <button className="p-3 hover:bg-red-700/50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110">
            <Share2Icon className="w-6 h-6 text-white" />
          </button>
          <button className="p-3 hover:bg-red-700/50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110">
            <BookmarkIcon className="w-6 h-6 text-white" />
          </button>
          <button className="p-3 hover:bg-red-700/50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110">
            <CompassIcon className="w-6 h-6 text-white" />
          </button>
          <button className="p-3 hover:bg-red-700/50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110">
            <UserIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default BottomNav;

