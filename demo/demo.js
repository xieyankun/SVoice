var qs = require("querystring");
var http = require("http");

var options = {
  "method": "POST",
  "hostname": "api.xfyun.cn",
  "port": null,
  "path": "/v1/service/v1/tts",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "x-param": "eyJhdWYiOiJhdWRpby9MMTY7cmF0ZT0xNjAwMCIsImF1ZSI6InJhdyIsInZvaWNlX25hbWUiOiJ4aWFveWFuIn0=",
    "x-appid": "5ac97e19",
    "x-curtime": "1523456054",
    "x-checksum": "85d0b5f26312f33069d27aa834fec138",
    "cache-control": "no-cache",
    "postman-token": "6128d31b-41e2-cc0e-1804-aace70e5307d"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(qs.stringify({ text: '你好' }));
req.end();