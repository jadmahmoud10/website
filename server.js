const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer'); // For handling file uploads
const mysql = require('mysql2'); // Use mysql2 for better compatibility
const app = express();
const port = 3000;

// Configure body parser and multer
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'school_admissions'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the database!');
});

// Serve static files
app.use(express.static('public'));

// Route for handling form submission
app.post('/submit-application', upload.single('identityPhoto'), (req, res) => {
    const { firstName, lastName } = req.body;
    const identityPhoto = req.file.path;

    // SQL query to insert data into the database
    const sql = `INSERT INTO 2024_2025_admissions (first_name, last_name, identity_photo) VALUES (?, ?, ?)`;
    db.query(sql, [firstName, lastName, identityPhoto], (err, result) => {
        if (err) throw err;
        res.send('Application submitted successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Route to get all applications
app.get('/get-applications', (req, res) => {
    const sql = 'SELECT * FROM 2024_2025_admissions';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Route to edit an application
app.get('/edit-application/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM 2024_2025_admissions WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// Route to update an application (POST method)
app.post('/update-application/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    const sql = 'UPDATE 2024_2025_admissions SET first_name = ?, last_name = ? WHERE id = ?';
    db.query(sql, [firstName, lastName, id], (err, result) => {
        if (err) throw err;
        res.send('Application updated successfully!');
    });
});

// Route to delete an application
app.get('/delete-application/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM 2024_2025_admissions WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('Application deleted successfully!');
    });
});
