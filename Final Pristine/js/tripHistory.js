var pastRuns;
var pastStops;

function displayCompletedTrips()
{
  //Accessing the html division
  let tripDisplay = document.getElementById("tripHistory");
  //Clearing default trip card

  //Setting output as an empty string to be updated with HTML elements
  let output = "";
  pastRuns = retrieveLSData("completedtrips");
  pastStops = retrieveLSData("completedstops");
  console.log(pastRuns)
  console.log(pastStops)
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
      output+="<ul><li><a onclick='view("+i+")'>View</a></li><li><a onclick='deleteTrip("+i+")'>Delete</a></li></ul>";
      output+="</div></div>"

  }
  //Adding output to HTML page
  tripDisplay.innerHTML += output;
}


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


displayCompletedTrips();