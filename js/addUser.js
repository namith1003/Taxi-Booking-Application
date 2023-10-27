"use strict";

var user;

function createAccount(){

    
    
    let inputName=document.getElementById("name").value;
    let inputNumber=document.getElementById("number").value;
    let inputEmail=document.getElementById("email").value;
    let inputPayMethod=document.getElementById("method").value;
    let inputCard=document.getElementById("card").value;
    let inputCardDate=document.getElementById("carddate").value;
    let inputCardCode=document.getElementById("cardcode").value;

    if (inputName==''){
		document.getElementById("name_msg").innerHTML='Please Enter your Name!!!';		
		return;
    }
    else if (inputNumber==''){
		document.getElementById("number_msg").innerHTML='Please Enter your Mobile Number!!!';		
		return;
    }
    else if (inputEmail==''){
		document.getElementById("email_msg").innerHTML='Please Enter you Email Address!!!';		
		return;
    }
    else if (inputPayMethod==''){
		document.getElementById("paymethod_msg").innerHTML='Please select your Method of Payment!!!';		
		return;
    }
    else if (inputPayMethod != 'cash' & inputPayMethod != 'card'){
        document.getElementById("paymethod_msg").innerHTML='Invalid Payment option!!!';		
		return;
    }
    else if (inputPayMethod == 'card'){
        if (inputCard==''){
		document.getElementById("card_msg").innerHTML='Please Enter the Card Number!!!';		
		return;
        }
        if (inputCardDate==''){
            document.getElementById("carddate_msg").innerHTML='Please Enter the Card Expiry Date!!!';		
            return;
        }
        if (inputCardCode==''){
            document.getElementById("cardcode_msg").innerHTML='Please Enter the Card Pin Code!!!';		
            return;
        }
    }
   
    else{
        addUser(inputName,inputNumber,inputEmail,inputPayMethod,inputCard,inputCardDate,inputCardCode);
        alert("New User has been succesfully added!");
        window.location.href='index.html';
    }
   
}

function addUser(inputName,inputNumber,inputEmail,inputPayMethod,inputCard,inputCardDate,inputCardCode){
    user = new User(inputName,inputNumber,inputEmail,inputPayMethod,inputCard,inputCardDate,inputCardCode);
    updateLSData("user", user);
}


