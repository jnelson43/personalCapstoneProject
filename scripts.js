$(document).ready(function(){
	$('.tagContainer').append('<div class="tag"><div class="tagText">Mexican</div><div class="tagExit">✖</div></div>');

	$('.registrationSubmit').click(function() {
		var username = isPresent($('#registrationUsername').val(),"Username");
		var password = isPresent($('#registrationPassword').val(),"Password");
		var firstName = isPresent($('#registrationFirstName').val(),"First name");
		var lastName = isPresent($('#registrationLastName').val(), "Last name");
		if(username != "Error" && password !="Error" && firstName !="Error" && lastName != "Error"){
			addPerson(username,password,firstName,lastName);
		}
	});

	$('.loginSubmit').click(function() {
		var username = isPresent($('#loginUsername').val(),"Username");
		var password = isPresent($('#loginPassword').val(),"Password");
		var successfulLogin = true;
		handleLogin(username,password);
	});
});

/*DB Methods*/
function usernameExists(username){
	var url = 'http://localhost:3000/users';
    // Send get request use jquery ajax.
    var usernameFound = false;
    $.get(url, function (data) {
   
    }).done(function(data){
    	data.forEach(user => {
       		if(user.username == username){
       			usernameFound = true;
       		}
       	});
       	if(usernameFound == true){
    		return true
	    }else {
	    	return false;
		}
    });
    
}

function addPerson(username,password,firstName,lastName){
	var postData = JSON.stringify({'username': username,'password': password,'firstName': firstName, 'lastName': lastName});
    $.ajax({
	    'url':'http://localhost:3000/users',
	    'method':'POST',
	    'dataType': 'json',
	    processData: false,
	    'contentType': 'application/json',
	    'data': postData,
	    'success': function(data) {

     	}
    });
}

/*Handlers*/
async function handleLogin(username,password){
	let promise = new Promise((resolve, reject) => {
		var url = 'http://localhost:3000/users';
		$.get(url, function (data) {
	       
	    }).done(function(data){
	    	resolve(data);
	    });
	});
	let users = await promise;

	if(passwordMatchesUsername(username,password,users) == true){
		setCookie("username",username,365);
		var loggedUser = getCookie("username");
		alert(loggedUser);
	}else{
		alert("Username/Password combination not found");
	}
}

/*Validation*/
function passwordMatchesUsername(username,password,users){
	users.forEach(user => {
   		if(user.username == username){
   			if(user.password == password){
   				alert("should pass");
   				passwordMatches = true;
   			}
   		}
   	});
    if(passwordMatches == true){
    	alert("pass");
		return true;
    }else {
    	alert("fail");
    	return false;
	}
}

function isPresent(value,nameOfField = "") {
	if(value.toString() == ""){
		if(nameOfField != ""){
			alert(nameOfField + " cannot be empty");
		}
		return "Error";
	}else {
		return value;
	}
}

/*Cookies*/
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}