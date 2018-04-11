const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const querystring = require('querystring');

/**
 * wav file
 */
const filePath = './output.wav';
const audioBase64 = new Buffer(fs.readFileSync(filePath)).toString('base64');

/**
 * request web api
 */
const now = Date.parse(new Date()) / 1000;
const appid = '5ac439b9';
const apiKey = '7f09523173d048c685e51fdf7be28138';

// const appid = '5ac97e19';
// const apiKey = '1166f498adf549bf9b5679c363df1925';

const paramBase64 = new Buffer(JSON.stringify({
  "auf":"16k",
  "aue":"raw",
  "scene":"main",
})).toString('base64');

const data = querystring.stringify({
  data: audioBase64,
});
const checkSum = md5(`${apiKey}${now}${paramBase64}data=${audioBase64}`);

console.log('X-Appid', appid);
console.log('X-CurTime', now);
console.log('X-Param', paramBase64);
console.log('X-CheckSum', checkSum);

axios({
  method: 'post',
  url: '/v1/aiui/v1/iat',
  baseURL: 'http://api.xfyun.cn',
  data,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Appid': appid,
    'X-CurTime': now,
    'X-Param': paramBase64,
    'X-CheckSum': checkSum,
  },
}).then((res) => {
  console.log(res.data);
}).catch(e => console.log(e));


function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
}
