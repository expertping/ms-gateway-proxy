var proxy = require('koa-better-http-proxy');

const Koa = require('koa');
const app = new Koa();
 
// response
app.use(async (ctx,next) => {
  return await proxy('www.baidu.com')();
});
 
app.listen(3000);