const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const querystring = require('querystring');
const axios = require('axios');

/**
 * request web api
 */
const now = Date.parse(new Date()) / 1000;
const appid = '5ac97e19';
const apiKey = 'c33021172cc50532686ac48e59fc4727';


const param = {
  "auf": "audio/L16;rate=16000",
  "aue": "raw",
  "voice_name": "xiaoyan"
};
const paramBase64 = new Buffer(JSON.stringify(param)).toString('base64');

const TEXT = 'hello kira';
const data = querystring.stringify({
  text: TEXT,
});

// const checkSum = md5(`${apiKey}${now}${paramBase64}text=${encodeURIComponent(TEXT)}`);
const checkSum = md5(`${apiKey}${now}${paramBase64}text=${encodeURI(TEXT)}`);

console.log('X-Appid', appid);
console.log('X-CurTime', now);
console.log('X-Param', paramBase64);
console.log('X-CheckSum', checkSum);


axios({
  method: 'post',
  url: '/v1/service/v1/tts',
  baseURL: 'http://api.xfyun.cn',
  data: data,
  headers: {
    'X-CurTime': now,
    'X-Param': paramBase64,
    'X-Appid': appid,
    'X-CheckSum': checkSum,
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
}).then((res) => {
  console.log('======', res.data);
}).catch(e => console.log('----', e));


function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
}
