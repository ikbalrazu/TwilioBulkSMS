const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
// const cors=require("cors");
// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }

// app.use(cors({ origin: "https://bulksmsfrontend.netlify.app", credentials: false }));

// app.use(cors(corsOptions))
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
    const {phonenumber,twilionumber,twilioSID,twilioauthtoken,templatemessage} = req.body;
    console.log(phonenumber);
    console.log(twilionumber);
    console.log(twilioSID);
    console.log(twilioauthtoken);
    console.log(templatemessage);
    for(let i=0;i<phonenumber.length;i++){
        const client = new twilio(twilioSID, twilioauthtoken);
        client.messages.create({
            body: templatemessage,
            to:phonenumber[i],
            from: twilionumber
        })
        .then(function(message){
            console.log(message.sid);
            //var messagesid = message.sid;
            res.json({status: "SMS Send Successfully", phonenumber: phonenumber[i], twilionumber, twilioSID, twilioauthtoken, templatemessage});
        });
    }
    // const client = new twilio(twilioSID, twilioauthtoken);
    // client.messages
    //     .create({
    //         body: message,
    //         to: phonenumber, // Text this number
    //         from: twilionumber
    //     })
    //     .then((message) => console.log(message.sid));
    // console.log("hello world");
    //res.send({ status: "SMS Send Successfully", phonenumber, twilionumber, twilioSID, twilioauthtoken, templatemessage});

})


app.post("/testinvercel",(req,res)=>{
    const { name, location } = req.body;
    res.josn({ status: "User created successfully by iqbal", name, location });
})

app.get("/sendsms", (req, res) => {
    res.send("Hello world by iqbal");
    // sendSMS();
})


app.listen(port, function (error) {
    if (error) {
        console.log("Server fail");
    }
    else {
        console.log("Server Success");
    }
})