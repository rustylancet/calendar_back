const Koa = require('koa');

const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors')   // npm i koa-cors 跨域访问
const errorHandler = require('./error-handle');
const userRouter = require('../router');
// 创建一个Koa对象表示web app本身:
const app = new Koa();

app.useRoutes = userRouter;
app.use(cors())
app.use(bodyParser());
app.useRoutes();
app.on('error', errorHandler);


module.exports = app;
