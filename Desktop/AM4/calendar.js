var clientId = 'http://goo.gl/fbsS';
var apiKey = 'AIzaSyDRnbG6oZX51L5TlAe1XS4ch8kOg-0tpDI';
var scopes = 'https://www.googleapis.com/auth/calendar';




 // FUNCTION TO INSERT EVENT
   function insertEvent(calendar) {
   	var resource = {
        "summary":"My Summary",
        "location": "My Location",
	"description": "My Description",
        "start": {
          "date": "2015/06/18"  //if not an all day event, "date" should be "dateTime" with a dateTime value formatted according to RFC 3339
        },
        "end": {
          "date": "2015/06/18"  //if not an all day event, "date" should be "dateTime" with a dateTime value formatted according to RFC 3339
        }
      };
     gapi.client.load('calendar', 'v3', function() {  
       var request = gapi.client.calendar.events.insert({
         'calendarId': calendar,
	 'resource': resource
       });
     request.execute(function(resp) {
       console.log(resp);
	   if (resp.id){
	   	 alert("Event was successfully added to the calendar!");
	   }
	   else{
	   	alert("An error occurred. Please try again later.")
	   }
       
     });
     });
   } 
   // END INSERTEVENT FUNCTIOn


// END QUERY EVENTS FUNCTION 








function handleClientLoad() {
  console.log("Inside handleClientLoad ...");
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,100);
}

/* API function to check whether the app is authorized. */
function checkAuth() {
  console.log("Inside checkAuth ...");
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, 
                      handleAuthResult);
}

/* Invoked by different functions to handle the result of authentication checks.*/
function handleAuthResult(authResult) {
    console.log("Inside handleAuthResult ...");
    var authorizeButton = document.getElementById('authorize-button');
    var addButton = document.getElementById('addToCalendar');
    if (authResult && !authResult.error) {
          authorizeButton.style.visibility = 'hidden';
          addButton.style.visibility = 'visible'; 
          //load the calendar client library
          gapi.client.load('calendar', 'v3', function(){ 
            console.log("Calendar library loaded.");
          });
    } else {
          authorizeButton.style.visibility = '';
          authorizeButton.onclick = handleAuthClick;
        }
}

/* Event handler that deals with clicking on the Authorize button.*/
function handleAuthClick(event) {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, 
                        handleAuthResult);
    return false;
}
