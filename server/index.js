import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import twilio from "twilio";
import userRoutes from './routes/user.js';
import videoRoutes from "./routes/video.js"
import commentRoutes from './routes/comments.js'
import path from "path"
import { videocallServer } from "./serversignal.js";
import { createClient } from "redis";
// import admin from "firebase-admin"
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

dotenv.config();

const app = express();
const dbUrl = process.env.ATLASDB_URL;

main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.error("Database connection error:", err);
});

async function main() {
    mongoose.connect(dbUrl);
}

app.listen(4040, () => {
    console.log("Listening to port 4040");
});

app.get('/', (req,res)=>
{
    res.send("Playin is running")
})

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/video', videoRoutes);
app.use('/comment', commentRoutes);
app.use(express.json({limit:"500mb",extended:true}))
app.use(express.urlencoded({limit:"500mb",extended:true}))
app.use('/uploads', express.static(path.join("uploads")))


// const firebaseConfig = {
//     apiKey: process.env.FIRE_API,
//     authDomain: process.env.FIRE_AUTH,
//     projectId: process.env.FIRE_PROJECT_ID,
//     storageBucket: process.env.FIRE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIRE_MESSAGE_ID,
//     appId: process.env.FIRE_APP,
//     measurementId: process.env.FIRE_MEASUREMENT_ID
//   };

//   const aPP = initializeApp(firebaseConfig);
// const analytics = getAnalytics(aPP);


const redisClient = createClient({
    password: process.env.REDIS_PASS,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        reconnectStrategy: retries => Math.min(retries * 50, 2000),
    }
});

redisClient.on('error',(err)=>console.error('Redis Client Error', err.message))
await redisClient.connect();
console.log('Connected to Redis');


const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

const email=nodemailer.createTransport({
    service:'gmail',
    auth:
    {
user:process.env.EMAIL_USER,
pass:process.env.EMAIL_PASS

    }
})

// admin.initializeApp({
//     credential:admin.credential.cert({
//         type:process.env.FIRE_TYPE,

//   project_id: process.env.FIRE_PRIVATE_KEY_ID,
//   private_key_id: process.env.FIRE_PRIVATE_KEY,
//   private_key: process.env.FIRE_PRIVATE_KEY,
//   client_email: process.env.FIRE_CLIENT_EMAIL,
//   client_id: process.env.FIRE_CLIENT_ID,
//   auth_uri: process.env.FIRE_AUTH_URI,
//   token_uri: process.env.FIRE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FIRE_AUTH_PROVIDER_CERT_URL,
//   client_x509_cert_url: process.env.FIRE_CLIENT_CERT_URL,
//   universe_domain: process.env.UNIVERSE_DOMAIN
        
//     })
// })
// const auth=admin.auth();

app.post('/send/email', async(req,res)=>
{
    const {email}=req.body
    const otp= Math.floor(100000+Math.random()*900000).toString()

    const mailOptions={
        from:process.env.EMAIL_USER,
        to:email,
        subject:'Your OTP',
        otp:`Your OTP is ${otp}`
    }

    try
    {
        await email.sendMail(mailOptions)
        await redisClient.set(email,otp,{EX:30})

        res.status(200).json({message:'OTP send to email'});

    }
    catch(error)
    {
        res.status(500).json({message:'Error sending OTP', error})
    }
})

app.post('/send/number', async(req,res)=>
{
    let {phoneNumber}=req.body
  if(!phoneNumber.startsWith('+91'))
  {
    phoneNumber=`+91${phoneNumber}`
  }
    const otp= Math.floor(100000+Math.random()*900000).toString()
    console.log(`Recived PhoneNumber ${phoneNumber}`)
    console.log(`Generaated OTP ${otp}`)

    try {
        await client.messages.create({
            body:`Your OTP is${otp}`,
        
            from:process.env.TWILIO_PHONE_NUMBER,
            to:phoneNumber
        })
// const sessionInfo= await auth.createSessionInfo(phoneNumber);
        await redisClient.set(phoneNumber, otp,{EX:300},)
        
        res.status(200).json({message:"OTP sent to phone Number"})
    } catch (error) {
        console.error('Error sending message', error.message)
        res.status(500).json({message:'Error sending messages', error:error.message}) 
       
       
    }
   
})

app.post('/verify/otp',  (req, res) => {
  const { identifier, otp } = req.body;
  console.log('Received OTP:', otp);
  console.log('Identifier:', identifier);
res.send("Redis client connecting but the set method is not working, Not able to configure the error")
  // try {
 
  //   const storedOtp = await redisClient.get(identifier);

  //   if (!storedOtp) {
  //     console.log('OTP not found for identifier:', identifier);
  //     return res.status(400).json({ message: "Session Expired or Invalid" });
  //   }

  //   if (storedOtp === otp) {
  //     console.log('OTP verified successfully');
  //     return res.status(200).json({ success: true, message: "OTP verified successfully" });
  //   } else {
  //     console.log('Invalid OTP. Expected:', storedOtp, 'Received:', otp);
  //     return res.status(400).json({ message: "Invalid OTP" });
  //   }
  // } catch (error) {
  //   console.error('Error Verifying OTP:', error.message);
  //   return res.status(500).json({ message: "Error Verifying OTP", error: error.message });
  // }
});


  


videocallServer();