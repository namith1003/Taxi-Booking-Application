"use strict";
var pastRuns;
var pastStops;
var completedTrips = [];
var completedStops = [];
var finishedStops;
var finishedTrip;

function displaySheduledTrips()
{
  //Accessing the html division
  let tripDisplay = document.getElementById("scheduleTrips");
  //Clearing default trip card

  //Setting output as an empty string to be updated with HTML elements
  let output = "";
  pastRuns = retrieveLSData("pastruns");
  pastStops = retrieveLSData("paststops");
  //Looping over all Trips
  for(let i=0; i < pastRuns.length; i++)
  {
      //Getting the trip number, name, date, starting point, final destination, stops and total distance
      let tripName= pastRuns[i]._tripId;
      let tripDate = pastRuns[i]._date;
      let tripTime=  pastRuns[i]._time;
      


   

      //Updating output with HTML elements
   
      output+="<div class='demo-card-event mdl-card mdl-shadow--2dp'><div class='mdl-card__title mdl-card--expand'>"
      output+="<p style='font-size:16px; color:black;'>"
      output+="Trip Name: "+tripName+"<br>Date of Booking: "+tripDate+"<br>Time of Booking: "+tripTime;
      output+="<ul><li><a onclick='edit("+i+")'>Edit</a></li><li><a onclick='view("+i+")'>View</a></li><li><a onclick='deleteTrip("+i+")'>Delete</a></li><li><a onclick='done("+i+")'>Done</a></li></ul>";
      output+="</div></div>"


  }
  //Adding output to HTML page
  tripDisplay.innerHTML += output;
}
displaySheduledTrips();

//Function to go to trip Details
function view(i)
{
  //Getting particular trip
  //details(i)
  let data=pastRuns[i];
  updateLSData("selected",data);
  //let objectJSONData = localStorage.getItem("selectedTripIndex")
  //let objectData = JSON.parse(objectJSONData);
  window.location="viewTrip.html";
}



//Function to delete trips
function deleteTrip(i)
{
  if(confirm("Are you sure you want to delete this trip?"))
  //User wishes to do so
  {
    //delete trip using removeTrip method
    pastRuns.splice(i,1);
    pastStops.splice(i,1);
    //Updating local storage and informing user
    updateLSData("pastruns", pastRuns);
    updateLSData("paststops", pastStops);
    
    alert("You trip has been deleted");
     //displaying remaining cards with trips
  }
  window.location.href='sheduletrip.html';
}
    
function edit(i){
    updateLSData("temporary", pastRuns[i]);
    updateLSData("destinations", pastStops[i]);
    //delete trip using removeTrip method
    pastRuns.splice(i,1);
    pastStops.splice(i,1);
    //Updating local storage and informing user
    updateLSData("pastruns", pastRuns);
    updateLSData("paststops", pastStops);
    window.location.href='createtrip.html';
}  

function done(i){
    if(confirm("Are you sure you have completed this trip?")){
        //delete trip using removeTrip method
        let finishedTrip = pastRuns.splice(i,1)[0];
        let finishedStops = pastStops.splice(i,1)[0];
        //Updating local storage and informing user
        updateLSData("pastruns", pastRuns);
        updateLSData("paststops", pastStops);
        
        if (checkLSData("completed")){
            completedTrips = retrieveLSData("completedtrips");
            completedStops = retrieveLSData("completedstops");
            
            completedStops.push(finishedStops);
            completedTrips.push(finishedTrip);
            
            updateLSData("completedtrips", completedTrips);
            updateLSData("completedstops", completedStops);
        }
        
        completedStops.push(finishedStops);
        completedTrips.push(finishedTrip);
        
        updateLSData("completedtrips", completedTrips);
        updateLSData("completedstops", completedStops);
       
        window.location.href='tripHistory.html';
    }
}     

    
 