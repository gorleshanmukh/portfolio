const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const https = require('https');

// set up the view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

const options = {
    key: fs.readFileSync('./private.key'),
    cert: fs.readFileSync('./certificate.crt')
};
// define a route to render the index.ejs page
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/.well-known/pki-validation/DAB3E16E46BE06051EE87426E023B821.txt', (req, res) => {
    const filePath = path.join(__dirname, 'DAB3E16E46BE06051EE87426E023B821.txt');

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.statusCode = 404;
            res.send('File not found');
            return;
        }

        // Read the contents of the file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.send('Internal server error');
                return;
            }

            // Set the appropriate headers
            const mimeType = 'text/plain';
            res.setHeader('Content-Type', mimeType);

            // Send the contents of the file as the response body
            res.send(data);
        });
    });
});
app.get('/.well-known/pki-validation/', (req, res) => {
    res.render('we');
});

// start the server
const port = process.env.PORT || 3000;
const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
