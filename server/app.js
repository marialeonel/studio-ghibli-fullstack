require('dotenv').config();
const express = require('express');
const compression = require('compression');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const https = require('https');


const app = express();

//compression
app.use(compression());
app.use(express.static('build'));

//json
app.use(express.json());

//cors
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,POST,PUT,DELETE', 
    credentials: true 
}));

//HTTPS
const private_key = fs.readFileSync("./certificate/key.pem", "utf8");
const certificate = fs.readFileSync("./certificate/cert.pem", "utf8");
const credentials = {key: private_key, cert: certificate}

//routes
var loginRouter = require('./controllers/login');
var moviesRouter = require('./controllers/movies'); 
app.use('/auth', loginRouter);
app.use('/movie', moviesRouter);

// start
app.get('/', (req, res) => {
    res.status(200).json({msg: 'welcome to the 2024 studio ghibli api'});
})

// mongoose
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;

const https_server = https.createServer(credentials, app);

mongoose.connect(`mongodb+srv://${db_user}:${db_pass}@cluster0.7lmvhbi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
    //app.listen(3001);
    https_server.listen(3001);
    console.log("Database succesfully connected!");
})
.catch(err => console.log(err));


