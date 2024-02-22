const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// MySQL Database Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'forms',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Express route to handle form submission
app.post('/submitForm', (req, res) => {
  const {
    employee_name,
    employee_id,
    department,
    dob,
    gender,
    designation,
    salary,
  } = req.body;

  // Your SQL query to insert data into the database
  const sql =
    'INSERT INTO employee (employee_name, employee_id, department, dob, gender, designation, salary) VALUES (?, ?, ?, ?, ?, ?, ?)';

  const values = [
    employee_name,
    employee_id,
    department,
    dob,
    gender,
    designation,
    salary,
  ];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Form submitted successfully' });
    }
  });
});

app.get('/getEmployees', (req, res) => {
    // Your SQL query to fetch employee data
    const sql = 'SELECT * FROM employee';
  
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error executing SQL query:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  app.delete('/deleteEmployee/:id', (req, res) => {
    const employeeId = req.params.id;
  

    const sql = 'DELETE FROM employee WHERE id = ?';
  
    connection.query(sql, [employeeId], (error, results) => {
      if (error) {
        console.error('Error executing SQL query:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Employee deleted successfully' });
      }
    });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
