import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import {useEffect, useState} from 'react';
import {item, nearest_recycling_center_name, nearest_recycling_center_addr, nearest_recycling_center_latitude, nearest_recycling_center_longitude} from "./autocomplete/AutoCompleteSearch";
import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyBkvoXX39fvUBPhw_lg-iGTQpFgmi5z9uI");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("us");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

const containerStyle = {
  width: '575px',
  height: '575px'
};

//console.log("lat: " + localStorage.getItem('user_latitude'));

const center = {
  lat: parseFloat(localStorage.getItem('user_latitude')),
  lng: parseFloat(localStorage.getItem('user_longitude'))
};

//Have to redo
const nearest_recycling_center = {
  lat: parseFloat(localStorage.getItem('nearest_recycling_center_latitude')),
  lng: parseFloat(localStorage.getItem('nearest_recycling_center_longitude'))
};

//console.log(center);

function Mapping() {

  /*
  const get_new_position_coords = {
    // Get latitude & longitude from address.
    //console.log(localStorage.getItem('nearest_recycling_center_addr'));
    Geocode.fromAddress('42 Palomino Drive, Franklin, MA').then(
      (response) => {
        const latitude = parseFloat(response.results[0].geometry.location.lat);
        const longitude = parseFloat(response.results[0].geometry.location.lng);
        console.log("lat: " + latitude);
        console.log("lng: " + longitude);
        localStorage.setItem('new_lat', latitude);
        localStorage.setItem('new_lng', latitude);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  */


const new_position_coords = {
  lat: parseFloat(localStorage.getItem('new_lat')),
  lng: parseFloat(localStorage.getItem('new_lng'))
};


  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBkvoXX39fvUBPhw_lg-iGTQpFgmi5z9uI"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={center}></Marker>

        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default Mapping