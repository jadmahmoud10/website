const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // or your local MySQL username
  password: 'JadmaHmoud@123456789!!!@@@###$$$', // or your local MySQL password
  database: 'school_admissions'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
});

module.exports = connection;
