import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Bell, Menu, X, AlertTriangle } from 'lucide-react';

const Header = ({ warnings }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);
  // Exclude accident from warningCount since it's displayed directly
  const warningCount = (warnings.temperature ? 1 : 0) + (warnings.humidity ? 1 : 0);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-green-600 to-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        {/* Accident Warning */}
        {warnings.accident && (
          <div className="mb-4 p-3 bg-red-600 rounded-lg flex items-center justify-center space-x-2 animate-pulse">
            <AlertTriangle className="h-5 w-5 text-white" />
            <p className="text-white font-semibold text-sm md:text-base">
              Accident Detected! Immediate Attention Required.
            </p>
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 p-2 rounded-lg">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Asset Tracking</h1>
              <p className="text-violet-200 mt-1 text-sm">Real-time asset tracking and analytics</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <button
                className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setIsPopupOpen(!isPopupOpen)}
              >
                <Bell className="h-5 w-5" />
                {warningCount > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              <div className="flex items-center space-x-2">
                <div className="bg-yellow-500 px-3 py-1 rounded-full text-sm font-medium">Live</div>
              </div>
            </div>
          </div>
          <button className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            ref={popupRef}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-sm w-full mx-4 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Notifications</h2>
              <button
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setIsPopupOpen(false)}
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="space-y-2">
              {warningCount === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No active warnings.</p>
              ) : (
                <>
                  {warnings.temperature && (
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-md">
                      <p className="text-red-600 dark:text-red-400">
                        Temperature threshold exceeded!
                      </p>
                    </div>
                  )}
                  {warnings.humidity && (
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-md">
                      <p className="text-red-600 dark:text-red-400">
                        Humidity threshold exceeded!
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;