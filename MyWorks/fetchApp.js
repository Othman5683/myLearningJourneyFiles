const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.get('/', (req, res) => {
    res.send('hello World');
});

app.post('/api/names', (req, res) => {

});


const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server is running in port ${port}...`));