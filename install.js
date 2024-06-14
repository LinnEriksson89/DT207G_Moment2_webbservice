/* DT207G - Backend-baserad webbutveckling
 * Moment 2
 * Linn Eriksson, VT24
 */

//Variables and required.
const mysql = require("mysql2");
require("dotenv").config();

const connect = mysql.createConnection ({
    host: process.env.DBHOST,
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE
});

//Drop and create table
connect.query("DROP TABLE IF EXISTS jobs;");

connect.query(`CREATE TABLE jobs(
        id INT(2) NOT NULL AUTO_INCREMENT,
        companyname VARCHAR(32) NOT NULL,
        jobtitle VARCHAR(64) NOT NULL,
        location VARCHAR(32) NOT NULL,
        startdate DATE NOT NULL,
        enddate DATE NOT NULL,
        description VARCHAR(128) NOT NULL,
        PRIMARY KEY(id)
    );`
);

//End connection.
connect.end();