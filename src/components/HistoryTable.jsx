import { MapPin, Thermometer, AlertTriangle } from "lucide-react";

const HistoryTable = ({ history }) => {
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString();
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString();
  };

  return (
    <div className="overflow-x-auto">
      {history.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Sensor
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Data
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {history
              .slice()
              .reverse()
              .map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700/30"
                  } hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(item.time)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatTime(item.time)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.type === "gps" ? (
                      <div className="flex items-center">
                        <div className="p-1.5 bg-green-100 dark:bg-green-900 rounded-md text-green-600 dark:text-green-400 mr-2">
                          <MapPin className="h-3 w-3" />
                        </div>
                        <span className="text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1">
                          GPS
                        </span>
                      </div>
                    ) : item.type === "dht" ? (
                      <div className="flex items-center">
                        <div className="p-1.5 bg-blue-100 dark:bg-blue-900 rounded-md text-blue-600 dark:text-blue-400 mr-2">
                          <Thermometer className="h-3 w-3" />
                        </div>
                        <span className="text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1">
                          DHT22
                        </span>
                      </div>
                    ) : item.type === "accident" ? (
                      <div className="flex items-center">
                        <div className="p-1.5 bg-red-100 dark:bg-red-900 rounded-md text-red-600 dark:text-red-400 mr-2">
                          <AlertTriangle className="h-3 w-3" />
                        </div>
                        <span className="text-xs font-semibold rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 px-2 py-1">
                          Accident
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs font-semibold rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1">
                        Unknown
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.type === "gps" && item.data ? (
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-800 dark:text-gray-200 text-xs">
                          Lat: <span className="font-mono">{(item.data.latitude || 0).toFixed(4)}</span>
                        </span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-800 dark:text-gray-200 text-xs">
                          Lon: <span className="font-mono">{(item.data.longitude || 0).toFixed(4)}</span>
                        </span>
                      </div>
                    ) : item.type === "dht" && item.data ? (
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-red-50 dark:bg-red-900/30 rounded text-red-800 dark:text-red-200 text-xs">
                          Temp: <span className="font-mono">{(item.data.temperature || 0).toFixed(1)}°C</span>
                        </span>
                        <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 rounded text-blue-800 dark:text-blue-200 text-xs">
                          Hum: <span className="font-mono">{(item.data.humidity || 0).toFixed(1)}%</span>
                        </span>
                      </div>
                    ) : item.type === "accident" && item.data ? (
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-red-50 dark:bg-red-900/30 rounded text-red-800 dark:text-red-200 text-xs">
                          Accel: <span className="font-mono">{(item.data.accel_m_s2 || 0).toFixed(2)} m/s²</span>
                        </span>
                        <span className="px-2 py-1 bg-red-50 dark:bg-red-900/30 rounded text-red-800 dark:text-red-200 text-xs">
                          Shock: <span className="font-mono">{item.data.shock ? "Yes" : "No"}</span>
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400 text-xs">No data</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
          <svg
            className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-lg font-medium">No data available yet</p>
          <p className="text-sm">Sensor readings will appear here once received</p>
        </div>
      )}
    </div>
  );
};

export default HistoryTable;