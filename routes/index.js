const router = require('koa-router')();
const voiceRoutes = require('./voice');

router.use(voiceRoutes.routes());

module.exports = router;
