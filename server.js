const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`HackHalt CIC server running at http://localhost:${PORT}`);
});
