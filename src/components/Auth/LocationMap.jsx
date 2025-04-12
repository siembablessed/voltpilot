import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Dummy data for locations
const locationData = [
  {
    name: 'Restaurant',
    coordinates: [40.7128, -74.0060],  // Example: New York City
    stations: 10,
    status: 'possible',  // "possible", "acquired", "challenged"
    quarter: 'Q1 2024',
  },
  {
    name: 'Mall',
    coordinates: [34.0522, -118.2437],  // Los Angeles
    stations: 5,
    status: 'acquired',
    quarter: 'Q1 2024',
  },
  {
    name: 'Gym',
    coordinates: [41.8781, -87.6298],  // Chicago
    stations: 7,
    status: 'challenged',
    quarter: 'Q1 2024',
  },
  {
    name: 'Hospital',
    coordinates: [29.7604, -95.3698],  // Houston
    stations: 8,
    status: 'possible',
    quarter: 'Q2 2024',
  },
  // Add more locations as needed
];

export default function LocationMap() {
  const [activeLocation, setActiveLocation] = useState(null);

  const getColor = (status) => {
    switch (status) {
      case 'possible':
        return '#28a745';  // Green for possible
      case 'acquired':
        return '#3498db';  // Blue for acquired
      case 'challenged':
        return '#e74c3c';  // Red for challenged
      default:
        return '#ccc';
    }
  };

  return (
    <div className="map-container">
      <h3>EV Station Locations Based on Amenities</h3>
      <MapContainer center={[37.7749, -122.4194]} zoom={5} style={{ width: '100%', height: '400px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {locationData.map((location, index) => {
          const position = location.coordinates;
          const color = getColor(location.status);

          return (
            <Marker
              key={index}
              position={position}
              icon={new L.Icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',  // Custom marker icon (replace with any URL)
                iconSize: [25, 25],
              })}
            >
              <Popup>
                <h4>{location.name}</h4>
                <p>{`EV Stations: ${location.stations}`}</p>
                <p>{`Quarter: ${location.quarter}`}</p>
                <p>Status: <span style={{ color }}>{location.status}</span></p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
