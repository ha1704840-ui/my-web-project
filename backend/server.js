const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

// اتصال دیتابیس با Pool
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Hossein@1234",
  database: "resume_db",
});

// تست اتصال دیتابیس
db.getConnection((err, connection) => {
  if (err) console.error("DB CONNECT ERR:", err);
  else {
    console.log("DB connected (Pool)");
    connection.release();
  }
});

// Hero
app.get("/api/hero", (req, res) => {
  const sql = "SELECT * FROM hero LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0] || {});
  });
});

// About
app.get("/api/about", (req, res) => {
  const sql = "SELECT * FROM about LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0] || {});
  });
});

// گرفتن مهارت‌ها
app.get("/api/skills", (req, res) => {
  const sql = "SELECT * FROM skills ORDER BY id ASC";
  db.query(sql, (err, result) => {
    if (err) {
      console.log("Error fetching skills:", err);
      return res.status(500).json({ error: "Server error" });
    }
    res.json(result);
  });
});

// Contact form
app.post("/api/contact", (req, res) => {
  const { fullname, email, message } = req.body;

  if (!fullname || !email || !message)
    return res.status(400).json({ error: "تمام فیلدها الزامی هستند" });

  const sql = "INSERT INTO contact_messages (fullname, email, message) VALUES (?, ?, ?)";
  db.query(sql, [fullname, email, message], (err) => {
    if (err) return res.status(500).json({ error: "خطای ذخیره در دیتابیس" });
    res.json({ success: true, message: "پیام با موفقیت ذخیره شد" });
  });
});
// --------------------------------------------

// Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

