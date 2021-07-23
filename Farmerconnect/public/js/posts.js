
document.getElementById("request").addEventListener("click",()=>{
  console.log("clicked me");
})



window.addEventListener( "load", function () {
    // The function to send the data  
    function sendData() {
        // Javascript uses XMLHttpRequest  to send http requests
        const XHR = new XMLHttpRequest();
    
        // Bind the FormData object and the form element
        //const FD = new FormData( form );
        
    
        // Define what happens on successful data submission
        XHR.addEventListener( "load", function(event) {
          // Get the response from the backend
          let response = JSON.parse(event.target.response);
          console.log(response.success);
          if(response.success){
            // redirect to our home page or sign in page or any other page
            // similar behavior as clicking on a link
            window.location.href = "http://localhost:3001/posts";
          }else{
            alert( "Oops! Something went wrong.");
          }
        } );
    
        // Define what happens in case of error
        XHR.addEventListener( "error", function( event ) {
          alert( 'Oops! Something went wrong.' );
        } );
    
        // Set up our request and send it to out server
        XHR.open( "POST", "http://localhost:3001/requests" );
    
        // The data sent is what the user provided in the form
        //XHR.send( FD );
      }
    
      // Access the form element...
     // const form = document.getElementById( "signup_form" );
    
      // ...and take over its submit event.
      request.addEventListener( "submit", function ( event ) {
        // Prevent the html form from doing the default submission
        event.preventDefault();
        // Call the sendData() function defined above
        sendData();
      } );
    } );
