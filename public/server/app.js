const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');



const app = express();

app.use(express.static('../../public'));
app.use(bodyParser.urlencoded({ extended: false }));

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Othman96#@!',
    database : 'fake_db',
});

db.connect((err) => {
    if(err) throw err;
    console.log('MySql is connected...')
});



app.post('/member', (req, res) => {
    const firstName = req.body.fname;
    const otherName = req.body.oname;
    const sirName = req.body.sname;
    const age = req.body.num;

    // let slct = document.getElementById('selectG');
    // slct.options[slct.selectedIndex].value;
    //  slct = req.body.selectbox;
    // const slct = req.body.selectbox.options[slct.selectedIndex].value;
    // slct = req.body.value;

    // const slct = {
        
    // }

    let sql = 'INSERT INTO Members(First_Name, Other_Name, Sir_Name, Age, Gender) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [firstName, otherName, sirName, age], (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('New mamber is added...');
    });


});

app.get('/list', (req, res) => {
    let sql = 'SELECT * FROM Members';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
});

app.delete('/list/:M_ID', (req, res) => {
    let sql = `DELETE FROM Members WHERE M_ID = ${req.params.M_ID}`;
    db.query(sql,[`${req.params.M_ID}`], (err, result) => {
        if(err) throw err;
        console.log(`${req.params.M_ID}`);
        res.json(`${req.params.M_ID}`);
    });

});




app.get('/', (req, res) => {
    res.send('hello world');
});





const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running in port ${port}...`));