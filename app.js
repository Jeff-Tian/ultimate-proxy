const Koa = require('koa');
const app = new Koa();
const request = require('request');
const router = require('koa-router')();
var bodyParser = require('koa-body-parser');

app.use(bodyParser());

router
    .get('/healthcheck', async ctx => {
        ctx.body = 'everything is ok';
    })
    .post('/proxy', async ctx => {
        console.log(ctx.request.body);
        ctx.body = await request(ctx.request.body);
    });

app
    .use(router.routes())
    .use(router.allowedMethods());

let port = process.env.PORT || 9999;
app.listen(port);