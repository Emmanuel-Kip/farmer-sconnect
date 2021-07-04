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
    database:"farmerconnect",
    port: 3307,
})

app.use(express.urlencoded({
    extended: false,
  }));
app.use(bodyparser.json());

app.use(cors());



app.post("/", (req, res) =>{    
    console.log(req.body);
    

    const produceName= req.body.produceName;
    const amountAvailable=req.body.amountAvailable;
    const pricePerKg=req.body.pricePerKg;
    const dateOfHarvest= req.body.dateOfHarvest;
    

    const sqlInsert="INSERT INTO farmerconnect.post_produce(produceName, amountAvailable, pricePerKg, dateOfHarvest, phone_number)"+
    "VALUES('"+produceName+"','"+amountAvailable+"','"+pricePerKg+"','"+dateOfHarvest+"','0712345678')";

    db.query(sqlInsert, (err, result)=>{
        if(err) res.send(err);
        console.log("Produce posted successfully");
        
    })
  
})

app.listen(3007, () => {
    console.log("running on port 3007");
})