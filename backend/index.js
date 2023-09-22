const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://192.168.0.109:8081",
    credentials: true,
  })
);

// MySQL connection configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "registration",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});
app.use(express.urlencoded({ extended: false }));

db.query("SELECT * FROM Signup", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

app.get("/api/data", (req, res) => {
  const query = "SELECT * FROM Signup";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// Create a new user
app.post("/api/data", async (req, res) => {
  console.log("Received POST request");
  console.log("Request Body:", req.body);
  const { Username, emailAddress, password, cpassword } = req.body;
  const query = `INSERT INTO Signup (Username, emailAddress, password, cpassword) VALUES ('${Username}', '${emailAddress}', '${password}', '${cpassword}')`;
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "User created", userId: result.insertId });
    }
  });
});

// Login
app.post("/api/login", async (req, res) => {
  console.log("Received POST request");
  console.log("Request Body:", req.body);
  
  const { username, password } = req.body;
  const query = `SELECT * FROM Signup WHERE Username='${username}' AND password='${password}'`;
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.length === 0) {
        res.status(401).json({ error: "Incorrect username or password" });
      } else {
        res.json({ message: "Login successful" });
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
