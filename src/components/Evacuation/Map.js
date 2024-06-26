import React, { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { findNearestSafeZone } from '../../util/distance';
import { message } from 'antd';

const MarkerMap = () => {
  const [evacuationZonesData, setEvacuationZoneData] = useState([]);
  const [proximityzone, setProximityzone] = useState([]);
  const [floodZones, setFloodZones] = useState([]);

  const mapRef = useRef(null);

  const { user, setconnectedProximityZone, connectedProximityZone } = useAuth();

  const markerIcon = new L.Icon({
    iconUrl: './marker-icon-2x.png',
    iconSize: [38, 60],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
  const proximityZoneMarker = new L.Icon({
    iconUrl: './radio-icon-2x.png',
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });

  const safeZoneMarker = new L.Icon({
    iconUrl: './safezone.png',
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
  const floodMarker = new L.Icon({
    iconUrl: './flood-icon-2x.png',
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
  const userMarker = new L.Icon({
    iconUrl: './user-icon-2x.png',
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });

  const [latitude, setLatitude] = useState(37.7749);
  const [longitude, setLongitude] = useState(-122.4194);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/evacuation');
      const data = await response.json();
      const proximityResponse = await fetch(
        'http://localhost:4000/proximityzone'
      );
      const proximityData = await proximityResponse.json();

      console.log('connected proximity zone', connectedProximityZone);
      setProximityzone(proximityData);
      setEvacuationZoneData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFloodZones = async () => {
      if (connectedProximityZone) {
        const response = await fetch(
          `http://localhost:4000/floodzone/${connectedProximityZone._id}`
        );
        const data = await response.json();
        console.log('Flood zones data', data);
        setFloodZones(data);
      }
    };

    fetchFloodZones();
  }, [connectedProximityZone]);

  useEffect(() => {
    const findClosestProximityZone = () => {
      const result = findNearestSafeZone(
        [user.latitude, user.longitude],
        proximityzone
      );
      console.log(result, user);
      if (result && result.zone)
        attachToClosestProximityZone(result.zone._id, user.username);
    };

    const attachToClosestProximityZone = async (zone, user) => {
      try {
        const response = await axios.post(
          'http://localhost:4000/users/attach',
          { name: user, proximityZoneId: zone }
        );
        console.log(response.data);
        message.success(
          `Attached to closest proximity zone - ${response.data.proximityZone.zoneName}`
        );
        setconnectedProximityZone(response.data.proximityZone);
      } catch (error) {
        console.error('Failed:', error);
      }
    };

    findClosestProximityZone();
  }, [evacuationZonesData]);

  const LocationMarker = () => {
    const map = useMap({});

    useEffect(() => {
      if (mapRef.current) return;
      mapRef.current = map;

      const flyToLocation = () => {
        if (map) {
          map.flyTo([user.latitude, user.longitude], 13, {
            animate: true,
            duration: 3,
          });
          setLatitude(user.latitude);
          setLongitude(user.longitude);
        } else {
          console.log('Map not loaded');
        }
      };
      flyToLocation();
    }, [map, user]);

    return null;
  };

  return (
    <>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {evacuationZonesData.map((marker, index) => (
          <React.Fragment key={index}>
            <Circle
              center={{ lat: marker.latitude, lng: marker.longitude }}
              pathOptions={{ color: 'green' }}
              radius={600}
            />
            <Marker
              position={[marker.latitude, marker.longitude]}
              icon={safeZoneMarker}
            >
              <Popup>
                <div>
                  <h2>{marker.zoneName}</h2>
                  <p>Capacity - {marker.capacity}</p>
                  <p>Current Occupancy - {marker.currentOccupancy}</p>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}

        {proximityzone.map((marker, index) => (
          <React.Fragment key={index}>
            <Circle
              center={{ lat: marker.latitude, lng: marker.longitude }}
              pathOptions={{ color: '#66b3ff' }}
              radius={marker.radius * 1000}
            />
            <Marker
              position={[marker.latitude, marker.longitude]}
              icon={proximityZoneMarker}
            >
              <Popup>
                <div>
                  <h2>{marker.zoneName}</h2>
                  <p>Radius Covered - {marker.radius} Km</p>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}

        {floodZones.map((marker, index) => (
          <React.Fragment key={index}>
            <Circle
              center={{ lat: marker.latitude, lng: marker.longitude }}
              pathOptions={{ color: 'red' }}
              radius={marker.radius}
            />
            <Marker
              position={[marker.latitude, marker.longitude]}
              icon={floodMarker}
            >
              <Popup>
                <div>
                  <h2>Flood Zone</h2>
                  <p>Radius Covered - {marker.radius} meters</p>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}

        <Marker position={[latitude, longitude]} icon={userMarker}>
          <Popup>
            <div>
              <h2>Your Location</h2>
              <p>Latitude - {latitude}</p>
              <p>Longitude - {longitude}</p>
            </div>
          </Popup>
        </Marker>

        <LocationMarker />
      </MapContainer>
    </>
  );
};

export default MarkerMap;
