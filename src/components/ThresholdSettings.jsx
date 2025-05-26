import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

const ThresholdSettings = ({ onThresholdChange }) => {
  const [thresholds, setThresholds] = useState({
    maxTemp: 35,
    minTemp: 10,
    maxHumidity: 70,
    minHumidity: 30
  });

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('thresholds');
    if (saved) {
      setThresholds(JSON.parse(saved));
      onThresholdChange(JSON.parse(saved));
    }
  }, [onThresholdChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setThresholds(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const saveThresholds = () => {
    localStorage.setItem('thresholds', JSON.stringify(thresholds));
    onThresholdChange(thresholds);
    alert('Thresholds saved successfully!');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 mb-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
        Alert Threshold Settings
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Max Temperature (°C)
          </label>
          <input
            type="number"
            name="maxTemp"
            value={thresholds.maxTemp}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Min Temperature (°C)
          </label>
          <input
            type="number"
            name="minTemp"
            value={thresholds.minTemp}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Max Humidity (%)
          </label>
          <input
            type="number"
            name="maxHumidity"
            value={thresholds.maxHumidity}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Min Humidity (%)
          </label>
          <input
            type="number"
            name="minHumidity"
            value={thresholds.minHumidity}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>
      <button
        onClick={saveThresholds}
        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors"
      >
        Save Thresholds
      </button>
    </div>
  );
};

export default ThresholdSettings;