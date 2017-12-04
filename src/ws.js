const noop = function(){}
const config = require('config')
const path = require('path');
const logger = require('@log4js-node/log4js-api').getLogger(path.relative(process.cwd(),module.id));
const cuid = require("cuid")
const WebSocket = require('ws');

const ws = new WebSocket(config.get("reg-server.path"));

var callbacks = {};

ws.on('open', function open() {
 logger.info('connected');
});

ws.on('close', function close() {
 logger.info('disconnected');
});

ws.on('message', function incoming(data) {
 logger.debug(`msg received: ${data}`);
 let obj = null;
 try{
     obj = JSON.parse(data);
 }catch(e){
     obj = {status:1, msg:"响应内容格式错误"};
 }
 if(obj && typeof callbacks[obj.opsid] == "function"){
    callbacks[obj.opsid](obj);
    callbacks[obj.opsid] = undefined;
 }
});

exports.send = function(data, cb){
    if(!data) return;
    data.opsid = cuid();
    logger.debug("sending: ", data);
    ws.send(JSON.stringify(data));
    callbacks[data.opsid] = cb;
}