/* DT207G - Backend-baserad webbutveckling
 * Moment 2
 * Linn Eriksson, VT24
 */

//Variables and dependecies
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

//Use JSON in API-calls.
app.use(express.json());

//Activate CORS middleware for all routes.
app.use(cors());

//All routes.

//Get /api
app.get("/api", (req, res) => {
    res.json({ message: "Welcome to the API." });
});

//Get /api/work
app.get("/api/work", (req, res) => {
    res.json({ message: "GET request to /api/work" });
});

//Post /api/work
app.post("/api/work", (req, res) => {
    res.json({ message: "POST request to /api/work" });
});

//Put /api/work/:id
app.put("/api/work/:id", (req, res) => {
    res.json({ message: "PUT request to /api/work/ with id: " + req.params.id });
});

//Delete /api/work/:id
app.delete("/api/work/:id", (req, res) => {
    res.json({ message: "DELETE request to api/work/ with id: " + req.params.id });
});

//Route not found
app.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found!" });
});

//Start server.
app.listen(port, () => {
    console.log("Server running on port: " + port);
});