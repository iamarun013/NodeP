// Importing necessary modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// Creating an instance of express app
const app = express();
const PORT = 3000;

// Middleware to parse form data (urlencoded)
app.use(express.urlencoded({ extended: true }));

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

// Route to handle form submission (POST request to /submit)
app.post('/submit', (req, res) => {
    const userInput = req.body.inputText; // Grabbing the form data

    // Append the user input to the data.txt file
    fs.appendFile('data.txt', userInput + '\n', (err) => {
        if (err) {
            return res.status(500).send('Error saving data.');
        }
        console.log("Data saved successfully");
        // Send a success message and link to view the data
        res.send('Data received and saved successfully! <a href="/view-data">View Data</a>');
    });
});

// Route to display the contents of data.txt
app.get('/view-data', (req, res) => {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data.');
        }
        res.send(`<pre>${data}</pre>`);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});