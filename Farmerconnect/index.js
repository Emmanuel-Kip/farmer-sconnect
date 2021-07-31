const express = require('express');
const bodyparser= require('body-parser');
const cors= require('cors');
const app =express();
const router=express.Router();
const ejs=require('ejs');
//const moment = require("moment");
app.locals.moment = require('moment');
// config/passport.js
const passport=require('passport');	
const cookieParser=require('cookie-parser');		
// load all the things we need
const LocalStrategy   = require('passport-local').Strategy;

const mysql= require('mysql');

const db = mysql.createConnection({
				  host     : 'localhost',
				  user     : 'root',
				  password : '',
                  port: 3307,
				});
db.query('USE `farmerconnect`');	

app.use(express.urlencoded({
    extended: true
  }));
app.use(bodyparser.json());

app.use(cors());

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

/*
router.get("/postproduce", function(req, res){
    res.sendFile(path.join(__dirname+'client/src copy/postProduce.html'));
});

app.use('/postproduce', router);
*/
// get the cookie incoming request
app.get('/getcookie', (req, res) => {
    //show the saved cookies
    console.log(req.cookies)
    res.send(req.cookies);
});

//a get route for adding a cookie
app.get('/setcookie', (req, res) => {
    res.cookie(`Cookie token name`,`encrypted cookie string Value`,{
        maxAge: 5000,
        // expires works the same as the maxAge
        expires: new Date('01 12 2021'),
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    res.send('Cookie have been saved successfully');
});

//main page for everyone
app.get("/home", function(req, res){
    res.sendFile(__dirname+"/public/index1.html");
})

//welcome page for buyers
app.get("/welcome", function(req, res){
    res.sendFile(__dirname+"/public/index2.html");
})

//welcome page for farmers
app.get("/welcome2", function(req, res){
    res.sendFile(__dirname+"/public/index3.html");
})

//welcome page for transport owners
app.get("/welcome3", function(req, res){
    res.sendFile(__dirname+"/public/index4.html");
})

//welcome page for storage owners
app.get("/welcome4", function(req, res){
    res.sendFile(__dirname+"/public/index5.html");
})

//displaying signup page
app.get("/signup", function(req, res){
    res.sendFile(__dirname+"/public/index.html");
})

//sign up page handler
app.post("/", (req, res) =>{    

    const fname= req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const phone= req.body.phone;
    const city=req.body.city;
    const password=req.body.pword;
    const password2=req.body.pword2;
    const user_type=req.body.selected;

    const sqlInsert="INSERT INTO farmerconnect.tblusers(emailID, first_name, last_name, phone_number, city, user_type, password, password2)"+
    "VALUES('"+email+"','"+fname+"','"+lname+"','"+phone+"','"+city+"','"+user_type+"','"+password+"','"+password2+"')";
    db.query(sqlInsert, (err, result)=>{
        if(err) throw err;
        console.log("registered");
    });

})

//login handler
app.post("/process_login", (req, res) => {
    // get the data
    let { username, password } = req.body;
  
    const sqlGet="SELECT userID,first_name, user_type, emailID, password FROM farmerconnect.tblusers WHERE emailID='"+username+"' AND password='"+password+"'";

    db.query(sqlGet, (err, result)=>{
        if(err) throw (err);
        
        if(result!=null){
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                console.log(row.user_type);
                let userdetails={
                    userid:row.userID,
                    username:row.emailID,
                    password:row.password,
                    fname:row.first_name,
                };
                // basic check
                if (
                     username === userdetails["username"] &&
                    password === userdetails["password"]
                 ) {
                 // saving the data to the cookies
                res.cookie("userid", userdetails["userid"]);
                res.cookie("username", userdetails["fname"]);
                // redirect
                if(row.user_type=="farmer"){
                    return res.redirect("/welcome2");
                }else if(row.user_type=="buyer"){
                    return res.redirect("/welcome");
                }else if(row.user_type=="transporter"){
                    return res.redirect("/welcome3");
                }else if(row.user_type=="storage"){
                    return res.redirect("/welcome4");
                }
                
                } else {
                // redirect with a fail msg
                return res.redirect("/signup?msg=fail");
                }
            });
        }
    });
  });

//set farmer post produce page
app.get("/postproduce", function(req, res){
    res.sendFile(__dirname+"/public/postProduce.html");
})

//post produce handler
app.post("/postProduce", (req, res) =>{    
    console.log(req.body);
    
    const userid=req.cookies.userid;
    const produceName= req.body.produceName;
    const amountAvailable=req.body.amountAvailable;
    const pricePerKg=req.body.pricePerKg;
    const dateOfHarvest= req.body.dateOfHarvest;
    
    const sqlInsert="INSERT INTO farmerconnect.tblpostproduce(produceName, amountAvailable, pricePerKg, dateOfHarvest, farmerID, phoneNo)"+
    "VALUES('"+produceName+"','"+amountAvailable+"','"+pricePerKg+"','"+dateOfHarvest+"','"+userid+"',NULL)";

    db.query(sqlInsert, (err, result)=>{
        if(err) res.send(err);
        console.log("Produce posted successfully");
        res.redirect("/postproduce");
    })
  
})

//view farmers' posts by buyers
app.get("/posts", function(req,res){

    const sql="SELECT postID,produceName, amountAvailable, pricePerKg, dateOfHarvest, first_name FROM farmerconnect.tblpostproduce INNER JOIN farmerconnect.tblusers WHERE tblpostproduce.farmerID=tblusers.userID";
    db.query(sql, function(err,rows,fields){
        if (err) throw err;
        res.render('posts', {title: 'post details', items: rows})
    })
  })

  //farmer to view own posts
  app.get("/myposts", function(req,res){
    const userid=req.cookies.userid;
    const sql="SELECT produceName, amountAvailable, pricePerKg, dateOfHarvest, phoneNo FROM farmerconnect.tblpostproduce WHERE farmerID='"+userid+"'";
    db.query(sql, function(err,rows,fields){
        if (err) throw err;
        res.render('myposts', {title: 'post details', items: rows})
    })
})

//set buyer request produce page
app.get("/request", function(req, res){
    res.sendFile(__dirname+"/public/requestProduce.html");
})

  //buyer to view their requests
app.get("/myrequest", function(req,res){
    const userid=req.cookies.userid;
    const sql="SELECT produceName, orderAmount, timeOrdered FROM farmerconnect.requestproduce WHERE userID='"+userid+"'";
    db.query(sql, function(err,rows,fields){
        if (err) throw err;
        res.render('myrequest', {title: 'post details', items: rows})
    })
})

//request produce handler
app.post("/requestProduce", function(req, res){
    const producename=req.body.produceName;
    const orderamt=req.body.orderAmount;
    const phone_number=req.body.phoneNo;
    const userid=req.cookies.userid;
    
   const sqlInsert="INSERT INTO farmerconnect.requestproduce(produceName, orderAmount,timeOrdered, postID,phone_number,userID)"+
    "VALUES('"+producename+"','"+orderamt+"',NOW(),NULL,'"+phone_number+"','"+userid+"')";

    db.query(sqlInsert, function(err,result ){
        if (err) throw err;
        console.log("Request posted successfully");
        res.redirect("/request");
    })
})
/*
app.post("/requestProduce2", function(req, res){

    const postid=req.query.id;
    const producename=req.body.postName;
    const orderamt=req.body.amount;
   // const postID=req.body.postID;
    
   const sqlInsert="INSERT INTO farmerconnect.requestproduce2(producename, orderAmount,timeOrdered, postID)"+
    "VALUES('"+producename+"','"+orderamt+"',NOW(),'"+postid+"')";

    db.query(sqlInsert, function(err,result ){
        if (err) throw err;
        console.log("Request posted successfully");
        res.cookie("postid",postid);
        res.redirect("/posts");
    })
    
})
*/

//view buyer's requests
app.get("/requests", function(req, res){
    const sql="SELECT produceName, orderAmount, timeOrdered,first_name FROM farmerconnect.requestproduce INNER JOIN farmerconnect.tblusers WHERE tblusers.userID=requestproduce.userID";
    db.query(sql, function(err,rows, fields){
        if(err) throw err;
        res.render('requests',{ title: 'request details', items: rows})
    })
})

  //set transporter's post transport page
app.get("/postTransport", function(req, res){
    res.sendFile(__dirname+"/public/transport.html");
})

//post transport handler
app.post("/transport", (req, res) =>{    

    const vehiclename= req.body.vehicleName;
    const amount=req.body.amount;
    const price=req.body.price;
    const location= req.body.location;
    const destination= req.body.destination;
    const phone_number=req.body.phoneNo;
    const userid=req.cookies.userid;
   
    const sqlInsert="INSERT INTO farmerconnect.posttransport(vehicleName,amountCapable,pricePerKm,location,phoneNo,userID,destination)"+
    "VALUES('"+vehiclename+"','"+amount+"','"+price+"','"+location+"','"+phone_number+"','"+userid+"','"+destination+"')";
    db.query(sqlInsert, (err, result)=>{
        if(err) throw err;
        console.log("posted");
        res.redirect("/postTransport");
    });
})

//view transports by buyer
app.get("/transports", function(req, res){
    const sql="SELECT vehicleName, amountCapable, pricePerKm, location,destination, first_name FROM farmerconnect.posttransport INNER JOIN farmerconnect.tblusers WHERE tblusers.userID=posttransport.userID";
    db.query(sql, function(err,rows, fields){
        if(err) throw err;
        res.render('transport',{ title: 'transport details', items: rows})
    })
})

//view transports by farmer
app.get("/transports2", function(req, res){
    const sql="SELECT vehicleName, amountCapable, pricePerKm, location,destination, first_name FROM farmerconnect.posttransport INNER JOIN farmerconnect.tblusers WHERE tblusers.userID=posttransport.userID";
    db.query(sql, function(err,rows, fields){
        if(err) throw err;
        res.render('transports2',{ title: 'transport details', items: rows})
    })
})

//transport owner to view own posted transports
app.get("/viewtransport2", function(req, res){
    const userid=req.cookies.userid;
    const sql="SELECT vehicleName, amountCapable, pricePerKm, location,destination FROM farmerconnect.posttransport WHERE userID='"+userid+"'";
    db.query(sql, function(err,rows, fields){
        if(err) throw err;
        res.render('mytransport',{ title: 'transport details', items: rows})
    })
})

//buyer to view own transports requests
app.get("/viewtransport3", function(req, res){
    const userid=req.cookies.userid;
    const sql="SELECT vehicleName,amountTransported,location,destination FROM farmerconnect.requesttransport WHERE userID='"+userid+"'";
    db.query(sql, function(err,rows, fields){
        if(err) throw err;
        res.render('mytransport2',{ title: 'transport details', items: rows})
    })
})

//farmer to view own transports requests
app.get("/viewtransport4", function(req, res){
    const userid=req.cookies.userid;
    const sql="SELECT vehicleName,amountTransported,location,destination FROM farmerconnect.requesttransport WHERE userID='"+userid+"'";
    db.query(sql, function(err,rows, fields){
        if(err) throw err;
        res.render('mytransport3',{ title: 'transport details', items: rows})
    })
})

//transporter to view all transport requests
app.get("/viewtransports", function(req, res){
    const sql="SELECT vehicleName,amountTransported,timeOrdered,transID,location,destination,first_name FROM farmerconnect.requesttransport INNER JOIN farmerconnect.tblusers WHERE tblusers.userID=requesttransport.userid";
    db.query(sql, function(err,rows, fields){
        if(err) throw err;
        res.render('transports',{ title: 'transport details', items: rows})
    })
})

 //set buyer's request transport page
 app.get("/requestTransport", function(req, res){
    res.sendFile(__dirname+"/public/requestTransport.html");
})

 //set farmer's request transport page
 app.get("/requestTransport2", function(req, res){
    res.sendFile(__dirname+"/public/requestTransport2.html");
})

//request transport handler
app.post("/requesttransport", (req, res) =>{    

    const vehiclename= req.body.vehicleName;
    const amount=req.body.amount;
    const location= req.body.location;
    const destination= req.body.destination;
    const userid=req.cookies.userid;
   
    const sqlInsert="INSERT INTO farmerconnect.requesttransport(vehicleName,amountTransported,timeOrdered,postID,location,userid,destination)"+
    "VALUES('"+vehiclename+"','"+amount+"',NOW(),NULL,'"+location+"','"+userid+"','"+destination+"')";
    db.query(sqlInsert, (err, result)=>{
        if(err) throw err;
        console.log("posted");
        res.redirect("/requestTransport");
    });
})

//request transport handler(farmer's)
app.post("/requesttransport2", (req, res) =>{    

    const vehiclename= req.body.vehicleName;
    const amount=req.body.amount;
    const location= req.body.location;
    const userid=req.cookies.userid;
    const destination= req.body.destination;

    const sqlInsert="INSERT INTO farmerconnect.requesttransport(vehicleName,amountTransported,timeOrdered,postID,location,userid,destination)"+
    "VALUES('"+vehiclename+"','"+amount+"',NOW(),NULL,'"+location+"','"+userid+"','"+destination+"')";
    db.query(sqlInsert, (err, result)=>{
        if(err) throw err;
        console.log("posted");
        res.redirect("/requestTransport2");
    });
})

//set storage owner post storage page
app.get("/poststorage", function(req, res){
    res.sendFile(__dirname+"/public/postStorage.html");
})

//set farmer request storage page
app.get("/requeststorage", function(req, res){
    res.sendFile(__dirname+"/public/requestStorage.html");
})

//post storage handler
app.post("/postStorage", (req, res) =>{    
    console.log(req.body);
    
    const userid=req.cookies.userid;
    const facilityName= req.body.facilityName;
    const spaceAvailable=req.body.spaceAvailable;
    const price=req.body.price;
    const location= req.body.location;
    
    const sqlInsert="INSERT INTO farmerconnect.poststorage(facilityName,spaceAvailable,price,location,userID)"+
    "VALUES('"+facilityName+"','"+spaceAvailable+"','"+price+"','"+location+"','"+userid+"')";

    db.query(sqlInsert, (err, result)=>{
        if(err) res.send(err);
        console.log("Produce posted successfully");
        res.redirect("/poststorage");
    })
})

  //storage owner to view own posts
  app.get("/mystorage", function(req,res){
    const userid=req.cookies.userid;
    const sql="SELECT facilityName,spaceAvailable,price,location FROM farmerconnect.poststorage WHERE userID='"+userid+"'";
    db.query(sql, function(err,rows,fields){
        if (err) throw err;
        res.render('mystorage', {title: 'post details', items: rows})
    })
})

//request storage handler
app.post("/requestStorage", (req, res) =>{    
    console.log(req.body);
    
    const userid=req.cookies.userid;
    const facilityName= req.body.facilityName;
    const spaceAvailable=req.body.spaceAvailable;
    const location= req.body.location;
    
    const sqlInsert="INSERT INTO farmerconnect.requeststorage(facilityName,spaceAvailable,location,userID)"+
    "VALUES('"+facilityName+"','"+spaceAvailable+"','"+location+"','"+userid+"')";

    db.query(sqlInsert, (err, result)=>{
        if(err) res.send(err);
        console.log("Requested posted successfully");
        res.redirect("/requeststorage");
    })
})

//view storage requests 
app.get("/storage", function(req, res){
    const sql="SELECT facilityName,spaceNeeded,location FROM farmerconnect.requeststorage";
    db.query(sql, function(err,rows, fields){
        if(err) throw err;
        res.render('storage',{ title: 'transport details', items: rows})
    })
})

//view storage posts
app.get("/storages", function(req, res){
    const sql="SELECT facilityName,spaceAvailable,price,location FROM farmerconnect.poststorage";
    db.query(sql, function(err,rows, fields){
        if(err) throw err;
        res.render('storages',{ title: 'transport details', items: rows})
    })
})

 //farmer to view own posts
 app.get("/mystorage2", function(req,res){
    const userid=req.cookies.userid;
    const sql="SELECT facilityName,spaceNeeded,location, first_name FROM farmerconnect.requeststorage INNER JOIN farmerconnect.tblusers WHERE tblusers.userID=requeststorage.userID";
    db.query(sql, function(err,rows,fields){
        if (err) throw err;
        res.render('mystorage2', {title: 'post details', items: rows})
    })
})

app.get("/logout", (req, res) => {
    // clear the cookie
    res.clearCookie("username");
    res.clearCookie("userid");
    res.clearCookie("postid");
    // redirect to home page
    return res.redirect("/home");
  });

app.listen(3001, () => {
    console.log("running on port 3001");
})