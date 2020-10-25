const fs = require("fs");
// const https = require("https");
// const request = require("request");
let data = new Array();

console.log("started");

for (let index = 0; index < 20; index++) {
  let obj = {
    imgIndex: index,
    url: `https://source.unsplash.com/random/?nature,water,${index}`,
  };
  data.push(obj);
}

// console.log(data);
let imgData = JSON.stringify(data, null, "\t");
fs.writeFileSync("data.json", imgData, (err) => {
  console.log(err);
});
