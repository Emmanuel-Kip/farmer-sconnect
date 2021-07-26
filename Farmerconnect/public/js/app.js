const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_up_2=document.querySelector("#sign-up-two");
const sign_in_btn2=document.querySelector("#login");
const errorMsg=document.getElementById("errors");
const e=document.getElementById("standard-select");

var str=e.options[e.selectedIndex];



sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

sign_up_2.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
})



/*
window.addEventListener( "load", function () {
  // The function to send the data  
  function signupData() {
      // Javascript uses XMLHttpRequest  to send http requests
      const XHR = new XMLHttpRequest();
  
      // Bind the FormData object and the form element
      const FD = new FormData( form );
  
      // Define what happens on successful data submission
      XHR.addEventListener( "load", function(event) {
        // Get the response from the backend
        let response = JSON.parse(event.target.response);
        console.log(response.success);
        if(response.success){
          // redirect to our home page or sign in page or any other page
          // similar behavior as clicking on a link
          //window.location.href = "http://localhost:3001/posts";
          alert("Registered successfully");
        }else{
          alert( "Oops! Something went wrong.");
        }
      } );
  
      // Define what happens in case of error
      XHR.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
      } );
  
      // Set up our request and send it to out server
      XHR.open( "POST", "http://localhost:3001/" );
  
      XHR.setRequestHeader("Content-type", "application/json");
      // The data sent is what the user provided in the form
      XHR.send( FD );
    }
  
    // Access the form element...
   const form = document.getElementById( "sign-up-form" );
  
    // ...and take over its submit event.
    form.addEventListener( "submit", function ( event ) {
      // Prevent the html form from doing the default submission
      event.preventDefault();
      // Call the sendData() function defined above
      signupData();
    } );



    function signinData() {
    
      const XHR = new XMLHttpRequest();
  
      const FD = new FormData( form2 );
  
      XHR.addEventListener( "load", function(event) {
      
        let response = JSON.parse(event.target.response);
        console.log(response.success);
        if(response.success){
          alert("Login Successful");
        }else{
          alert( "Oops! Something went wrong.");
        }
      } );
  
      XHR.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
      } );
  
      XHR.open( "POST", "http://localhost:3001/login" );
  
      //XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
      XHR.send( FD );
    }
  
    // Access the form element...
   const form2= document.getElementById( "sign-in-form" );
  
    // ...and take over its submit event.
    form2.addEventListener( "submit", function ( event ) {
      // Prevent the html form from doing the default submission
      event.preventDefault();
      // Call the sendData() function defined above
      signinData();
    } );
  } );

*/



