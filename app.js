const express = require("express");
const mongo = require("mongodb");
const dotenv = require("dotenv");
const cors = require("cors");

const bodyParser = require("body-parser");
dotenv.config();
let db;

const MongoClient = mongo.MongoClient;
const app = express();
app.use(cors());
const PORT = process.env.PORT || 8000;

// console.log(process.env);
const MONGO_URL = process.env.MONGO_URL;
 //const MONGO_URL = "mongodb://localhost:27017";
//supporting libraries- middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello everyone how r u🥳🥳😉😉😉");
  });

  // location endpoint

  // const locations = [
  //     {
  //       location_id: 1,
  //       location_name: "Ashok Nagar, New Delhi",
  //       state_id: 1,
  //       state: "Delhi",
  //       country_name: "India",
  //     },
  //     {
  //       location_id: 2,
  //       location_name: "Jeevan Nagar, New Delhi",
  //       state_id: 1,
  //       state: "Delhi",
  //       country_name: "India",
  //     },
  //     {
  //       location_id: 3,
  //       location_name: "Vasant Kunj, New Delhi",
  //       state_id: 1,
  //       state: "Delhi",
  //       country_name: "India",
  //     },
  //   ];





//Mongodb Connection
MongoClient.connect(MONGO_URL, (err, client) => {
  console.log("Mongo is connected");
 
  if (err)
   console.log("Error while connecting");

 
 db = client.db("zomato-app");
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});

app.get("/locations", (req, res) => {

  db.collection("locations")
  .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });


  app.get("/mealType", (req, res) => {

    db.collection("mealType").find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
      });
    });
    app.get("/restaurant",(req,res) =>
    {
      db.collection("menu").find().toArray((err,result )=>{

      
      if(err) throw err;
      res.send(result);
    });

    });

