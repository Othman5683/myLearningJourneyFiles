const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Othman96#@!',
    database : 'my_db',
});

db.connect((err) => {
    if(err) throw err;
    console.log('MySql connected...');
});

app.get('/createdb', (req, res) =>{
    let sql = 'CREATE DATABASE if not exists my_db';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created....');
    });
});

app.get('/friendsTable', (req, res) => {
    let sql = 'CREATE TABLE if not exists Friends (FriendID int AUTO_INCREMENT, First_Name varchar(255), Last_Name varchar(255), Age int, City varchar(255), Country varchar(255), PRIMARY KEY (FriendID))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table created...');
    });
});

//Posting data
app.get('/firstF', (req, res) => {
    let sql = 'INSERT INTO Friends (First_Name, Last_Name, Age, City, Country) VALUES ("Othman", "Jory", 25, "Arusha", "Tanzania")';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Data 1 is posted...');
    });
});

app.get('/secondF', (req, res) => {
    let sql = 'INSERT INTO Friends (First_Name, Last_Name, Age, City, Country) VALUES ("Ally", "Shabaan", 34, "Shinyanga", "Tanzania")';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Data 2 is posted...');
    });
});

app.get('/thirdF', (req, res) => {
    let sql = 'INSERT INTO Friends (First_Name, Last_Name, Age, City, Country) VALUES ("Daudi", "Mnana", 36, "Kigoma", "Tanzania")';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Data 3 is posted...');
    });
});

//Selecting
app.get('/selectFriends', (req, res) => {
    let sql = 'SELECT * FROM  Friends';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result); 
        res.send('All friends selected...');
    });
});

//Single friend
app.get('/selectFriends/:id', (req, res) => {
    let sql = `SELECT * FROM  Friends WHERE FriendID = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result); 
        res.send(`A friend with given ID is ${req.params.id}`);
    });
});
//Update
app.get('/updateFriends/:id', (req, res) => {
    // let Other_Name = 'updated last_Name';
    let sql = `UPDATE Friends SET Last_Name = "Muhammad" WHERE FriendID = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('friend updated..');
    });
});

app.get('/updateFriend/:id', (req, res) => {
    // let Other_Name = 'updated last_Name';
    let sql = 'UPDATE Friends SET Age = 18 WHERE Last_Name = "Muhammad"';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('friend updated..');
    });
});

//Delete
app.get('/deleteFriend/:id', (req, res) => {
    // let Other_Name = 'updated last_Name';
    let sql = `DELETE FROM Friends WHERE FriendID = "${req.params.id}"`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('friend Deleted..');
    });
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running in port ${port}...`));



