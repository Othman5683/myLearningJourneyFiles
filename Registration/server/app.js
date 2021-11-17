const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Othman96#@!',
    database : 'fake_db'
});
db.connect((err) => {
    if(err) throw err;
    console.log('MySql is connected...');
});

app.use(express.json()); 
app.use(express.static('../../Registration'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/getHello', (req, res) => {
    res.json('Hello Everyone,.!');
});

app.post('/addStudent', (req, res) => {
   const student = {
       firstName: req.body.firstName,
       otherName: req.body.otherName,
       sirName: req.body.sirName,
       age: req.body.age
   };
   res.json(student);

   let sql = "INSERT INTO students (First_Name, Other_Name, Sir_Name, Age) VALUES (?,?,?,?)";
   db.query(sql, [], function (err, result) {
       if(err) throw err;
       console.log(result.affectedRows);
   });
});

app.get('/getStudents', (req, res) => {
    res.json();
});

const port = process.env.PORT || 6060;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
}); 