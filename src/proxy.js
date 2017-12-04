const noop = function(){}
const config = require('config')
const path = require('path');
require("../log")
const logger = require('@log4js-node/log4js-api').getLogger("proxy");
const proxy = require('koa-better-http-proxy');
const Koa = require('koa');
const app = new Koa();
const ws = require('./ws');
 
app.use(async (ctx, next) => {
  let a = ctx.request.header["ms-a"];
  let av = ctx.request.header["ms-av"];
  let s = ctx.request.header["ms-s"];
  let pms = new Promise((resolve, reject)=>{
    ws.send({
      a:a, av:av, s:s
    },data=>{
      if(data.status==0){
        resolve(data.url);
      }else resolve(null);
    })
  });
  let url = await pms;
  if(url)
    return await proxy(url)(ctx, next);
  else ctx.throw(400, new Error('no route found'));
});
 
app.listen(config.get("server.port"));