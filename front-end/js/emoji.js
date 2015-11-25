var request = new XMLHttpRequest();
 request.open('GET', 'https://www.emojidex.com/api/v1/utf_emoji', true);

 request.onload = function() {
     if (request.status >= 200 && request.status < 400) {
       // Success!
       var resp = request.responseText;
       console.log(resp);
     } else {
       // We reached our target server, but it returned an error
       console.log('Uh oh, an error on the server side');
     }
   };

   request.onerror = function() {
     // There was a connection error of some sort
     console.log('Something went wrong with the client side.');
   };

   request.send();