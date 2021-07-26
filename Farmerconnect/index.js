const express = require('express');
const bodyparser= require('body-parser');
const cors= require('cors');
const app =express();
const router=express.Router();
const ejs=require('ejs');
const moment = require("moment");

// config/passport.js
const passport=require('passport');			
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

//require('./config/passport');
/*
// expose this function to our app using module.exports
module.exports = function(passport) {
    // passport session setup 
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
		done(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
		db.query("select * from tblusers where userID = "+id,function(err,rows){	
			done(err, rows[0]);
		});
    });
	
    // LOCAL SIGNUP 
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'
    passport.use('local',new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
        db.query("select * from tblusers where email = '"+email+"'",function(err,rows){
			console.log(rows);
			console.log("above row object");
			if (err)
                return done(err);
			 if (rows.length) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
				return done(null, req.flash('signupMessage', 'No account'));
            }	
		});
    }));
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    /*
    passport.use('local',new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        db.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err,rows){
			if (err)
                return done(err);
			 if (!rows.length) {
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            } 
			
			// if the user is found but the password is wrong
            if (!( rows[0].password == password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
			
            // all is well, return successful user
            return done(null, rows[0]);			
		
		});
    }));
};
*/

passport.use(new LocalStrategy(
    function(username, password, done) {
   user.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));


app.use((req, res, next)=>{
    res.locals.moment = moment;
    next();
  });

/*
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:"farmerconnect",
    port: 3307,
})
*/
app.use(express.urlencoded({
    extended: true
  }));
app.use(bodyparser.json());

app.use(cors());

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());

/*
router.get("/postproduce", function(req, res){
    res.sendFile(path.join(__dirname+'client/src copy/postProduce.html'));
});

app.use('/postproduce', router);
*/

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

app.post("/login", (req,res) =>{
    const username=req.body.username;
    const password=req.body.password;

    if(username!=null && password!=null){
        const sqlGet="SELECT user_type FROM farmerconnect.tblusers WHERE emailID='"+username+"' AND password='"+password+"'";
        db.query(sqlGet, (err, result)=>{
            if(err) throw (err);
            
            if(result!=null){
                Object.keys(result).forEach(function(key) {
                    var row = result[key];
                    console.log(row.user_type)
                    if(row.user_type=="farmer"){
                        console.log("Login successful");
                        return res.redirect('postproduce');
                    }
                    else if(row.user_type=="buyer"){
                        console.log("Login successful");
                        return res.redirect('/posts');
                    }else if(row.user_type=="transporter"){
                        console.log("Login successful");
                        return res.redirect('postTransport');
                    }else if(row.user_type=="storage"){
                        console.log("Login successful");
                        
                    }
                  });
            }
        })
    }
})

app.get("/posts", function(req,res){

    const sql="SELECT produceName, amountAvailable, pricePerKg, dateOfHarvest, farmerID FROM farmerconnect.postproduce";
    db.query(sql, function(err,rows,fields){
        if (err) throw err;
        res.render('posts', {title: 'post details', items: rows})
    })
  })

  app.get("/postproduce", function(req, res){
      res.sendFile(__dirname+"/client/src copy/postProduce.html");
  })

  app.get("/postTransport", function(req, res){
    res.sendFile(__dirname+"/client/src copy/transport.html");
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

app.listen(3001, () => {
    console.log("running on port 3001");
})