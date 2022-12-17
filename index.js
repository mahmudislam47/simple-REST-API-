const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7gxuuxs.mongodb.net/${process.env.DB_NAME}`;
const User = require("./models/User");
mongoose.connect(
  DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongodb");
  }
);

const app = express();

app.use(cors());
app.use(express.json());

//Pagination
app.get("/api", async (req, res) => {
  let { page, limit, sort, asc } = req.query;
  if (!page) page = 1;
  if (!limit) limit = 1;

  const skip = (page - 1) * 10;
  const users = await User.find()
    .sort({ [sort]: asc })
    .skip(skip)
    .limit(limit);
  res.send({ page: page, limit: limit, users: users });
});


app.get("/api/:key",async (req,resp)=>{
  let data = await User.find(
      {
          "$or":[
              {phone:{$regex:req.params.key}},
              {uid:{$regex:req.params.key}},
              {firstname:{$regex:req.params.key}},
              {lastname:{$regex:req.params.key}}
              
          ]
      }
  )
  resp.send(data);

})

app.listen(4000, () => {
  console.log("server is running on port 4000");
});