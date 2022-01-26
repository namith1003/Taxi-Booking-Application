
var pastRuns = [];
var pastStops = [];

run = retrieveLSData('temporary');
stops = retrieveLSData('destinations');



document.getElementById("dtripdate").innerHTML = run._date;
document.getElementById("dtriptime").innerHTML = run._time;
document.getElementById("dpickup").innerHTML = '';
document.getElementById("summaryStops").innerHTML = '';
document.getElementById("taxitype").innerHTML = run._vehicleType;
document.getElementById("taxireg").innerHTML = run._vehicleRego;
document.getElementById("displaydistance").innerHTML = run._distance.toFixed(1) + "m";
document.getElementById("displayfare").innerHTML = "$"+run._fare.toFixed(2);;

function cancel(){
    window.location.href='index.html';
    localStorage.removeItem("temporary");
    localStorage.removeItem("destinations");
}

function edit(){
    window.history.back();
}

function confirm(){
    run._tripId=prompt("Please Enter A Name For This Run: ")            // promt to enter the name of the run
    while (run._tripId==null || run._tripId=="")
    {
        alert("Name For This Run Cannot Be Left Blank")
        run._tripId=prompt("Please Enter A Name For This Run: ")
    }
    if (checkLSData("pastruns")){
        pastRuns = retrieveLSData("pastruns"); 
        pastStops = retrieveLSData("paststops");
    } 
    pastRuns.push(run);
    pastStops.push(stops);
    updateLSData("pastruns", pastRuns);
    updateLSData("paststops", pastStops);
    localStorage.removeItem("temporary");
    localStorage.removeItem("destinations");
    window.location.href='index.html';
}