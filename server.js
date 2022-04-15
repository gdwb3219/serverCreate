const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer((request, response) => {
    const path = url.parse(request.url, true).pathname; // url에서 path 추출
    if (request.method === "GET") {
      // GET 요청이면
      if (path === "/about") {
        // 주소가 /about 이면
        response.writeHead(200, { "Content-Type": "text/html" }); // Header 설정
        fs.readFile(__dirname + "/about.html", (err, data) => {
          // 파일 읽는 메소드
          if (err) {
            return console.error(err); // 에러 발생 시 에러 기록하고 종료
          }
          response.end(data, "utf-8"); // 브라우저로 전송
        });
      } else if (path === "/") {
        // 주소가 /이면
        response.writeHead(200, { "Content-Type": "text/html" });
        fs.readFile(__dirname + "/main.html", (err, data) => {
          if (err) {
            return console.error(err);
          }
          response.end(data, "utf-8");
        });
      } else {
        // 매칭되는 주소가 없으면
        response.statusCode = 404;
        response.end("주소가 없습니다.");
      }
    }

    // return request
    //   .on("error", (err) => {
    //     console.error(err);
    //   })
    //   .on("data", (data) => {
    //     console.log(data);
    //   })
    //   .on("end", () => {
    //     response.on("error", (err) => {
    //       console.error(err);
    //     });
    //     response.statusCode = 200;
    //     response.setHeader("Content-Type", "text/plain");
    //     response.write("hi\n");
    //     response.end("the end!");
    //   });
  })
  .listen(8080);
