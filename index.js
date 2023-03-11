const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// set up the view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


// define a route to render the index.ejs page
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/.well-known/.pki-validation', (req, res) => {
    const filePath = path.join(__dirname, 'DAB3E16E46BE06051EE87426E023B821.txt');

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.statusCode = 404;
            res.send('File not found');
            return;
        }

        // Determine the MIME type of the file
        const mimeType = 'text/plain';

        // Set the appropriate headers
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Disposition', 'attachment; filename="DAB3E16E46BE06051EE87426E023B821.txt"');

        // Stream the file to the response
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});
app.get('/.well-known/pki-validation/', (req, res) => {
    res.render('we');
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
