import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Dummy data for locations
const locationData = [
  {
    name: 'Restaurant - NYC',
    coordinates: [40.7128, -74.0060],
    stations: 10,
    status: 'possible',
    quarter: 'Q1 2024',
    level: 'AC Level One',
    forecast: 'High',
    grade: 'A',
  },
  {
    name: 'Mall - LA',
    coordinates: [34.0522, -118.2437],
    stations: 5,
    status: 'acquired',
    quarter: 'Q1 2024',
    level: 'AC Level Two',
    forecast: 'Moderate',
    grade: 'B',
  },
  {
    name: 'Gym - Chicago',
    coordinates: [41.8781, -87.6298],
    stations: 7,
    status: 'challenged',
    quarter: 'Q1 2024',
    level: 'DCFC',
    forecast: 'Low',
    grade: 'C',
  },
  {
    name: 'Hospital - Houston',
    coordinates: [29.7604, -95.3698],
    stations: 8,
    status: 'possible',
    quarter: 'Q2 2024',
    level: 'AC Level One',
    forecast: 'Moderate',
    grade: 'B',
  },
];

const statusColors = {
  possible: '#28a745',   // Green
  acquired: '#3498db',   // Blue
  challenged: '#e74c3c', // Red
};

export default function LocationMap() {
  const [activeLocation, setActiveLocation] = useState(null);

  return (
    <div className="map-container">
      <h3>EV Station Locations Based on Amenities</h3>

      <MapContainer center={[37.7749, -122.4194]} zoom={5} scrollWheelZoom={true} style={{ width: '100%', height: '400px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {locationData.map((location, index) => {
          const markerColor = statusColors[location.status] || '#999';

          return (
            <Marker
              key={index}
              position={location.coordinates}
              icon={new L.Icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                iconSize: [25, 25],
              })}
            >
              <Popup>
                <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
                  <strong>{location.name}</strong><br />
                  📍 <strong>Status:</strong> <span style={{ color: markerColor }}>{location.status}</span><br />
                  ⚡ <strong>Charging Level:</strong> {location.level}<br />
                  📊 <strong>Usage Forecast:</strong> {location.forecast}<br />
                  🏅 <strong>Grade:</strong> {location.grade}<br />
                  🔢 <strong>Stations Planned:</strong> {location.stations}<br />
                  📆 <strong>Quarter:</strong> {location.quarter}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
