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

console.log(process.env);
const MONGO_URL = process.env.MONGO_URL;
 //const MONGO_URL = "mongodb://localhost:27017";
//supporting libraries- middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello everyone how r u🥳🥳😉😉😉");
  });







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

  // location endpoint
app.get("/locations", (req, res)  => {
  db.collection("locations").find().toArray((err,result) =>{

    if(err) throw err;
    res.send(result);
  });
});

  app.get("/mealType", (req, res) => {

    db.collection("mealType").find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
      });
    });
 app.get("/mealType",(req,res) =>
 {
  db.collection("mealType").find().toArray((err,result)=>
  {
    if(err) throw err;
    res.send(result);

  })
 })

 app.get("/zomato",(req,res) =>
 {
  let query = {}
  let stateId = Number(req.query.state_id);
  let mealId = Number(req.query.mealId);
  if(stateId)
  {
    query ={state_id : stateId}

  }
else if(mealId)
{
  query = {"mealType.mealType_id":mealId}
}
  db.collection("zomato").find(query).toArray((err,result)=>
  {
    if(err) throw err;
    res.send(result);
  })
 })
 //particular restaurant data on id
 app.get("/data",(req,res) =>
 {
  
    res.send(data);
  })
