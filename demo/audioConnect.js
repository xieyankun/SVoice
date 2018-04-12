const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const querystring = require('querystring');
const qs = require('qs')
const axios = require('axios');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);

// const md5 = require('md5')

/**
 * request web api
 */
const now = Date.parse(new Date()) / 1000;
const appid = '5ac97e19';
// const apiKey = '1166f498adf549bf9b5679c363df1925';  // AIUI
const apiKey = 'c33021172cc50532686ac48e59fc4727';    // old api



const param = {
  "auf": "audio/L16;rate=16000",
  "aue": "lame",
  "voice_name": "xiaoyan"
};
const paramBase64 = new Buffer(JSON.stringify(param)).toString('base64');
// const paramBase64 = new Buffer(JSON.stringify(param), 'base64').toString('hex');

const TEXT = '你好，见到你很好高兴';
const data = querystring.stringify({
  text: TEXT,
});


// const checkSum = md5(`${apiKey}${now}${paramBase64}text=${encodeURIComponent(TEXT)}`);
// const checkSum = md5(`${apiKey}${now}${paramBase64}text=${encodeURI(TEXT)}`);
const checkSum = md5(apiKey + now + paramBase64);


console.log('X-Appid', appid);
console.log('X-CurTime', now);
console.log('X-Param', paramBase64);
console.log('X-CheckSum', checkSum);


var request = require("request");
// 
// var request = require("request");

// var options = { method: 'POST',
//   url: 'http://api.xfyun.cn/v1/service/v1/tts',
//   headers: 
//    { 'postman-token': '8e9afee6-4630-3580-59f4-57f45597a7c9',
//      'cache-control': 'no-cache',
//      'x-checksum': '85d0b5f26312f33069d27aa834fec138',
//      'x-curtime': '1523456054',
//      'x-appid': '5ac97e19',
//      'x-param': 'eyJhdWYiOiJhdWRpby9MMTY7cmF0ZT0xNjAwMCIsImF1ZSI6InJhdyIsInZvaWNlX25hbWUiOiJ4aWFveWFuIn0=',
//      'content-type': 'application/x-www-form-urlencoded' },
//   form: { text: '你好' } };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });





// axios.post('http://api.xfyun.cn/v1/service/v1/tts', querystring.stringify({ 'text': 123 }), {
//   headers: {
//     'X-CurTime': now,
//     'X-Param': paramBase64,
//     'X-Appid': appid,
//     'X-CheckSum': checkSum,
//     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//   },
// }).then(data => {
//   console.log(' ========================================== ');
//   console.log(data.data);
//   console.log(' ========================================== ');
// }).catch(e => console.log('--------', e));

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
    'X-Real-Ip':'127.0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
}).then((res) => {
  console.log(' ========================================== ');
  // console.log(res); 
  fs.writeSync('audio.mp3', res.data); 
  console.log('成功'); 
  // ffmpeg(fs.createReadStream('/fileName.wav'))
  //   .format('mp3')
  //   // .audioFrequency(22050)
  //   .save('output.mp3')
  //   .on('error', function(err) {
  //     console.log('An error occurred: ' + err.message);
  //   })
  //   .on('end', function() {
  //     console.log('成功');
  //   });
  console.log(' ========================================== ');
}).catch(e => console.log('--------', e));


function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
}
