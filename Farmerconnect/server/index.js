console.log("hello")
const express = require('express');
const mysql= require('mysql2');
const bodyparser= require('body-parser');
const cors= require('cors');
const app =express();
const router=express.Router();
const ejs=require('ejs');
const passport=require('passport');
const moment = require("moment");

app.use((req, res, next)=>{
    res.locals.moment = moment;
    next();
  });


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:"farmerconnect",
    port: 3307,
})

app.use(express.urlencoded({
    extended: true
  }));
app.use(bodyparser.json());

app.use(cors());

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());

app.post("/login", (req,res) =>{
    const username=req.body.username;
    const password=req.body.password;

    const sqlGet="SELECT * FROM farmerconnect.tbl_users WHERE emailid='"+username+"' AND password='"+password+"'";
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

    const sqlInsert="INSERT INTO farmerconnect.tbl_users(emailid, first_name, last_name, phone_number, city, user_type, password, password2)"+
    "VALUES('"+email+"','"+fname+"','"+lname+"','"+phone+"','"+city+"','farmer','"+password+"','"+password2+"')";

    db.query(sqlInsert, (err, result)=>{
        if(err) res.send(err);
        console.log("registered");
        
    })
  
})
app.post("/storage", (req, res) =>{    
    console.log(req.body);
    

    const storageCompany= req.body.storageCompany;
    const unitSize=req.body.unitSize;
    const location=req.body.location;
    const emailaddress= req.body.emailaddress;
    

    const sqlInsert="INSERT INTO farmerconnect.storage(storageCompany, unitSize, location, emailaddress)"+
    "VALUES('"+storageCompany+"','"+unitSize+"','"+location+"','"+emailaddress+"')";

    db.query(sqlInsert, (err, result)=>{
        if(err) res.send(err);
        console.log("Storage posted successfully");
    

    
        app.get("/storage", function(req,res){

            const sql="SELECT storageCompany, unitSize, location, emailaddress FROM farmerconnect.storage";
            db.query(sql, function(err,rows,fields){
                if (err) throw err;
                res.render('storage', {title: 'storage details', items: rows})
            })
          })
           
        app.post("/requeststorage", function(req, res){
           const typeProduce =req.body.typeProduce;
           const size=req.body.size;
           const phoneNumber=req.body.phoneNumber;
    
       const sqlInsert="INSERT INTO farmerconnect.requeststorage(typeProduce, size, phoneNumber)"+
           "VALUES('"+typeProduce+"','"+size+"','"+phoneNumber+"')";

        db.query(sqlInsert, function(err,result ){
        if (err) throw err;
        console.log("Request successful");
    })
})    
  
})

app.listen(3001, () => {
    console.log("running on port 3001");
})
})