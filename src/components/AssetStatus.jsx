import React from 'react';
import { Clock, Truck, User, PenToolIcon as Tool, Signal, Wifi } from 'lucide-react';

const AssetStatus = ({ isOnline, lastUpdate }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Asset Status</h2>
        <div className="flex items-center space-x-2">
          <div className={`h-3 w-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className={`text-sm font-medium ${isOnline ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-full ${isOnline ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'}`}>
              <Signal className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-lg font-medium">{isOnline ? 'Connected' : 'Disconnected'}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Last update: {lastUpdate || 'Never'}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-md text-purple-600 dark:text-purple-400">
                <Wifi className="h-4 w-4" />
              </div>
              <span className="font-medium">Connection Status</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Signal Strength</span>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className={`h-2 w-6 rounded-sm ${isOnline && i <= 3 ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-600'}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-md text-cyan-600 dark:text-cyan-400">
                <Clock className="h-4 w-4" />
              </div>
              <span className="font-medium">Data Frequency</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Update Interval</span>
              <span className="text-gray-800 dark:text-gray-200 font-medium">~5 sec</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
            <Truck className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
            Asset Information
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Asset ID</p>
              <p className="font-medium">TRK-2023-001</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Vehicle Type</p>
              <p className="font-medium">Delivery Truck</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Assigned Driver</p>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                <p className="font-medium">John D.</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Service</p>
              <div className="flex items-center">
                <Tool className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                <p className="font-medium">15 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetStatus;
