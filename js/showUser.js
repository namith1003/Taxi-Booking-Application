var user = retrieveLSData("user");

console.log(user)
document.getElementById("dname").innerHTML = user._name;
document.getElementById("dnumber").innerHTML = user._number;
document.getElementById("demail").innerHTML = user._email;
document.getElementById("dpayment").innerHTML = user._payMethod;
if (user._payMethod == "card"){
    document.getElementById("dcardnum").innerHTML = user._cardNo;
    document.getElementById("dcarddate").innerHTML = user._cardDate;
    document.getElementById("dcardpin").innerHTML = user._cardCode;
}else{
    document.getElementById("dcardnum").innerHTML = "-";
    document.getElementById("dcarddate").innerHTML = "-";
    document.getElementById("dcardpin").innerHTML = "-";
}
