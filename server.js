const express = require("express");
const path = require("path");
const app = express();

const route = require("./route.js");

app.use("/static", express.static(path.join(__dirname, "html")));
app.use((req, res, next) => {
  console.log("안녕!");
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "main.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "about.html"));
});

app.use("/", route);
app.use((req, res, next) => {
  res.status(404).send("일치하는 주소가 없습니다!!!");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("서버 에러!!!");
});

app.listen(8080, () => {
  console.log("Express App on port 8080!");
});
