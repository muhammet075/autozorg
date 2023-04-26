

  // Functie om de afstand tussen twee punten op aarde te berekenen met behulp van de Haversine-formule
  function distance(lat1, lng1, lat2, lng2) {
    const earthRadius = 6371; // km
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  }

  // Functie om de dichtstbijzijnde stad te vinden
  function findNearestCity(lat, lng, cities) {
    let minDist = Infinity;
    let closestCity = null;

    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      const dist = distance(lat, lng, city.lat, city.lng);

      if (dist < minDist) {
        minDist = dist;
        closestCity = city;
      }
    }

    return closestCity;
  }

  // Zoek de dichtstbijzijnde stad en log het resultaat in de console
  const nearestCity = findNearestCity(userLat, userLng, plaatsen);
  console.log(nearestCity.city);
