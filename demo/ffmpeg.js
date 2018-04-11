const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);

// const filePath = './hello.mp3';
// var outStream = fs.createWriteStream('./output.wav')
// console.log('-----000-----')
// ffmpeg(filePath)
//   .on('error', function(err) {
//     console.log('An error occurred: ' + err.message);
//   })
//   .on('end', function() {
//     console.log('Processing finished !');
//   })
//   .pipe(outStream, { end: true });

ffmpeg('./rec_3s.mp3')
  // .audioCodec('libmp3lame')
  .format('wav')
  .audioFrequency(22050)
  .save('./output.wav');


// var command = FFmpeg('./hello.mp3')
// command.save('./output.wav');