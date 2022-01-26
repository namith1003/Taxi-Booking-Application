run = retrieveLSData("selected");

console.log(run)
document.getElementById("dtripdate").innerHTML = run._date;
document.getElementById("dtriptime").innerHTML = run._time;
document.getElementById("dpickup").innerHTML = run._date;
document.getElementById("summaryStops").innerHTML = run._date;
document.getElementById("taxitype").innerHTML = run._vehicleType;
document.getElementById("taxireg").innerHTML = run._vehicleRego;
document.getElementById("displaydistance").innerHTML = run._distance.toFixed(1) + "m";
document.getElementById("displayfare").innerHTML = "$"+run._fare.toFixed(2);

