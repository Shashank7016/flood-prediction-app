export const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance; // Distance in kilometers
};

export const findNearestSafeZone = (currentLocation, safeZones) => {
  const [currentLat, currentLon] = currentLocation;
  let nearestSafeZone = null;
  let shortestDistance = Infinity;

  safeZones.forEach((zone, index) => {
    const distance = haversineDistance(
      currentLat,
      currentLon,
      zone.latitude,
      zone.longitude
    );
    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestSafeZone = {
        index,
        coordinates: [zone.latitude, zone.longitude],
        distance,
        zone,
      };
    }
  });

  return nearestSafeZone;
};

export const findZonesByProximity = (currentLocation, safeZones) => {
  const [currentLat, currentLon] = currentLocation;

  const zonesWithDistance = safeZones.map((zone) => {
    const distance = haversineDistance(
      currentLat,
      currentLon,
      zone.latitude,
      zone.longitude
    );
    return {
      ...zone,
      distance,
    };
  });

  zonesWithDistance.sort((a, b) => a.distance - b.distance);

  return zonesWithDistance;
};
