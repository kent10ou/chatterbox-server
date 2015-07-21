// YOUR CODE HERE:

// my code here


// var message = {
// 	username: 'Mel Brooks',
//   	text: 'It\'s good to be the king',
//   	roomname: 'lobby'
// };

var friends = function(){
	$('.chat').on('click', 'a', function(event){
		app.addFriend(this.text);
	});
}

var submission = function(){
	$('.submit').click(function() {
      var message = {
      	username: $('#username').val(),
      	text: $('#message').val(),
      	roomname: $('#roomname').val()
      }
      app.addMessage(message).val();
    });
}

var showFriends = function(){
	for(var i = 0; i<app.friendsList.length; i++){
		$('.username:contains('+ app.friendsList[i]+')').addClass('friend');
		$('.username:contains('+ app.friendsList[i]+')').parent().addClass('friend-box');
	}
};

$(document).ready(function(){

	$('#refresh').on('click', function(event){ //when the #refresh is clicked, this function is called
		app.init(); //function displayes new messages
	});


	submission();
	friends();
	showFriends();
});



var message = function (){
	$.ajax({
	  // This is the url you should use to communicate with the parse API server.
	  url: 'http://127.0.0.1:3000/classes/messages',
	  type: 'POST',
	  data: JSON.stringify(message),
	  contentType: 'application/json',
	  success: function (data) {
	    console.log('chatterbox: Message sent');
	  },
	  error: function (data) {
	    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	    console.error('chatterbox: Failed to send message');
	  }
	});
};

var app = {

	friendsList:[],

  	init : function(){
    $.ajax({
      url: 'http://127.0.0.1:3000/classes/messages',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {

        for (var i = data.results.length-1; i>=0; i--) {
          var id = data.results[i].objectId; //stores the users' id in a variable

          if($('#'+id)[0] === undefined && data.results[i].username !== undefined && data.results[i].text !== undefined ){
            //this if statement skips over tweets that are already populated or empty username or messages

            var $node = ('<div id='+id+' class="chat"></div>'); //makes a jquery node with the id equal to the users id
            $('#main').prepend($node); //appends the node to the DOM's body
            $('#'+id).append('<a href="#" class = username></a>'); //adds a p-tag for the user name
            $('#'+id).find('.username').text(data.results[i].username); //inserting clean(ie less system hackable) username text

            console.log('appending from init');

            $('#'+id).append('<p class = message></p>'); //adds a p-tag for the message
            $('#'+id).find('.message').text(data.results[i].text);//inserting clean(ie less system hackable) username message

            $('#'+id).append('<p class = roomname></p>'); //adds a p-tag for the message
            $('#'+id).find('.roomname').text('room name: ' + data.results[i].roomname);//inserting clean(ie less system hackable) username message

           }
        }
       friends();
       submission();
       showFriends();
      },

      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      } 
     }); 
	
  	},

  	send: function(message){
		$.ajax({
		  // This is the url you should use to communicate with the parse API server.
		  url: 'http://127.0.0.1:3000/classes/messages',
		  type: 'POST',
		  data: JSON.stringify(message),
		  contentType: 'application/json',
		  success: function (data) {
		    console.log('chatterbox: Message sent');
		  },
		  error: function (data) {
		    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
		    console.error('chatterbox: Failed to send message');
		  }
		});
  	},

  	fetch: function(){
  		$.ajax({
		  // This is the url you should use to communicate with the parse API server.
		  type: 'GET'})
  	},

  	clearMessages: function(){
  		$('.chat').remove();
  	},

  	addMessage: function(message) {
  		console.log("BUT IS THIS RUNNING?")
 		$.ajax({
		  // This is the url you should use to communicate with the parse API server.
		  url: 'http://127.0.0.1:3000/classes/messages',
		  type: 'POST',
		  data: JSON.stringify(message),
		  contentType: 'application/json',
		  
		  success: function () {
		  	app.init();
		  	var id = 'bananaRama';
            var $node = ('<div id='+id+' class="chat"></div>'); //makes a jquery node with the id equal to the users id
            $('#main').append($node); //appends the node to the DOM's body
            $('#'+id).append('<p class = username></p>'); //adds a p-tag for the user name
            $('#'+id).find('.username').text(message.username); //inserting clean(ie less system hackable) username text

            $('#'+id).append('<p class = message></p>'); //adds a p-tag for the message
            $('#'+id).find('.message').text(message.text);//inserting clean(ie less system hackable) username message

            $('#'+id).append('<p class = roomname></p>'); //adds a p-tag for the message
            $('#'+id).find('.roomname').text('room name: ' + message.roomname);//inserting clean(ie less system hackable) username message

		    console.log('chatterbox: Message appended');
		  	//app.init();
		  	friends();
		  },
		  error: function (data) {
		    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
		    console.error('chatterbox: Failed to append message');
		  }

		}); 		
	
  	},

	addRoom: function(room) {
		/*
		       expect($('#roomSelect').children().length).to.equal(1);
      });*/
	var room = ""+room;

    var $node = ('<div id='+room+'></div>'); //makes a jquery node with the id equal to the users id
    $('#roomSelect').prepend($node); //appends the node to the DOM's body
    $('#'+room).text(room);
    

	},

	addFriend: function(friend){
		if(app.friendsList.indexOf(friend) === -1){
			app.friendsList.push(friend);
		}

		//loop through the array,
		//find the usernames
		//and add class friends
		
		showFriends();
		console.log('addFriend', app.friendsList);
	},

	handleSubmit: function(message){
		console.log(message)
	}

};
app.init();

