const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();


app.use(express.static('../Testing'));
app.use(bodyParser.urlencoded({ extended: false }));

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Othman96#@!',
    database : 'fake_db'
});
db.connect((err) => {
    if (err) throw err;
    console.log('MySql is connected...');
});

app.post('/api/students', (req, res) => {
    const firstName = req.body.fn;
    const otherName = req.body.on;
    const sirName = req.body.sr;
    const age = req.body.num;

    let sql = 'INSERT INTO students(First_Name, Other_Name, Sir_Name, Age) values(?,?,?,?)';
    db.query(sql, [firstName, otherName, sirName, age], (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('A new student is added.');
    });
}); 

app.get('/api/list', (req, res) => {
    let sql = 'SELECT * FROM students';
    db.query(sql, (err, result) => {
        if(err) throw err;
        // console.log(result);
    }); 
});


app.get('/', (req, res) => {
    res.send('Hello Everyone,!.');
});

const port = process.env.PORT || 5555;
app.listen(port, () => console.log(`The server is running in port ${port}`));