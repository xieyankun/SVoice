const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
const index = require('./routes');

// routes
app.use(index.routes());

app.listen(3008);


// const path = require('path');
// const Koa = require('koa');
// const app = new Koa();
// const router = require('koa-router')();
// // const route = require('./routes');

// // router.use(views(__dirname + '/views'));

// router.get('/', async (ctx, next) => {
//   console.log('--------------')
//   ctx.body = `<form action="">
//               <input type="file">
//             </form>`;
//     // await ctx.render('views/upload.html');
// });

// // routes
// app.use(route.routes(), route.allowedMethods());

// console.log(app.env)

// app.listen(3008);
