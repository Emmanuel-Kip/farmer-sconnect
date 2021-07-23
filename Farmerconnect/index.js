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

app.post("/", (req, res) =>{    

    const fname= req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const phone= req.body.phone;
    const city=req.body.city;
    const password=req.body.pword;
    const password2=req.body.pword2;
    const user_type=req.body.selected;

    const sqlInsert="INSERT INTO farmerconnect.tblusers(emailid, first_name, last_name, phone_number, city, user_type, password, password2)"+
    "VALUES('"+email+"','"+fname+"','"+lname+"','"+phone+"','"+city+"','"+user_type+"','"+password+"','"+password2+"')";
    db.query(sqlInsert, (err, result)=>{
        if(err) throw err;
        console.log("registered");
    });

})

app.post("/login", (req,res) =>{
    const username=req.body.username;
    const password=req.body.password;

    const sqlGet="SELECT * FROM farmerconnect.tbl_users WHERE emailid='"+username+"' AND password='"+password+"'";
    db.query(sqlGet, (err, result)=>{
        if(err) throw (err);
        console.log("Login sucessful");
    })
})

app.get("/posts", function(req,res){

    const sql="SELECT produceName, amountAvailable, pricePerKg, dateOfHarvest, farmerID FROM farmerconnect.postproduce";
    db.query(sql, function(err,rows,fields){
        if (err) throw err;
        res.render('posts', {title: 'post details', items: rows})
    })
  })

app.post("/request", function(req, res){
    const producename=req.body.postName;
    const orderamt=req.body.amount;
    const postID=req.body.postID;
    
   const sqlInsert="INSERT INTO farmerconnect.requestproduce(timeOrdered, postID,phone_number,userid)"+
    "VALUES(NOW(),"+orderamt+"',NOW(),'"+postID+"','07999')";

    db.query(sqlInsert, function(err,result ){
        if (err) throw err;
        console.log("Request successful");
    })
})

app.get("/requests", function(req, res){
    const sql="SELECT produceName, orderAmount, timeOrdered FROM farmerconnect.requestproduce";
    db.query(sql, function(err,rows, fields){
        if(err) throw err;
        res.render('requests',{ title: 'request details', items: rows})
    })
})

app.post("/transport", (req, res) =>{    

    const vehiclename= req.body.vehicleName;
    const amount=req.body.amount;
    const price=req.body.price;
    const location= req.body.location;
   

    const sqlInsert="INSERT INTO farmerconnect.posttransport(vehicleName,amountCapable,pricePerKm,location,farmerID)"+
    "VALUES('"+vehiclename+"','"+amount+"','"+price+"','"+location+"',NULL)";
    db.query(sqlInsert, (err, result)=>{
        if(err) throw err;
        console.log("posted");
    });

})

app.get("/transports", function(req, res){
    const sql="SELECT vehicleName, amountCapable, pricePerKm, location, farmerID FROM farmerconnect.posttransport";
    db.query(sql, function(err,rows, fields){
        if(err) throw err;
        res.render('transport',{ title: 'transport details', items: rows})
    })
})

app.post("/postProduce", (req, res) =>{    
    console.log(req.body);
    
    const produceName= req.body.produceName;
    const amountAvailable=req.body.amountAvailable;
    const pricePerKg=req.body.pricePerKg;
    const dateOfHarvest= req.body.dateOfHarvest;
    
    const sqlInsert="INSERT INTO farmerconnect.postproduce(produceName, amountAvailable, pricePerKg, dateOfHarvest, farmerID)"+
    "VALUES('"+produceName+"','"+amountAvailable+"','"+pricePerKg+"','"+dateOfHarvest+"',NULL)";

    db.query(sqlInsert, (err, result)=>{
        if(err) res.send(err);
        console.log("Produce posted successfully");
        
    })
  
})



app.post("/requestProduce", (req, res) =>{    
    console.log(req.body);
    

    const produceName= req.body.produceName;
    const orderAmount=req.body.orderAmount;
    
    

    const sqlInsert="INSERT INTO farmerconnect.request_produce(produceName, orderAmount)"+
    "VALUES('"+produceName+"','"+orderAmount+"')";

    db.query(sqlInsert, (err, result)=>{
        if(err) res.send(err);
        console.log("Request posted successfully");
        
    })
  
})

app.listen(3001, () => {
    console.log("running on port 3001");
})