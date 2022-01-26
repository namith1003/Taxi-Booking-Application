
const MAPBOX_KEY = 'pk.eyJ1IjoicmFkaXRoYSIsImEiOiJja3N6MGozNXUxNzFxMnVxa3lkZDZqNW5yIn0.q3UJUolzhxfJtZTx9Nqo5g';
const OPENCAGE_KEY = 'd2e24e7a196f4ec78300f6b2634870bb';
/**
 * webServiceRequest function
 * Generic web service request function to call a web service that supports jsonp.
 * @param {string} url address of the web service
 * @param {object} data object containing querystring params as key:value. must contain callback/jsonp attribute for jsonp
 */
function webServiceRequest(url,data)
{
	// Build URL parameters from data object.
    let params = "";
    // For each key in data object...
    for (let key in data)
    {
        if (data.hasOwnProperty(key))
        {
            if (params.length == 0)
            {
                // First parameter starts with '?'
                params += "?";
            }
            else
            {
                // Subsequent parameter separated by '&'
                params += "&";
            }

            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);

            params += encodedKey + "=" + encodedValue;
         }
    }
    let script = document.createElement('script');
    script.src = url + params;
    document.body.appendChild(script);
}

/**
 * sendXMLRequestForPlaces function
 * This is a wrapper to call the MapBox Search API for points of interest
 * @param {string} query category of search. The following categories are supported: attraction, lodging, food, gas station
 * @param {number} lng the longitude coordinates
 * @param {number} lat the latitude coordinates
 * @param {function} successCallback contains the function to call as the callback function when this web service request resolves
 */
function sendXMLRequestForPlaces(query,lng,lat,successCallback)
{
  let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(query)+'.json?limit=10&proximity='+ lng + ',' + lat + '&access_token=' + MAPBOX_KEY;
  let req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onload = function() {
    successCallback( JSON.parse(req.response));
  }
  req.send();
}

/**
 * sendXMLRequestForRoute function
 * This is a wrapper to call the MapBox Direction API for driving routing directions.
 * @param {number} startLat the start point latitude coordinates
 * @param {number} startLng the start point longitude coordinates
 * @param {number} endLat the end point latitude coordinates
 * @param {number} endLng the end point longitude coordinates
 * @param {function} directionsCallback contains the function to call as the callback function when this web services request resolves
 */
function sendXMLRequestForRoute(destinations)
{
  var route = "";
  console.log(destinations)
  for (var i = 0; i < destinations.length-1; i++){
    if (i != destinations.length - 2){
        route = route + destinations[i].markerLocation[0] + "," + destinations[i].markerLocation[1] + ";";
    }
    else{
        route = route + destinations[i].markerLocation[0] + "," + destinations[i].markerLocation[1];
    }
  }
  let url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + route + '?steps=true&geometries=geojson&access_token=' + MAPBOX_KEY;
  let req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onload = function() {
    directionsCallback(JSON.parse(req.response));
  }
  req.send();
}

/**
 * sendWebServiceRequestForReverseGeocoding function
 * This is a wrapper to call the OpenCage Reverse Geocoder using the webServiceRequest function to obtain addresses from lat/lng coordinates
 * @param {number} lat the latitude coordinates
 * @param {number} lng the longitude coordinates
 * @param {string} callback contains the function name as a string to call as the callback function when this web services request resolves
 */
function sendWebServiceRequestForReverseGeocoding(lat,lng,callback)
{
	let url = "https://api.opencagedata.com/geocode/v1/json";
	let data = {
		q: `${lat}+${lng}`,
		key: OPENCAGE_KEY,
		jsonp: callback
	};
	webServiceRequest(url,data);
}

/**
 * sendWebServiceRequestForForwardGeocoding function
 * This is a wrapper to call the OpenCage Forward Geocoder using the webServiceRequest function to obtain lat/lng coordinates from an address
 * @param {string} location the address
 * @param {string} callback contains the function name as a string to call as the callback function when this web services request resolves
 */
function sendWebServiceRequestForForwardGeocoding(location,callback)
{
	let url = "https://api.opencagedata.com/geocode/v1/json";
	let data = {
		q: `${location}`,
		key: OPENCAGE_KEY,
		jsonp: callback
	};
	webServiceRequest(url,data);
}

/**
 * getUserCurrentLocationUsingGeolocation function
 * This is a wrapper to call the browser Geolocation API to request for the user's current location
 * @param {function} callback contains the function to call as the callback function when this geolocation request resolves
 */
function getUserCurrentLocationUsingGeolocation(callback)
{
  if('geolocation' in navigator) {
    // geolocation is available
    navigator.geolocation.getCurrentPosition((position) => {
        callback(position.coords.latitude, position.coords.longitude);
    });
  } else {
    // geolocation IS NOT available
    console.log("Geolocation is not available");
  }
}

/**
 * checkLSData function
 * Used to check if any data in LS exists at a specific key
 * @param {string} key LS Key to be used
 * @returns true or false representing if data exists at key in LS
 */
 function checkLSData(key)
 {
     if (localStorage.getItem(key) != null)
     {
         return true;
     }
     return false;
 }

 /**
  * retrieveLSData function
  * Used to retrieve data from LS at a specific key. 
  * @param {string} key LS Key to be used
  * @returns data from LS in JS format
  */
 function retrieveLSData(key)
 {
     let data = localStorage.getItem(key);
     try
     {
         data = JSON.parse(data);
     }
     catch(err){}
     finally
     {
         return data;
     }
 }
 
 /**
  * updateLSData function
  * Used to store JS data in LS at a specific key
  * @param {string} key LS key to be used
  * @param {any} data data to be stored
  */
 function updateLSData(key, data)
 {
     let json = JSON.stringify(data);
     localStorage.setItem(key, json);
 }
 
 function callback(data){
    alert("Location: " + data.results[0].formatted);
    desMarkers[destinations].locationName = data.results[0].formatted;
    
}

 function editCallback(data){
    desMarkers[destinations].locationName = data.results[0].formatted;
    
}
