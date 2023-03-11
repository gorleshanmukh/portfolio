const express = require('express');
const app = express();
const path = require('path');

// set up the view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


// define a route to render the index.ejs page
app.get('/', (req, res) => {
    res.render('index');
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
