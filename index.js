const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

// const accountSid = 'ACadc3ffb43cef495abeafebce2609c137'; // Your Account SID from www.twilio.com/console
// const authToken = '1069b3764bb73164952c4effb0259a96'; // Your Auth Token from www.twilio.com/console


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
    const {number,twilionumber,twilioSID,twilioauthtoken,templatemessage} = req.body;
    console.log(number);
    console.log(twilionumber);
    console.log(twilioSID);
    console.log(twilioauthtoken);
    console.log(templatemessage);
    let smsRecord = [];
    
    const client = new twilio(twilioSID, twilioauthtoken);
    client.messages
        .create({
            body: templatemessage,
            to: number, // Text this number
            from: twilionumber
        })
        .then(function(message){
            console.log("Number: ",number," and sid: ",message.sid)
            var messagesid = message.sid;
            res.send({ status: "Success", number, messagesid});
        });
    

})


app.post("/testinvercel",(req,res)=>{
    const { name, location } = req.body;
    res.josn({ status: "User created successfully by iqbal", name, location });
})

app.get("/sendsms", (req, res) => {
    res.send("Hello world by iqbal");
    // sendSMS();
})


app.listen(PORT, function (error) {
    if (error) {
        console.log("Server fail");
    }
    else {
        console.log(`Server Success ${PORT}`);
    }
})