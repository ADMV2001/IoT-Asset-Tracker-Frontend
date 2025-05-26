import { Thermometer, Droplets } from "lucide-react";

const StatsCards = ({ temperature, humidity, thresholds, updateThresholds }) => {
  const handleThresholdChange = (type, value) => {
    updateThresholds({
      ...thresholds,
      [type]: Number(value)
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Temperature</p>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{temperature.toFixed(1)}°C</h3>
          </div>
          <div className="p-3 rounded-full bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 text-red-600 dark:text-red-400">
            <Thermometer className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>0°C</span>
            <span>25°C</span>
            <span>50°C</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 rounded-full"
              style={{ width: `${Math.min(100, Math.max(0, (temperature / 50) * 100))}%` }}
            ></div>
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {temperature < 10 ? "Cold" : temperature < 25 ? "Normal" : temperature < 35 ? "Warm" : "Hot"}
          </div>
          <div className="mt-4">
            <label className="text-sm text-gray-500 dark:text-white">Set Temperature Threshold (°C):</label>
            <input
              type="text"
              value={thresholds.temperature}
              onChange={(e) => handleThresholdChange('temperature', e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              min="0"
              max="50"
            />
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Humidity</p>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{humidity.toFixed(1)}%</h3>
          </div>
          <div className="p-3 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-600 dark:text-blue-400">
            <Droplets className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
              style={{ width: `${humidity}%` }}
            ></div>
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {humidity < 30 ? "Dry" : humidity < 60 ? "Comfortable" : "Humid"}
          </div>
          <div className="mt-4">
            <label className="text-sm text-gray-500 dark:text-gray-400">Set Humidity Threshold (%):</label>
            <input
              type="text"
              value={thresholds.humidity}
              onChange={(e) => handleThresholdChange('humidity', e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;