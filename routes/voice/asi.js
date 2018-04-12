const router = require('koa-router')();
const multer = require('koa-multer');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const querystring = require('querystring');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);

//文件上传  
//配置  
var storage = multer.diskStorage({  
  //文件保存路径  
  destination: function (req, file, cb) {  
    cb(null, 'uploads/')  
  },  
  //修改文件名称  
  filename: function (req, file, cb) {  
    console.log('2--------------')
    var fileFormat = (file.originalname).split(".");  
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
  }  
})  
//加载配置  
var upload = multer({ storage: storage }); 

// 语音解析
router.post('/api/voice/asi/', upload.single('file'), async (ctx, next) => {
  console.log('1--------------', '/api/voice/asi')

  let outputFilePath = path.resolve('uploads/output.wav');

  try {
    await transformAuido({
      input: `uploads/${ctx.req.file.filename}`,
      output: outputFilePath,
    });
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 2,
      msg: 'transform audio failed!',
    }
    return;
  }

  const audioBase64 = new Buffer(fs.readFileSync(outputFilePath)).toString('base64');

  /**
   * request web api
   */
  const now = Date.parse(new Date()) / 1000;
  
  const appid = '5ac97e19';
  const apiKey = '1166f498adf549bf9b5679c363df1925';

  const paramBase64 = new Buffer(JSON.stringify({
    "auf":"16k",
    "aue":"raw",
    "scene":"main",
  })).toString('base64');

  const data = querystring.stringify({
    data: audioBase64,
  });
  const checkSum = md5(`${apiKey}${now}${paramBase64}data=${audioBase64}`);

  let resultData;

  try {
    resultData = await new Promise((resolve, reject) => {
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
        resolve(res.data.data)
      }).catch(e => reject(e));
    });
  } catch (error) {
    console.log(error);
  }

  ctx.body = {
    code: 0,
    msg: 'success',
    data: resultData//返回文件名 
  }
});

function transformAuido({ input, output, audioFrequency, format }) {
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      // .audioCodec('libmp3lame')
      .format(format || 'wav')
      .audioFrequency(audioFrequency || 22050)
      .save(output)
      .on('error', function(err) {
        console.log('An error occurred: ' + err.message);
      })
      .on('end', function() {
        resolve();
      });
  });
}


function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
}



module.exports = router;
