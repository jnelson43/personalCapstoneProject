$(document).ready(function(){
	/*Check if logged in and set login button to appropriate text and action*/
	var loggedUser = localStorage.getItem("username");
	localStorage.setItem("selectedTags",'null');
	var selectedTags = localStorage.getItem("selectedTags");

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

	$('.restaurantsDisplay').on('click','.addTag',function() {
		var tag = isPresent($(this).prev().val(),"Tag Text");
		var restaurantID = $(this).attr('id');
		var username = $(this).prev().attr('id');
		if(tag != "Error"){
			addTag(tag,loggedUser,restaurantID,selectedTags,username);
		}
		
	});

	$('.restaurantsDisplay').on('click','.tagDelete',function() {
		var tag = $(this).parent().attr('id');
		deleteTag(tag);
	});

	$('.restaurantsDisplay').on('click','.removeRestaurant',function() {
		var restaurantID = $(this).parent().attr('id');
		restaurantID = restaurantID.replace('container','');
		if($('#container'+restaurantID).find('.tagContainer').html() != ''){
			alert('Please remove all tags for this restaurant first');
		}else{
			deleteRestaurant(restaurantID);
		}
		
	});

	$('.tagContainerSidebar').on('click','.tagText',function() {
		var tag = $(this).html();
		if(selectedTags != 'null'){
			if(selectedTags.includes(tag) == false){
				localStorage.setItem("selectedTags",selectedTags + "," + tag);
				selectedTags = localStorage.getItem("selectedTags");
				$(this).parent().html('<div class="tagText">' + tag + '</div><div class="tagExit">✖</div>');
				$('.restaurantsDisplay').html("");
				populateRestaurantsHandler(loggedUser,selectedTags);
			}
		}else{
			localStorage.setItem("selectedTags",tag);
			selectedTags = localStorage.getItem("selectedTags");
			$(this).parent().html('<div class="tagText">' + tag + '</div><div class="tagExit">✖</div>');
			$('.restaurantsDisplay').html("");
			populateRestaurantsHandler(loggedUser,selectedTags);
		}
	});

	$('.tagContainerSidebar').on('click','.tagExit',function() {
		var selectedTagsOld = localStorage.getItem("selectedTags");
		if(selectedTagsOld[0] == ','){
			selectedTagsOld = selectedTagsOld.substring(1);
		}
		var lastTagRemoved = false;
		if(selectedTagsOld.includes(',') != true){
			lastTagRemoved = true;
			
		}

		var tagComma = ',' + $(this).prev().html();
		var tag = $(this).prev().html();
		if(selectedTagsOld.includes(tagComma)){
			localStorage.setItem('selectedTags',selectedTagsOld.replace(tagComma,''));
		}else{
			localStorage.setItem('selectedTags',selectedTagsOld.replace(tag,''));
		}
		$(this).parent().html('<div class="tagText">' + tag + '</div>')

		if(lastTagRemoved == true){
			localStorage.setItem("selectedTags",'null');
		}
		selectedTags = localStorage.getItem("selectedTags");
		$('.restaurantsDisplay').html("");
		populateRestaurantsHandler(loggedUser,selectedTags);
	});

	/*Populate restaurant field*/
	populateRestaurantsHandler(loggedUser,selectedTags);

	/*Fill tag container with all tags*/
	populateTagSidebarHandler(loggedUser);

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

function deleteTag(tag){
    $.ajax({
	    'url':'http://localhost:3000/tags/' + tag,
	    'method':'delete',
	    processData: false,
	    'success': function(data) {
	    	window.location.href = 'index.html';
     	}
    });
}

function deleteRestaurant(restaurantID){
	$.ajax({
	    'url':'http://localhost:3000/restaurants/' + restaurantID,
	    'method':'delete',
	    processData: false,
	    'success': function(data) {
	    	window.location.href = 'index.html';
     	}
    });
}

function restaurantAdd(name,description,imageURL,username){
	var postData = JSON.stringify({'name': name,'description': description,'imageURL': imageURL, 'username': username});
    $.ajax({
	    'url':'http://localhost:3000/restaurants',
	    'method':'POST',
	    'dataType': 'json',
	    processData: false,
	    'contentType': 'application/json',
	    'data': postData,
	    'redirect': true,
	    'success': function(data) {
	    	window.location.href = 'index.html';
	    },
	    'error': function(data) {
	    	alert('There was a problem submitting your request');
	    }
    });
}

function addTag(tag,loggedUserID,restaurantID,selectedTags,restaurantAddedBy){
	var postData = JSON.stringify({'tagText': tag,'userID': loggedUserID,'restaurantID': restaurantID});
    $.ajax({
	    'url':'http://localhost:3000/tags',
	    'method':'POST',
	    'dataType': 'json',
	    processData: false,
	    'contentType': 'application/json',
	    'data': postData,
	    'redirect': true,
	    'success': function(data) {
	    	getTagsByRestaurantID(restaurantID,selectedTags,loggedUserID,restaurantAddedBy);
	    	populateTagSidebarHandler(loggedUserID)
	    },
	    'error': function(data) {
	    	alert('There was a problem submitting your request');
	    }
    });
}

/*Handlers*/
async function populateTagSidebarHandler(loggedUser){
	let promise = new Promise((resolve, reject) => {
		var url = 'http://localhost:3000/tags';
		$.get(url, function (data) {
	       
	    }).done(function(data){
	    	resolve(data);
	    });
	});
	let tags = await promise;

	populateTagSidebar(loggedUser,tags);
}

function populateTagSidebar(loggedUser,tags){
	var uniqueTags = [];
	$('.tagContainerSidebar').html("");
	tags.forEach(tag => {
		if(uniqueTags.includes(tag.tagText) == false){
			$('.tagContainerSidebar').append('<div class="tag"><div class="tagText">'+ tag.tagText + '</div></div>');
			uniqueTags.push(tag.tagText);
		}
	});
}

async function getTagsByRestaurantID(restaurantID,selectedTags,username,restaurantAddedBy){
	let promise = new Promise((resolve, reject) => {
		var url = 'http://localhost:3000/tags';
		$.get(url, function (data) {
	       
	    }).done(function(data){
	    	resolve(data);
	    });
	});
	let tags = await promise;

	populateTagsByRestaurantID(tags,restaurantID,selectedTags,username,restaurantAddedBy);
}

function populateTagsByRestaurantID(tags,restaurantID,selectedTags,username,restaurantAddedBy){
	var selectedTagFound = false;
	$('#container' + restaurantID + " .tagContainer").html("");
	tags.forEach(tag => {
		if(tag.restaurantID == restaurantID){
			if(selectedTags.includes(tag.tagText)){
				selectedTagFound = true;
			}
			if(username == tag.userID || username == restaurantAddedBy){
				$('#container' + restaurantID + " .tagContainer").append('<div class="tag" id=' + tag._id + '><div class="tagText">' + tag.tagText + '</div><div class="tagDelete">✖</div></div>');
			}else{
				$('#container' + restaurantID + " .tagContainer").append('<div class="tag" id=' + tag._id + '><div class="tagText">' + tag.tagText + '</div></div>');
			}
		}
	});
	if(selectedTagFound == false && selectedTags != 'null'){
			$('#container' + restaurantID).hide();
	}
}

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
		window.location.href = 'index.html';
	}else{
		alert("Username/Password combination not found");
	}
}

async function populateRestaurantsHandler(username,selectedTags){
	let promise = new Promise((resolve, reject) => {
		var url = 'http://localhost:3000/restaurants';
		$.get(url, function (data) {
	       
	    }).done(function(data){
	    	resolve(data);
	    });
	});
	let restaurants = await promise;

	populateRestaurants(username,restaurants,selectedTags);
}

function populateRestaurants(username,restaurants,selectedTags){
		restaurants.forEach(restaurant => {
    	$('.restaurantsDisplay').append(`
    		<div class="restaurantContainer" id=container` + restaurant._id + `>
         		<div class="restaurantTitle">` + restaurant.name + `</div>
         		<img class="reataurantImage" src="` + restaurant.imageURL + `" alt="Restaurant Image">
      			<div class="restaurantDescription">` + restaurant.description + `</div>
      			<div class="tagContainer"></div>
      			<label class='labelTag'>Add Tag</label><input type="text" name="tagInput" class="tagInput" id=`+restaurant.username+`><button class="addTag" id=` + restaurant._id + `>Add</button>
      		</div>
      	`);
      	if(restaurant.username == username){
      		$('#container' + restaurant._id).append('<div class="removeRestaurant">Remove Restaurant</div>');
      	}   

      	getTagsByRestaurantID(restaurant._id,selectedTags,username,restaurant.username);  	
    })
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

function getIDFromUsername(username,users){
	users.forEach(user => {
   		if(user.username == username){
   			return user._id;
   		}
   	});
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