const mongoose = require('mongoose');                   
const express = require('express');  
const session = require('express-session')            
const bodyParser = require('body-parser');       
const path = require('path'); 
const router = require('./routes/apiRoutes.js')

const app = express();

const port = 3005;


// MongoDB connection URI and database name
const uri = process.env.MONGO_CONFIG || "mongodb://mongo:27017/"
mongoose.connect(uri, {'dbName': 'customerDB'});


app.use(session({
    cookie: {
        maxAge: 720000,
        httpOnly: true
    },
    secret: "itssecret",
    resave: false,
    saveUninitialized: true,
    
}))
// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serving static files from the 'frontend' directory under the '/static' route
app.use('/static', express.static(path.join(__dirname, 'frontend')));
app.get ('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'home.html'))
    })


// Middleware to handle URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('', router)


app.all("*", (req, res, next)=>{
	const err = new Error(`Cannot find the URL ${req.originalUrl} in this application. Please check.`);
	err.status = "Endpoint Failure";
	err.statusCode = 404;
	next(err);
})


app.use((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "Error";
    console.log(err.stack);
	res.status(err.statusCode).json({
		status: err.statusCode,
		message: err.message,
	});
})

// Starting the server and listening on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
