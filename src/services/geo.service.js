// Montar funções que façam o calculo de Haversine para determinar distancia

import usersRepository from '../repositories/users.repository.js';

async function findNearbyUsers(hemoLatitude, hemoLongitude, radiusKm) {
  const users = await usersRepository.getUsers();

  return users.filter(user => {
    const distance = calculateDistance(
      hemoLatitude,
      hemoLongitude,
      user.latitude,
      user.longitude
    );
    console.log(distance);
    return distance <= radiusKm;
  });
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}

export default {
  findNearbyUsers,
  calculateDistance,
};