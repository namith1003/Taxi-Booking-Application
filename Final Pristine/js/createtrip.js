
// Add the control to the map.
const geocoder = new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl
}); 


// check for every time the users location changes      
positionOptions = {
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge: 0
        };
		
navigator.geolocation.watchPosition(success, errorHandler,positionOptions);
        


var mainMap;                                               // stores the main map for the current run
var destination;	                                       // stores the coordinates for the users end location for the run
var destinationPicked=false;                                   //to check if accuracy falls under necessary criteria of 20m
var mapShown=false;                                        //for map to not repeatedly refreshed when success function is called.
var endTime,startTime;                                     // saves the start and end tim for the run
var runIndex = JSON.parse(localStorage.getItem(APP_PREFIX));    // gets all the runs user has done and is saved in the local storage
var runPointer = localStorage.getItem(APP_PREFIX+"-selectedRun");    // stores the clicked run by user's index in local storage
var startPos;
var destinations = 1;
var desMarkers = [];
var responseData;
var pickUpFound = false;
var startLocBtn=document.getElementById("startLocBtn");    // saves the HTML element of the begin run button
var desLocBtn=document.getElementById("destinationLocBtn");      // saves the HTML element of the random destination button
var run1;

if (checkLSData('temporary')){ 
    run1 = retrieveLSData('temporary');
    console.log(run1)
}else{
    run1=new Trip();
}
    


desMarkers[destinations] = new marker();
desMarkers[0] = new marker();        
/*
 *  this function runs every time the users location changes
*/
function success(position){
	
    var crdLat = Number(position.coords.latitude);       // takes the user current latitude
    var crdLng = Number(position.coords.longitude);      // takes users current longitude
	accuracy=Number(position.coords.accuracy);           // takes users current accuracy
    startPos=new mapboxgl.LngLat(crdLng,crdLat);         // creates a LngLat object of users current location
	
	
    if (checkLSData('temporary')){
        if (mapShown===false)
        {
            markers = retrieveLSData('destinations')
            mainMap = new OurMap([crdLng,crdLat]);
            mainMap.map;
            
            var stylerCurrent=new Styling([markers[0][0],markers[0][1]],'images/userIcon.png',30);
            // add marker to map
            desMarkers[0].marker.remove();
            desMarkers[0] = new marker();
            desMarkers[0].markerLocation=[markers[0][0],markers[0][1],stylerCurrent.el];
            // mark current location as a start pointer
            desMarkers[0].marker.addTo(mainMap.map);
            destination = new mapboxgl.LngLat(markers[0][0],markers[0][1]);
            pickUpFound = true;    
            for (let i = 1; i< markers.length-1; i++){
                var stylerCurrent=new Styling([markers[i][0],markers[i][1]],'images/redIcon.jpg',30);
                // add marker to map
                desMarkers[i] = new marker();
                desMarkers[i].markerLocation=[markers[i][0],markers[i][1],stylerCurrent.el];
                // mark current location as a start pointer
                desMarkers[i].marker.addTo(mainMap.map);
                destination = new mapboxgl.LngLat(markers[i][0],markers[i][1]);
                sendWebServiceRequestForReverseGeocoding(markers[i][0],markers[i][1],"editCallback");
                destinations++;
            }
            
            desLocBtn.disabled = false;
            let pickUp=document.getElementById("pickUp");
            let newPickUp= desMarkers[0].locationName;
            pickUp.innerHTML="Pickup:"+ newPickUp;
            
            
            desMarkers[destinations] = new marker();
            if (desMarkers.length > 1){
                sendXMLRequestForRoute(desMarkers);
            }
            displayLocations();
            
            console.log(run1._time);
            console.log(run1._date);
            document.getElementById("time").value = run1._time;
            document.getElementById("date").value = run1._date;
            document.getElementById("taxitype").value = run1._vehicleType;
            mapShown=true;
            
            
            
        }
    }
    else{
        // checks if map was shown once to avoid refreshing	
        if (mapShown===false)
        {
            
            mainMap=new OurMap([crdLng,crdLat]);
            mainMap.map; // line to display the map and is only displayed once .

            
            document.getElementById('geocoder').appendChild(geocoder.onAdd(mainMap.map));
            
            var stylerCurrent=new Styling([crdLng,crdLat],'images/userIcon.png',30);
            // add marker to map
            desMarkers[0].marker.remove();
            desMarkers[0] = new marker();
            desMarkers[0].markerLocation=[crdLng,crdLat,stylerCurrent.el];
            // mark current location as a start pointer
            desMarkers[0].marker.addTo(mainMap.map);
            
            startLocBtn.disabled = false;
            desLocBtn.disabled = true;
            mapShown=true;

        }
    }
    
    
	// if a run has been repeated
    
    
    mainMap.map.on('click', (e) => {
        if (pickUpFound == false)
        {
            var coordinates = e.lngLat;
            var stylerCurrent=new Styling([coordinates.lng,coordinates.lat],'images/userIcon.png',30);
            // add marker to map
            desMarkers[0].marker.remove();
            desMarkers[0] = new marker();
            desMarkers[0].markerLocation=[coordinates.lng,coordinates.lat,stylerCurrent.el];
            // mark current location as a start pointer
            desMarkers[0].marker.addTo(mainMap.map);
            destination = new mapboxgl.LngLat(coordinates.lng,coordinates.lat);
        }
        else 
        {
            destinationPicked = true;
            var coordinates = e.lngLat;
            var stylerCurrent=new Styling([coordinates.lng,coordinates.lat],'images/redIcon.jpg',30);
   
            // add marker to map
            desMarkers[destinations].marker.remove();
            desMarkers[destinations] = new marker();
            desMarkers[destinations].markerLocation=[coordinates.lng,coordinates.lat,stylerCurrent.el];
            // mark current location as a start pointer
            desMarkers[destinations].marker.addTo(mainMap.map);
            destination = new mapboxgl.LngLat(coordinates.lng,coordinates.lat);
        }
    });
}        
             
    
// function to handlle errors from geolocation.navigate.watchposition()
function errorHandler(error)
    {
        if (error.code == 1)
        {
           alert("Location access denied by user.");
        }
        else if (error.code == 2)
        {
           alert("Location unavailable.");
        }
        else if (error.code == 3)
        {
           alert("Location access timed out");
        }
        else
        {
           alert("Unknown error getting location.");
        }
    }



var startLat,startLng;


// function to start the run using the found random destination
function confirmTrip()
{	
	startTime = new Date();
    saveTrip();

}

function summary(){
    calculateDistanceAndFare();
    if (run1.vehicleType != "None"){
        
        tempMemory();
        window.location.href="summary.html";
    }

}

function confirmPickUp()
{
    desLocBtn.disabled = false;
    startLng=startPos.lng;    // takes the start locations longitude value
	startLat=startPos.lat;    // takes the start locations latitude value
	run1.startLocation=startPos;
    pickUpFound = true;
    
    sendWebServiceRequestForReverseGeocoding(startLat,startLng,"callback");
    
    let pickUp=document.getElementById("pickUp");
    
    let newPickUp= desMarkers[0].locationName;
    
    pickUp.innerHTML="Pickup:"+ newPickUp;
}


function confirmDestination(){
    console.log(desMarkers.length)
    if (destinationPicked == true){
        destinations = destinations + 1;
        desMarkers[destinations] = new marker();
        run1.endLocation=destination;
        destinationPicked = false;
        sendWebServiceRequestForReverseGeocoding(destination.lat,destination.lng,"callback");
        if (desMarkers.length > 2){
        sendXMLRequestForRoute(desMarkers);
        } 
        else
        {
            
            var mapLayer =  mainMap.map.getLayer('route');

            if(typeof mapLayer !== 'undefined') {
              // Remove map layer & source.
               mainMap.map.removeLayer('route').removeSource('route');
            }
        } 
        displayLocations();
    }
}

function directionsCallback(response){
    responseData = response

    const json = response;
    console.log(json);
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
    };
    // if the route already exists on the map, we'll reset it using setData
  if (mainMap.map.getSource('route')) {
    mainMap.map.getSource('route').setData(geojson);
  }
  // otherwise, we'll make a new request
  else {
      if (checkLSData("temporary")){
        mainMap.map.on('load', () => {
            mainMap.map.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: geojson
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
              }
            });
        });  
      } else {
          mainMap.map.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: geojson
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
              }
            });
      }
   
  }
}

function calculateDistanceAndFare(){

  let flatRate = 4.2;
  let suvVehicleRate = 3.5;
  let vanVehicleRate = 6.0;
  let minibusVehicleRate = 10.0;
  // add turn instructions here at the end
  console.log(responseData)
  run1.distance = responseData.routes[0].distance;

  
  vehicleType = document.getElementById("taxitype").value;
  
  for (let i = 0; i < taxiList.length; i++){
    if (taxiList[i].type == vehicleType){
        if (taxiList[i].available == true){
            run1.vehicleType = vehicleType;
            run1.vehicleRego = taxiList[i].rego
            // checking if the time is beteen 5pm and 9am
            run1._time = document.getElementById("time").value;
            run1._date = document.getElementById("date").value;
            
            time = run1._time.split(":")[0];

            switch (vehicleType){
                case "Car":
                    rate = flatRate;
                    break;
                case "Van":
                    rate = flatRate + vanVehicleRate;
                    break;
                case "SUV":
                    rate = flatRate + suvVehicleRate;
                    break;
                case "Minibus":
                    rate = flatRate + minibusVehicleRate;
                    break;
            }
            
            rate += (run1.distance/1000)*1.622;
            
            console.log(rate)
            if ((parseInt(time) >= 17 & parseInt(time) <= 24) | ( parseInt(time) >= 0 & parseInt(time) < 9)){
                rate = rate * 1.2
                console.log(rate)
            }
            
            run1._fare = rate;
            break;
        }
        else
        {
            alert("vehicles of type " + vehicleType +  " are all unavailable!");
            
            run1.vehicleType = "None";

        }
        
    }
  }
}


function displayLocations()
{
  //Accessing the html division
  let outputArea = document.getElementById("stopDisplay");
  //Clearing default trip card
  outputArea.innerHTML="";
  //Setting output as an empty string to be updated with HTML elements
  let output = "";
  //Looping over all Trips
  for(let i=desMarkers.length-2; i>=1; i--)
        {
            //Getting the trip number, name, date, starting point, final destination, stops and total distance
            let stopName = desMarkers[i].locationName;

            output+="<h6>"
            output+="Stop:"+stopName;
            output+="</h6>"
            output+="<a style='font-size:12px;' onclick='deleteStop("+i+")'>Delete Stop</a>"
        }
  //Adding output to HTML page
  outputArea.innerHTML += output;
}

function deleteStop(i){
    removedMarker = desMarkers.splice(i,1);  
    removedMarker[0].marker.remove();
    displayLocations();
    destinations -= 1;
    console.log(desMarkers.length)
    if (desMarkers.length > 2){
        sendXMLRequestForRoute(desMarkers);
    } 
    else
    {
        
        var mapLayer =  mainMap.map.getLayer('route');

        if(typeof mapLayer !== 'undefined') {
          // Remove map layer & source.
           mainMap.map.removeLayer('route').removeSource('route');
        }
    }        
}

/*
function displaySummaryStops(){
    let summaryStop = document.getElementById("summarystops");
    summaryStop.innerHTML="";
    let outputSummary = "";
    
    for(let i=trips.trips.length-1; i>=0; i--){
         //Getting the trip number, name, date, starting point, final destination, stops and total distance
         let summaryStopName = [i].name;

         outputSummary+=stopName+"<br>";
     }
        
    summaryStop.innerHTML=outputSummary;
    
}
displaySummaryStops();
*/

function currentTime(){
    let currentdate = new Date(); 
    let minutes = currentdate.getMinutes();
    let hours = currentdate.getHours();
    let day = currentdate.getDate();
    let month = (currentdate.getMonth()+1);
    let year = currentdate.getFullYear();
    
    
    
    if (minutes < 10){
        minutes = "0" + minutes
    }
    if (hours < 10){
        hours = "0" + hours
    }
    if (day < 10){
        day = "0" + day
    }
    if (month < 10){
        month = "0" + month
    }
    
    let time = hours+ ":" + minutes;
    let date = currentdate.getFullYear()+"-"+day+"-"+month;
    
    run1.time = time;
    run1.date = date;

    // checking if the time is beteen 5pm and 9am
    document.getElementById("time").value = time;
    document.getElementById("date").value = date;

}
  
