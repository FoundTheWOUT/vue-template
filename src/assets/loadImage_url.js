const fs = require("fs");
// const https = require("https");
const request = require("request");
const API_KEY = "";
const ImageNum = 20;

let data = new Array();
let promiseArr = new Array(ImageNum);

console.log("started");
function getImage() {
  return new Promise((resolve) => {
    request(
      `https://api.unsplash.com/photos/random/?client_id=${API_KEY}`,
      function (error, response, body) {
        // 请求完成之后的回调函数
        // console.log(body);
        let _body = JSON.parse(body);
        let obj = {
          id: _body.id,
          height: _body.height,
          width: _body.width,
          url: _body.urls.full,
        };
        // console.log(obj);
        resolve(obj);
      }
    );
  });
}

for (let index = 0; index < ImageNum; index++) {
  promiseArr.push(getImage());
}

// getImage().then((obj) => {
//   console.log(obj);
// });
Promise.all(promiseArr).then((v) => {
  console.log("get Finished");
  // console.log(data);
  data = JSON.stringify(v);
  fs.writeFileSync("data_url.json", data, (err) => {
    console.log(err);
  });
});
