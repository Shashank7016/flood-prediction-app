import React, { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
  Circle,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../../contexts/AuthContext';

const MarkerMap = () => {
  const [evacuationZonesData, setEvacuationZoneData] = useState([]);
  const [proximityzone, setProximityzone] = useState([]);
  const mapRef = useRef(null);
  // const map = useMap();

  const { user } = useAuth();

  const markerIcon = new L.Icon({
    iconUrl: './marker-icon-2x.png',
    iconSize: [38, 60], // Adjust as needed
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
  const safeZoneMarker = new L.Icon({
    iconUrl: './safezone.png',
    iconSize: [38, 38], // Adjust as needed
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });

  const [latitude, setLatitude] = useState(37.7749);
  const [longitude, setLongitude] = useState(-122.4194);

  useEffect(() => {
    // Example: Fetch data from an API

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       const latitude = position.coords.latitude;
    //       const longitude = position.coords.longitude;
    //       console.log(latitude, longitude);
    //       setLatitude(latitude);
    //       setLongitude(longitude);
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
    // } else {
    //   console.error('Geolocation is not supported by this browser.');
    // }

    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/evacuation');
      const data = await response.json();
      setEvacuationZoneData(data);
      // console.log(data);
    };
    fetchData();
  }, []);

  const LoactionMaker = () => {
    const map = useMap({});

    useEffect(() => {
      if (mapRef.current) return;
      mapRef.current = map;

      const flyToLocation = () => {
        if (map) {
          // console.log('user', user);
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

    // const handleClickInteraction = (e) => {
    //   console.log('clicked on ', e.latlng);
    // };

    // map.on('click', handleClickInteraction);

    // return () => {
    //   map.off('click', handleClickInteraction);
    // };
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
          <>
            <Circle
              center={{ lat: marker.latitude, lng: marker.longitude }}
              pathOptions={{ color: 'green' }}
              radius={600}
            />
            <Marker position={[latitude, longitude]} icon={markerIcon}></Marker>
            <Marker
              key={index}
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
          </>
        ))}
        <LoactionMaker />
      </MapContainer>
    </>
  );
};

export default MarkerMap;
