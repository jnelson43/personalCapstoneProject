$(document).ready(function(){
	/*Check if logged in and set login button to appropriate text and action*/
	var loggedUser = localStorage.getItem("username");
	if(loggedUser != 'null'){
		$('.login').html("Logout");
		$('.login').attr("href","index.html");
	}else {
		$('.login').html("Login");
		$('.login').attr("href","login.html");
		$('.addNew').html("");
	}

	$('.login').click(function(){
		if(loggedUser != 'null'){
			loggedUser = 'null';
			localStorage.setItem("username", 'null');
		}
	});

	/*Populate restaurant field*/
	populateRestaurantsHandler(loggedUser)

	/*Fill tag container with all tags*/
	$('.tagContainer').append('<div class="tag"><div class="tagText">Mexican</div><div class="tagExit">✖</div></div>');

	$('.registrationSubmit').click(function() {
		var username = isPresent($('#registrationUsername').val(),"Username");
		var password = isUniqueHandler($('#registrationPassword').val(),"Password");
		var firstName = isPresent($('#registrationFirstName').val(),"First name");
		var lastName = isPresent($('#registrationLastName').val(), "Last name");
		if(username != "Error" && password !="Error" && firstName !="Error" && lastName != "Error"){
			addPerson(username,password,firstName,lastName);
		}
	});

	$('.loginSubmit').click(function() {
		var username = isPresent($('#loginUsername').val(),"Username");
		var password = isPresent($('#loginPassword').val(),"Password");
		if(username != "Error" && password !="Error"){
			handleLogin(username,password);
		}
	});

	$('.addRestaurantSubmit').click(function() {
		var name = isPresent($('#restaurantName').val(),"Name");
		var description = isPresent($('#restaurantDescription').val(),"description");
		var imageURL = verifyImageURL($('#imageURL').val(),"imageURL");
		if(name != "Error" && description !="Error" && imageURL !="Error"){
			restaurantAdd(name,description,imageURL,loggedUser);
		}
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
	    'redirect': true,
	    'success': function(data) {
	    	window.location.href = 'login.html';
     	}
    });
}

function restaurantAdd(name,description,imageURL,username){
	var postData = JSON.stringify({'name': name,'description': description,'imageURL': imageURL, 'userName': username});
    $.ajax({
	    'url':'http://localhost:3000/restaurants',
	    'method':'POST',
	    'dataType': 'json',
	    processData: false,
	    'contentType': 'application/json',
	    'data': postData,
	    'redirect': true,
	    'success': function(data) {
	    	alert('here');
	    	window.location.href = 'index.html';
	    },
	    'error': function(data) {
	    	alert('There was a problem submitting your request');
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
		localStorage.setItem("username", username);
		loggedUser = localStorage.getItem("username");
		window.location.replace("index.html");
	}else{
		alert("Username/Password combination not found");
	}
}

async function populateRestaurantsHandler(username){
	let promise = new Promise((resolve, reject) => {
		var url = 'http://localhost:3000/restaurants';
		$.get(url, function (data) {
	       
	    }).done(function(data){
	    	resolve(data);
	    });
	});
	let restaurants = await promise;

	populateRestaurants(username,restaurants);
}

function populateRestaurants(username,restaurants){
	restaurants.forEach(restaurant => {
    	$('.restaurantsDisplay').append(`
    		<div class="restaurantContainer">
         		<div class="restaurantTitle">` + restaurant.name + `</div>
         		<img class="reataurantImage" src="` + restaurant.imageURL + `" alt="Restaurant Image">
      			<div class="restaurantDescription">` + restaurant.description + `</div>
      			<div class="tags">
         			<div class="tagContainer">
   						'<div class="tag"><div class="tagText">Thai</div><div class="tagExit">✖</div></div>'
        		 	</div>
      			</div>
      		</div>
      	`);   		
    });
}
async function isUniqueHandler(username){
	let promise = new Promise((resolve, reject) => {
		var url = 'http://localhost:3000/users';
		$.get(url, function (data) {
	       
	    }).done(function(data){
	    	resolve(data);
	    });
	});
	let users = await promise;

	if(usernameExists(username,users) == false){
		return username;
	}else{
		alert("Username already exists");
		return "Error";
	}
}
/*Validation*/
function isUnique(username,users){
	var usernameExists = false;
	users.forEach(user => {
		if(user.username == username){
			usernameExists = true;
		}
	});
	if(usernameExists = true){
		return false;
	}else{
		return true;
	}
}

function passwordMatchesUsername(username,password,users){
	users.forEach(user => {
   		if(user.username == username){
   			if(user.password == password){
   				passwordMatches = true;
   			}
   		}
   	});
    if(passwordMatches == true){
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

function verifyImageURL(url) {
    if (url.match(/(jpeg|jpg|gif|png)+/) == null) {
    	alert("Image URL is invalid");
    	return "Error";
    }else{
    	return url;
    }
    
}