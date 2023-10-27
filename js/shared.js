"use strict";

const USER_DATA_KEY = "userData";
// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "trips";
//let userData=[];
mapboxgl.accessToken = 'pk.eyJ1IjoicmFkaXRoYSIsImEiOiJja3N6MGozNXUxNzFxMnVxa3lkZDZqNW5yIn0.q3UJUolzhxfJtZTx9Nqo5g';     // access token for our map



class User {
	constructor(name,pNumber,email,payMethod,cardNo,cardDate,cardCode){
		this._name=name;
		this._number=pNumber;
        this._email = email;
		this._payMethod=payMethod;
		this._cardNo=cardNo;
        this._cardDate=cardDate;
        this._cardCode=cardCode;
	}
    get name(){
        return this._name;
    }
    set name(new){
        this._name=new:
    }
    get email(){
        return this._email;
    }
    set email(new){
        this._email=new:
    }
    get pNumber(){
        return this._number;
    }
    set number(new){
        this._number=new:
    }
    get payMethod(){
        return this._paymethod;
    }
    set payMethod(new){
        this._payMethod=new:
    }
    get cardNo(){
        return this._cardNo;
    }
    set cardNo(new){
        this._cardNo=new:
    }
    get cardDate(){
        return this._cardDate;
    }
    set cardDate(new){
        this._cardDate=new:
    }
    get cardCode(){
        return this._cardCode;
    }
    set cardCode(new){
        this._cardCode=new:
    }
    addTrip(destination,pickUp,date,time,stops){
        let newTrip= new trip (destination,pickUp,date,time,stops);
        this._trips.push(newTrip);
    }
    
    fromData(userData){
        this._name=userData._name;
        this._username=userData._username;
        this._passcode=userData._passcode;
        this._number=userData._number;
        this._payMethod=userData._payMethod;
        this._cardNo=userData._cardNo;
        this._cardDate=userData._cardDate;
        this._cardCode=userData._cardCode;
        this._email=userData._email;
        this._trips=userData._trips;
    }
}





class Trip {
	constructor(){
        this._tripId = 0;
		this._destination=new mapboxgl.LngLat(0,0);
		this._pickUp= new mapboxgl.LngLat(0,0);
        this._current = new mapboxgl.LngLat(0,0);
		this._date=[];
		this._time=[];
		this._stops=[];
        this._userData= [];
        this._summaryOfRun='';
        this._nameOfRun=''
        this._distance = 0;
        this._fare = 0;
        this._vehicleType='';
        this._vehicleRego = '';
	}
    get tripId(){
        return this._tripId;
    }
    get destination(){
        return this._destination;
    }
    get pickUp(){
        return this._pickUp;
    }
    get current(){
        return this._current;
    }
    get date(){
        return this._date;
    }
    get time(){
        return this._time;
    }
    get stops(){
        return this._stops;
    }
    get userData(){
        return this._userData;
    }
    get summaryOfRun()
	{
		return this._summaryOfRun;
	}
	get nameOfRun()
	{
		return this._nameOfRun;
	}
    get distance()
    {
        return this._distance;
    }
    get fare()
    {
        return this._fare;
    }
    get vehicleType()
    {
        return this._vehicleType;
    }
    get vehicleRego()
    {
        return this._vehicleRego;
    }
    
    
    set tripId(tripId){
        this._tripId = tripId;
    }
    set destination(destination){
        this._destination.lng=destination[0];
		this._destination.lat=destination[1];
    }
    set pickUp(pickUp){
        this._pickUp = pickUp;
        this._pickUp.lng=pickUp.lng;
		this._pickUp.lat=pickUp.lat;
    }
    set current(current){
        this._current.lng=current[0];
		this._current.lat=current[1];
    }
    set date(date){
        this._date = date;
    }
    set time(time){
        return this._time = time;
    }
    set stops(stop){
        this._stops.push(stop);
    }
    set userData(userData){
        return this._userData;
    }
    set summaryOfRun(summary)
	{
		this._summaryOfRun=summary;
	}
	set nameOfRun(nameOfRun)
	{
		this._nameOfRun=nameOfRun;
	}
    set distance(distance)
    {
        this._distance=distance;
    }
    set fare(fare)
    {
        this._fare=fare;
    }
    set vehicleType(vehicleType)
    {
        this._vehicleType=vehicleType;
    }
    set vehicleRego(vehicleRego)
    {
        this._vehicleRego=vehicleRego;
    }
    fromData(tripData){
        /*this._destination=tripData._destination;
		this._pickUp=tripData._pickUp;
		this._date=tripData._date;
        this._time=tripData._time;
		this._stops=tripData._stops;
        */
    

        let user=new user(name,username,passcode,number,payMethod,cardNo,email,trips);
        for(let i=0;i<user.length;i++){
            user.fromData(user[i]);
            this._userData.push(user)
        }
    }
}
    





let taxiList = [
	{"rego":"VOV-887","type":"Car","available":true},
	{"rego":"OZS-293","type":"Van","available":false},
	{"rego":"WRE-188","type":"SUV","available":true},
	{"rego":"FWZ-490","type":"Car","available":true},
	{"rego":"NYE-874","type":"SUV","available":true},
	{"rego":"TES-277","type":"Car","available":false},
	{"rego":"GSP-874","type":"SUV","available":false},
	{"rego":"UAH-328","type":"Minibus","available":true},
	{"rego":"RJQ-001","type":"SUV","available":false},
	{"rego":"AGD-793","type":"Minibus","available":false}
];




function updateUser(name,email)

    
function getStored(key){
	if (typeof( localStorage.getItem(key))!=="object"){
		return JSON.parse(localStorage.getItem(key));
	}
	else{
		return localStorage.getItem(key);
	}
}
  
function addUser(name,username,passcode,number,payMethod,cardNo,email,trips,key){
    let userdata
    let newUser= new user(name,username,passcode,number,payMethod,cardNo,email,trips);
    
    userData=retrieveStored(USER_DATA_KEY);
    
    userData=userData.push(newUser);
    updateStorage(USER_DATA_KEY,userData);
}



function storageCheck(key){
	if (typeof(localStorage.getItem(key)) !== "undefined"){
		return true;
	}
	else{
		return false;
	}
}


function updateStorage(key,data){

	let stringData=JSON.stringify(data);
	localStorage.setItem(key,stringData);
}

function retrieveStored(key){
    let stored;
    
    if (storageCheck(key)==true){
        stored=getStored(key);
        return stored;
    }
    else{
        return [];
    }
}
    


//  class to create a new map for each run or reattempt the user has
class OurMap
{
	constructor(centreOfMap)
	{
		this._centreOfMap=[centreOfMap[0],centreOfMap[1]];    // stores the centre of the created map(here its the users start location)
		
		// stores the whole map with all necessary information of it
		this._map=new mapboxgl.Map({
                  container: 'map',
                  center: [centreOfMap[0],centreOfMap[1]],
                  zoom: 17.3,
                  style: 'mapbox://styles/mapbox/streets-v11',
                  hash: true,
                  transformRequest: (url, resourceType)=> {
                    if(resourceType === 'Source' && url.startsWith('http://myHost')) {
                        return {
                        url: url.replace('http', 'https'),
                        headers: { 'my-custom-header': true},
                        credentials: 'include'  // Include cookies for cross-origin requests
                        }
                    }
                  }
                });
                this._map.addControl(
	                new mapboxgl.NavigationControl()
                )
		
		
	}
	

	set centreOfMap(centreOfMap)
	{
		this._centreOfMap=[centreOfMap[0],centreOfMap[1]];
	}
	
	
	set map(centreOfMap)
	{
		this._map.centre[centreOfMap[0],centreOfMap[1]]
	}
	
	get centreOfMap()
	{
		return this._centreOfMap;
	}
	
	get map()
	{
		return this._map;
	}
	
}



// class to create the markers for users start, current and end location.
class marker
{
	constructor()
	{
		this._markerLocation;                        // stores the markers location 
		this._marker= new mapboxgl.Marker();         // stores the created specific marker to be shown with its own stylings
		this._locationName = '';
		
	}
	
	// sets the coordinates for the marker
	set markerLocation(coordinates)
	{
		this._marker= new mapboxgl.Marker(coordinates[2]);
		this._markerLocation=[coordinates[0],coordinates[1]];
		this._marker.setLngLat([coordinates[0],coordinates[1]]);
	}
   
    get markerLocation()
	{
		return this._markerLocation;
	}
    
    set locationName(locationName)
	{
		this._locationName = locationName;
	}

	get marker()
	{
		return this._marker;
	}
    
    set marker(marker)
	{
		this._marker= marker;
	}
	
	get locationName()
	{
		return this._locationName;
	}
    
    
}



// class used to style each marker with a different picture size and location.
class Styling
{
	constructor(coordinates,picture,iconSize)
	{
		// this is a user defined object to store the special features and design of each marker as the user feels fit.
		this._geoJson = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {
                    'message': 'Your End Location',
                    'iconSize': [iconSize,iconSize]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [coordinates[0],coordinates[1]]
                }
			}
           
          ]
        };
		
		this._el = document.createElement('div');    // the variable to store the element space in the HTML to store this created marker and what to be used to create this specific marker 
        this._el.className = 'marker';
        this._el.style.backgroundImage ='url('+picture+')'
           
        this._el.style.width = this._geoJson.features[0].properties.iconSize[0] + 'px';
        this._el.style.height = this._geoJson.features[0].properties.iconSize[1] + 'px';

	}
	
	set geoJson(coordinates)
	{
		this._geoJson = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {
                    'message': 'Your End Location',
                    'iconSize': [iconSize,iconSize]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [coordinates[0],coordinates[1]]
                }
			}
           
          ]
        };
	}
	
	set el(picture)
	{		
        this._el.style.backgroundImage ='url('+picture+')'
	}
	
	get geoJson()
	{
		return this._geoJson;
	}
	
	get el()
	{
		return this._el;
	}
	
}


var markerCurrent=new marker();              // variable to store the marker for current location of user
var markerStart=new marker();                // variable to store the marker for start location of user
var markerDestination=new marker();          // variable to store the marker for end location for user
var markerPath=new marker();                 // variable to store the marker of each current location of user to be stored in an array to make the path user has taken



// Array of saved Run objects.
   

function saveTrip()
{
    var savedRuns=retrieveLSData(APP_PREFIX)|| [];        // saves the list of runs the user has taken
	
	run1.nameOfRun=prompt("Please Enter A Name For This Trip: ")            // promt to enter the name of the run
	while (run1.nameOfRun==null || run1.nameOfRun=="")
	{
	    alert("Name For This Trip Cannot Be Left Blank")
	    run1.nameOfRun=prompt("Please Enter A Name For This Trip: ")
	}
	
	run1.summaryOfRun=["Scheduled Date is "+run1.date + ", Scheduled Time is "+ run1.time+" and Estimated Distance is "+(run1.distance.toFixed(2))+"m"];
    

	
	savedRuns.push(run1);                      //pushes the new run to the last location of the saved run array and saves the runs in chronological order.
	
	updateLSData(APP_PREFIX,savedRuns);
   	
    
    
} 


function tempMemory()
{
    let markers = [];
    updateLSData('temporary',run1);
    for (let i = 0; i < desMarkers.length; i++){
        markers.push(desMarkers[i].markerLocation);
    }
    updateLSData('destinations',markers);
    location.href='summary.html'                    // opens the past runs page to check on the saved run in the list.
    
}   
    
    
    