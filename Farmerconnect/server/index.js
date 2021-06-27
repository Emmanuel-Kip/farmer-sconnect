console.log("hello")

const express = require('express');
const mysql= require('mysql');
const bodyparser= require('body-parser');
const cors= require('cors');
const bodyParser = require('body-parser');
const app =express();
const router=express.Router();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:"fconnectdb",
    port: 3307,
})

app.use(express.urlencoded({
    extended: false,
  }));
app.use(bodyparser.json());

app.use(cors());

app.post("/login", (req,res) =>{
    const username=req.body.username;
    const password=req.body.password;

    const sqlGet="SELECT * FROM fconnectdb.tbl_users WHERE emailid='"+username+"' AND password='"+password+"'";
    db.query(sqlGet, (err, result)=>{
        if(err) res.send(err);
        console.log("Login sucessful");
    })
})

app.post("/", (req, res) =>{    
    console.log(req.body);
    
    const fname= req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const phone= req.body.phone;
    const city=req.body.city;
    const password=req.body.pword;
    const password2=req.body.pword2;

    const sqlInsert="INSERT INTO fconnectdb.tbl_users(emailid, first_name, last_name, phone_number, city, user_type, password, password2)"+
    "VALUES('"+email+"','"+fname+"','"+lname+"','"+phone+"','"+city+"','farmer','"+password+"','"+password2+"')";

    db.query(sqlInsert, (err, result)=>{
        if(err) res.send(err);
        console.log("registered");
        
    })
  
})

app.listen(3001, () => {
    console.log("running on port 3001");
})