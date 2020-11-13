const Koa = require('koa')
const koaBody = require('koa-body');
const app = new Koa();
const path = require('path')
const router = require('./router')
const config = require('./config')
const {
  port
} = config
app.use(koaBody({
  multipart: true, // 支持文件上传
  "formLimit": "10mb",
  "jsonLimit": "10mb",
  "textLimit": "10mb",
  // encoding: 'gzip',
  formidable: {
    //   uploadDir: path.join(__dirname, 'public/upload'), // 设置文件上传目录
    keepExtensions: true, // 保持文件的后缀
    maxFileSize: 50 * 1024 * 1024, // 文件上传大小
  }
}));


app.use(router.routes())
app.use(async (ctx) => {
  ctx.body =
    `
use POST /upload
use POST /register
use POST /login
use POST /deploy
`
});
const startApp = (port) => {
  app.listen(port, () => {
    console.log(`server running at: http://localhost:${port}`)
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`port ${port} in use, use another port: ${port}`)
      setTimeout(() => {
        startApp(++port)
      }, 200)
    }
  })
}
startApp(port)