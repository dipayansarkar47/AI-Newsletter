const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const Name = req.body.Name;
    const Email = req.body.Email;

    const data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: Name,
                }
            }
        ]
    };
    const josnData = JSON.stringify(data);
    const url = "https://us12.api.mailchimp.com/3.0/lists/dcf4728cfb";
    const options = {
        method: "POST",
        auth: "dipayansarkar47:f1cb28bd8812df3565fb4d2d288ec3f4-us12"
    }
    const request = https.request(url, options, function(response){

        if (response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(josnData);
    request.end();
    
});

app.post("/failure", function(req, res){
    res.redirect("/");
})
app.post("/done", function(req, res){
    res.redirect('https://znap.link/codewithbiki');
})
app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000");
});



