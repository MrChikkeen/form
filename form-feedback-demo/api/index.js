const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const config = {
  user: "YOUR_SQL_USERNAME",
  password: "YOUR_SQL_PASSWORD",
  server: "YOUR_SQL_SERVER.database.windows.net",
  database: "YOUR_DATABASE_NAME",
  options: {
    encrypt: true
  }
};

app.post("/submit", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await sql.connect(config);
    await sql.query`
      INSERT INTO Feedback (Name, Email, Message)
      VALUES (${name}, ${email}, ${message})
    `;
    res.status(200).json({ message: "Gửi phản hồi thành công!" });
  } catch (err) {
    console.error("Lỗi:", err);
    res.status(500).json({ error: "Lỗi kết nối cơ sở dữ liệu." });
  }
});

module.exports = app;