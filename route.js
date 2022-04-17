const express = require("express");
const user = require("./user");
// const path = require("path");
const router = express.Router(); // 라우터 분리
router.get("/", (req, res) => {
  // app 대신 라우터에 연결
  // res.sendFile(path.join(__dirname, "html", "main.html"));
  res.render("main"); //(3)
});
router.get("/about", (req, res) => {
  // res.sendFile(path.join(__dirname, "html", "about.html"));
  res.render("about"); //(4)
});

router.get("/:name", (req, res) => {
  user.find({ name: req.params.name }, (err, user) => {
    res.render("main", { user: user });
  });
});

module.exports = router; // 모듈로 만드는 부분
