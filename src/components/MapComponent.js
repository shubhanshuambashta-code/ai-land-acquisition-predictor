import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { AlertCircle, MapPin } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

/**
 * Map Component
 * Interactive map for visualizing project locations using Leaflet
 */
const MapComponent = ({ projects = [], center = [20.5937, 78.9629], zoom = 5 }) => {
  const [mapKey, setMapKey] = useState(0);

  // Create custom marker colors based on risk level
  const createMarkerIcon = (riskScore) => {
    let color = '#22c55e'; // green
    if (riskScore < 25) color = '#22c55e';
    else if (riskScore < 50) color = '#f59e0b';
    else if (riskScore < 75) color = '#ef4444';
    else color = '#7f1d1d';

    return L.divIcon({
      html: `
        <div style="background-color: ${color}; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
          ${Math.round(riskScore)}
        </div>
      `,
      className: '',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15],
    });
  };

  if (!projects || projects.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg shadow-md p-8 text-center h-96 flex flex-col items-center justify-center">
        <MapPin size={48} className="text-gray-400 mb-4" />
        <p className="text-gray-600">No projects to display on map</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden h-96">
      <MapContainer
        key={mapKey}
        center={center}
        zoom={zoom}
        style={{ width: '100%', height: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {projects.map((project) => {
          if (!project.latitude || !project.longitude) return null;
          return (
            <Marker
              key={project.id}
              position={[project.latitude, project.longitude]}
              icon={createMarkerIcon(project.riskScore || 0)}
            >
              <Popup className="rounded-lg">
                <div className="p-2 min-w-max">
                  <h4 className="font-semibold text-gray-900">{project.name}</h4>
                  <p className="text-sm text-gray-600">{project.location}</p>
                  <p className="text-sm text-gray-600">
                    Risk Score: {project.riskScore}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Status: {project.status}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
