const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const accountSid = 'ACadc3ffb43cef495abeafebce2609c137'; // Your Account SID from www.twilio.com/console
const authToken = '1069b3764bb73164952c4effb0259a96'; // Your Auth Token from www.twilio.com/console


//const client = new twilio(accountSid, authToken);

function sendSMS() {
    console.log("send sms method");
    client.messages
        .create({
            body: 'Hello from Node by iqbal',
            to: '+8801622869685', // Text this number
            from: '+44 7480 609895', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
        

    console.log("this is the function end");

}

app.get("/",(req,res)=>{
    res.send("Bulk SMS with Twilio");
})

app.post("/twilioconfiq",(req,res)=>{
    const {phonenumber,twilionumber,twilioSID,twilioauthtoken,message} = req.body;
    console.log(phonenumber);
    console.log(twilionumber);
    console.log(twilioSID);
    console.log(twilioauthtoken);
    console.log(message);
    const client = new twilio('ACdd6486b54212f6bc7740b98a158177b2', 'a792e283777a09b5035176281fcfb3e0');
    client.messages
        .create({
            body: message,
            to: '+8801622869685', // Text this number
            from: '+19034874646'
        })
        .then((message) => console.log(message.sid));
    console.log("hello world");

})


app.get("/sendsms", (req, res) => {
    res.send("Hello world");
    sendSMS();
})

app.listen(port, function (error) {
    if (error) {
        console.log("Server fail");
    }
    else {
        console.log("Server Success");
    }
})