require('dotenv').config();
const express = require('express');
const  helmet = require('helmet');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const signRouter = require("./routers/signRouter");
const appointmentRouter = require('./routers/appointmentRouter');
const serviceRouter = require('./routers/serviceRouter');
const professionalRouter = require('./routers/professionalRouter');

const app = express();

// app.use(cors()); 
app.use(helmet()); 
app.use(cookieParser()); 
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGO_URI).then(() =>{
  console.log('Database connected');
}).catch(err =>{
  console.log(err);
})

app.use(cors({
  origin: 'http://localhost:3000', //front http
  credentials: true
}));
app.use("/api/sign",signRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/services", serviceRouter);
app.use("/api/professionals", professionalRouter);

app.get('/', (req, res) => {
  res.json('Hello World');
});

app.listen(process.env.PORT,()=>{
    console.log('listening...')
});