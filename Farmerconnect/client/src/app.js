const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_up_2=document.querySelector("#sign-up-two");
const confirm=document.getElementById("#errors");
const sign_in_2=document.querySelector("#login");
const sign_in_form=document.querySelector("#sign-in-form")


sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

sign_up_2.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
})



/*const db = mysql.createConnection({
  host: "localhost",
  user: "JeanG",
  password:"Fl@mingoes31",
  database:"cruddatabase",
  port: 3307,
})

const express = require('express');
const mysql= require('mysql');
const cors= require('cors');
const app =express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));*/

//app.use(cors());

/*var loginbtn= document.getElementById("#login");
var error=document.getElementById("#errors");

function loginhandler(){
 
  var username=document.getElementById("#username").value;
  var password= document.getElementById("#password").value;

  error.innerHTML = "Login successful";*/
 /* Axios.post("http://localhost:3000/", {
    username: username,
    password: password,
  }).then((response) => {
    
  })*/
//}

//loginbtn.addEventListener("click", loginhandler());
//document.getElementsByClassName(".sign-in-form").onsubmit= loginhandler();

/*

/*app.get("/users", (req,res)=>{
    const sqlGet= "SELECT * FROM cruddatabase.tbl_users";
    db.query(sqlGet, (err, result)=>
    {
        res.send(result);
    })
})*/
/*
app.post("/", (req, res) =>{

    const username=req.body.username;
    const password=req.body.password;

    const sqlInsert="SELECT * FROM cruddatabase.tbl_users WHERE password='"+password+"'";
    db.query(sqlInsert, [username, password], (err,result)=>{
        error.innerHTML = "Login successful";
    });
})

app.listen(3001, () => {
    console.log("running on port 3001");
})*/




