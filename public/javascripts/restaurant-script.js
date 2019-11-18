// window.addEventListener('load', () => {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: {
      lat: 41.38623, 
      lng: 2.17498
    }
  });
  getRestaurants(map);

function getRestaurants(daMap){
  axios
    .get('/api')
    // .then(responseFromDB => console.log('Response from the DB:', responseFromDB))
    .then(responseFromDB => placeRestaurants(responseFromDB.data, daMap))
    .catch(err => console.log(err));
}

function placeRestaurants(restaurants, theMap){
  for (let oneRestaurant of restaurants) {
    const whereToPin = {
      lat: oneRestaurant.location.coordinates[1],
      lng: oneRestaurant.location.coordinates[0]
    };
    
    new google.maps.Marker({
      position: whereToPin,
      map: theMap,
      title: oneRestaurant.name
    });
  }
}


const geocoder = new google.maps.Geocoder();

document.getElementById('submit').addEventListener('click', () => {
  geocodeAddress(geocoder, map);
});

function geocodeAddress(geocoder, resultsMap) {
  const address = document.getElementById('address').value;

  geocoder.geocode({ address: address }, (results, status) => {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      let marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      document.getElementById('latitude').value = results[0].geometry.location.lat();
      document.getElementById('longitude').value = results[0].geometry.location.lng();
    } else {
      console.log(`Geocode was not successful for the following reason: ${status}`);
    }
  });
}

// });