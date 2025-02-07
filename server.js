/* DT207G - Backend-baserad webbutveckling
 * Moment 2
 * Linn Eriksson, VT24
 */

//Variables and dependecies
const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const port = process.env.PORT || 4000;
require("dotenv").config();

//Use JSON in API-calls.
app.use(express.json());

//Activate CORS middleware for all routes.
app.use(cors({
    methods: "GET, PUT, POST, DELETE"
}));

//To be able to send data with post.
app.use(express.urlencoded({extended:true}));

//Connect to database
const connect = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE
});

connect.connect((err) => {
    if(err) {
        //If there's a connection error.
        console.log("Connection failed: " + err);
        return;
    }

    console.log("Connected to database");
});

//All routes.
//Get /api
app.get("/api", (req, res) => {
    res.json({ message: "Welcome to the API." });
});

//Get /api/work
app.get("/api/work", (req, res) => {

    //Get jobs.
    connect.query(`SELECT id, companyname, jobtitle, location, DATE_FORMAT(startdate, "%Y-%m-%d") AS startdate, DATE_FORMAT(enddate, "%Y-%m-%d") AS enddate, description FROM jobs;`, (err, result) => {
        if(err) {
            res.status(500).json({error: "Something went wrong: " + err})
            return;
        }

        if(result.length === 0){
            res.status(404).json({message: "No users found."});
        } else {
            res.json(result);
        }
    });
});

//Get individual job via /api/work/id
app.get("/api/work/:id", (req, res) => {

    let id = req.params.id;

    //Get jobs.
    connect.query(`SELECT id, companyname, jobtitle, location, DATE_FORMAT(startdate, "%Y-%m-%d") AS startdate, DATE_FORMAT(enddate, "%Y-%m-%d") AS enddate, description FROM jobs WHERE id=?;`, id, (err, result) => {
        if(err) {
            res.status(500).json({error: "Something went wrong: " + err})
            return;
        }

        if(result.length === 0){
            res.status(404).json({message: "No users found."});
        } else {
            res.json(result);
        }
    });
});

//Post /api/work
app.post("/api/work", (req, res) => {
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    let error = {
        message: "",
        details: "",
        https_response: {}
    };

    //If any fields of information are empty.
    if(!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        
        //Error messages and response code.
        error.message = "Information not included in request!";
        error.details = "Adding a job requires company name, job title, location, start date, end date and description.";
        error.https_response.message = "Bad Request";
        error.https_response.code = 400;
        
        //Send error-message and return.
        res.status(400).json(error);
        return;
    } else if (companyname.length < 4 || companyname.length > 32) {
        //If companyname is too short or too long.
        error.message = "Incorrect information.";
        error.details = "Company name has to be between 4-32 characters long.";
        error.https_response.message = "Bad request";
        error.https_response.code = 400;

        //Send error-message and return.
        res.status(400).json(error);
        return;
    } else if (jobtitle.length < 4 || jobtitle.length > 64) {
        //If job title is too short or too long.
        error.message = "Incorrect information.";
        error.details = "Job title has to be between 4-64 characters long.";
        error.https_response.message = "Bad request";
        error.https_response.code = 400;

        //Send error-message and return.
        res.status(400).json(error);
        return;
    } else if (location.length < 4 || location.length > 32) {
        //If location is too short or too long.
        error.message = "Incorrect information.";
        error.details = "Location has to be between 4-32 characters long.";
        error.https_response.message = "Bad request";
        error.https_response.code = 400;
        
        //Send error-message and return.
        res.status(400).json(error);
        return;
    } else if (description.length < 10 || description.length > 128) {
        //If description is too short or too long.
        error.message = "Incorrect information.";
        error.details = "Description has to be between 4-32 characters long.";
        error.https_response.message = "Bad request";
        error.https_response.code = 400;

        //Send error-message and return.
        res.status(400).json(error);
        return;
    }

    //Create and run query.
    connect.query(`INSERT INTO jobs VALUES(?, ?, ?, ?, ?, ?, ?);`, [null, companyname, jobtitle, location, startdate, enddate, description], (err, result) => {
        //Error-handling
        if(err) {
            res.status(500).json({error: "Something went wrong: " + err})
            return;
        }

        //Create job-object
        let job = {
            companyname: companyname,
            jobtitle: jobtitle,
            location: location,
            startdate: startdate,
            enddate: enddate,
            description: description
        }

        //Show message on completion.
        res.status(201).json({ message: "Job added: ", job });
    });
});

//Put /api/work/:id
app.put("/api/work/:id", (req, res) => {    
    let id = req.params.id;
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    let error = {
        message: "",
        details: "",
        https_response: {}
    };

    //If any fields of information are empty.
    if(!id || !companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        
        //Error messages and response code.
        error.message = "Information not included in request!";
        error.details = "Updating a job requires id, company name, job title, location, start date, end date and description.";
        error.https_response.message = "Bad Request";
        error.https_response.code = 400;
        
        //Send error-message and return.
        res.status(400).json(error);
        return;
    } else if (companyname.length < 4 || companyname.length > 32) {
        //If companyname is too short or too long.
        error.message = "Incorrect information.";
        error.details = "Company name has to be between 4-32 characters long.";
        error.https_response.message = "Bad request";
        error.https_response.code = 400;
        
        //Send error-message and return.
        res.status(400).json(error);
        return;
    } else if (jobtitle.length < 4 || jobtitle.length > 64) {
        //If job title is too short or too long.
        error.message = "Incorrect information.";
        error.details = "Job title has to be between 4-64 characters long.";
        error.https_response.message = "Bad request";
        error.https_response.code = 400;

        //Send error-message and return.
        res.status(400).json(error);
        return;
    } else if (location.length < 4 || location.length > 32) {
        //If location is too short or too long.
        error.message = "Incorrect information.";
        error.details = "Location has to be between 4-32 characters long.";
        error.https_response.message = "Bad request";
        error.https_response.code = 400;
        
        //Send error-message and return.
        res.status(400).json(error);
        return;
    } else if (description.length < 10 || description.length > 128) {
        //If description is too short or too long.
        error.message = "Incorrect information.";
        error.details = "Description has to be between 4-32 characters long.";
        error.https_response.message = "Bad request";
        error.https_response.code = 400;
        
        //Send error-message and return.
        res.status(400).json(error);
        return;
    }

    //Create and run query.
    connect.query(`UPDATE jobs SET companyname = ?, jobtitle = ?, location = ?, startdate = ?, enddate = ?, description = ? WHERE id=?;`, [companyname, jobtitle, location, startdate, enddate, description, id], (err, result) => {
        //Error-handling
        if(err) {
            res.status(500).json({error: "Something went wrong: " + err})
            return;
        }

        //Create job-object
        let job = {
            id: id,
            companyname: companyname,
            jobtitle: jobtitle,
            location: location,
            startdate: startdate,
            enddate: enddate,
            description: description
        }
                        
        //Show message on completion.
        res.json({ message: "Job updated: ", job });
    });
});

//Delete /api/work/:id
app.delete("/api/work/:id", (req, res) => {
    let id = req.params.id;

    connect.query(`DELETE FROM jobs WHERE id=?;`, id,  (err, result) => {
        if(err) {
            res.status(500).json({error: "Something went wrong: " + err})
            return;
        } else {
            res.status(200).json({ message: "Job with id " + id + " deleted."});
        }
    });
});

//Route not found
app.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found!" });
});

//Start server.
app.listen(port, () => {
    console.log("Server running on port: " + port);
});