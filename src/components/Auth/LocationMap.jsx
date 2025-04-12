import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const locationData = [
  {
    name: 'Restaurant',
    coordinates: [40.7128, -74.0060],  // Example: New York City
    stations: 10,
  },
  {
    name: 'Mall',
    coordinates: [34.0522, -118.2437],  // Los Angeles
    stations: 5,
  },
  {
    name: 'Gym',
    coordinates: [41.8781, -87.6298],  // Chicago
    stations: 7,
  },
  {
    name: 'Hospital',
    coordinates: [29.7604, -95.3698],  // Houston
    stations: 8,
  },
  // Add more locations as needed
];

export default function LocationMap() {
  const [activeLocation, setActiveLocation] = useState(null);

  return (
    <div className="map-container">
      <h3>Ideal Locations for EV Stations</h3>
      <MapContainer center={[37.7749, -122.4194]} zoom={5} style={{ width: '100%', height: '400px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {locationData.map((location, index) => (
          <Marker
            key={index}
            position={location.coordinates}
            icon={new L.Icon({
              iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Custom marker icon (replace with any URL)
              iconSize: [25, 25],
            })}
          >
            <Popup>
              <h4>{location.name}</h4>
              <p>{`EV Stations that can be built: ${location.stations}`}</p>
              <p>Nearby amenities include: {location.name}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
