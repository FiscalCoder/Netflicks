//jshint esversion: 6

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req, res) =>
{
  res.sendFile(__dirname + "/index.html")
})

app.get("/signup", (req, res) =>
{
  res.sendFile(__dirname + "/public/signup.html")
})

//  res.sendFile(__dirname + "/public/signup.html")

app.post("/", (req, res) =>
{
  const firstname = req.body.firstn;
  const lastname = req.body.lastn;
  const email = req.body.firstn;
  console.log(req.body)
  const data =
  {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:
        {
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  }
  const url = 'https://us10.api.mailchimp.com/3.0/lists/6c49911a42' ;
  const options =
  {
    method: "POST",
    auth: "youcantseeme:8f7fb0ac1402292758b7736faf7d5b6d"
  }
  const jsonData = JSON.stringify(data);
  const request = https.request(url, options, (response) =>
  {
    res.sendFile(__dirname + "/failure.html");

    response.on("data", (data) =>
    {
      console.log(JSON.parse(data));
    })
  })
  //console.log(res.status());
  request.write(jsonData);
  request.end();
})

app.post("/failure", (req, res) =>
{
  res.redirect("/signup")
})




app.listen(process.env.PORT || 3000, () =>
{
  console.log("The server is running")
})
