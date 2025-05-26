import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import SensorCharts from './components/SensorCharts';
import HistoryTable from './components/HistoryTable';
import AssetStatus from './components/AssetStatus';
import vehicle from "./assets/vehicle.png";


// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom moving vehicle icon
const vehicleIcon = new L.Icon({
  iconUrl: vehicle,
  iconSize: [40, 40],
  iconAnchor: [16, 16],
});

// Connect to backend
const socket = io('http://localhost:3000');

// MovingMarker component with map access
const MovingMarker = ({ position, icon }) => {
  const markerRef = useRef(null);
  const map = useMap();

  useEffect(() => {
    if (markerRef.current && position) {
      const marker = markerRef.current;
      marker.setLatLng(position);
      map.panTo(position, {
        animate: true,
        duration: 1,
        easeLinearity: 0.25
      });
    }
  }, [position, map]);

  return (
    <Marker position={position} icon={icon} ref={markerRef}>
      <Popup>
        <div className="space-y-1">
          <p className="font-semibold">Asset Location</p>
          <p>Lat: {position[0].toFixed(6)}</p>
          <p>Lon: {position[1].toFixed(6)}</p>
        </div>
      </Popup>
    </Marker>
  );
};

function App() {
  const [gps, setGps] = useState({ latitude: 6.799045, longitude: 80.041413 });
  const [dht, setDht] = useState({ temperature: 0, humidity: 0 });
  const [accident, setAccident] = useState({ accel_m_s2: 0, shock: false, timestamp: 0 });
  const [history, setHistory] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('');
  const [thresholds, setThresholds] = useState(() => {
    const saved = localStorage.getItem('thresholds');
    return saved ? JSON.parse(saved) : { temperature: 30, humidity: 70 };
  });
  const [warnings, setWarnings] = useState({ temperature: false, humidity: false, accident: false });

  useEffect(() => {
    localStorage.setItem('thresholds', JSON.stringify(thresholds));
  }, [thresholds]);

  useEffect(() => {
    socket.on('connect', () => setIsOnline(true));
    socket.on('disconnect', () => setIsOnline(false));

    socket.on('gps', data => {
      if (data) {
        const newGps = {
          latitude: Number(data.latitude),
          longitude: Number(data.longitude)
        };
        setGps(newGps);
        setLastUpdate(new Date().toLocaleTimeString());
        setHistory(prev => [...prev.slice(-99), {
          type: 'gps',
          time: new Date().toISOString(),
          data: newGps
        }]);
      }
    });

    socket.on('dht22', data => {
      if (data) {
        setDht(data);
        setLastUpdate(new Date().toLocaleTimeString());
        setHistory(prev => [...prev.slice(-99), {
          type: 'dht',
          time: new Date().toISOString(),
          data: data
        }]);
        setWarnings(prev => ({
          ...prev,
          temperature: data.temperature > thresholds.temperature,
          humidity: data.humidity > thresholds.humidity
        }));
      }
    });

    socket.on('accident', data => {
      if (data) {
        setAccident(data);
        setLastUpdate(new Date().toLocaleTimeString());
        setHistory(prev => [...prev.slice(-99), {
          type: 'accident',
          time: new Date().toISOString(),
          data: data
        }]);
        setWarnings(prev => ({
          ...prev,
          accident: data.shock
        }));
      }
    });

    return () => {
      socket.off('gps');
      socket.off('dht22');
      socket.off('accident');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [thresholds]);

  const updateThresholds = (newThresholds) => {
    setThresholds(newThresholds);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-green-300 dark:to-green-100 dark:text-white">
      <Header warnings={warnings} />
      <div className=" pt-25 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <AssetStatus isOnline={isOnline} lastUpdate={lastUpdate} />
          </div>
          <div>
            <StatsCards
              temperature={dht.temperature}
              humidity={dht.humidity}
              thresholds={thresholds}
              updateThresholds={updateThresholds}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
              <div className="opened p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Live Location Tracking</h2>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs rounded-md font-medium">Real-time</span>
              </div>
              <div className="h-[620px]">
                <MapContainer
                  center={[gps.latitude, gps.longitude]}
                  zoom={15}
                  style={{ height: '100%', width: '100%' }}
                  className="rounded-b-xl z-0"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <MovingMarker
                    position={[gps.latitude, gps.longitude]}
                    icon={vehicleIcon}
                  />
                </MapContainer>
              </div>
            </div>
          </div>
          <div>
            <SensorCharts temperature={dht.temperature} humidity={dht.humidity} />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl mb-6">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Sensor Data History</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">{history.length} records</span>
          </div>
          <HistoryTable history={history} />
        </div>
      </div>
    </div>
  );
}

export default App;