const express = require("express");
const user = require("./user");
const router = express.Router(); // 라우터 분리
router.get("/", (req, res) => {
  // app 대신 라우터에 연결
  res.render("main"); //(3)
});
router.get("/about", (req, res) => {
  res.render("about"); //(4)
});

router.get("/:name", (req, res) => {
  user.find({ name: req.params.name }, (err, user) => {
    res.render("main", { user: user });
  });
});

// -------------회원 가입 ---------------

router.post("./api/users/register", (req, res) => {
  // post 요청을 처리해 응답을 주는 함수가 들어올 위치.
  // 회원가입할 때 필요한 정보들을 client에서 가져오면
  const user = new user.User(req.body);
  // 비밀번호를 암호화하여
  user.encryptPassword((err) => {
    // 그 것들을 데이터베이스에 넣어준다.
    user.save((err, userinfo) => {
      if (err) return res.json({ success: false, err });
      // 회원가입이 성공했다는 응답을 준다.
      return res.status(200).json({
        success: true,
      });
    });
  });
});

// ----------- 로그인 기능 ------------

router.post("/api/users/login", (req, res) => {
  // 요청된 이메일이 데이터베이스에 있는 지 확인한다.
  User.findOne({ email: req.body.email }, (err, user) => {
    // 이메일에 해당하는 유저가 데이터베이스에 없을 경우의 response
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다. By DK",
      });
    }

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      // 콜백함수
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸대. by DK",
        });
      }
      // 비밀번호가 맞다면 토큰을 생성한다.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // 토큰을 쿠키에 저장한다.
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userid: user._id });
      });
    });
  });
});

// ----------- 유저 인증 ----------------

router.get("/api/users/auth", auth, function (req, res) {
  // 미들웨어를 통과해서 여기까지 왔다는 것은 authentication이 성공했다는 의미
  res.status(200).json({
    // 이렇게 해놓으면 모든 페이지에서 유저 정보를 이용할 수 있음.
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

module.exports = router; // 모듈로 만드는 부분
