import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import session from 'koa-session'
// import convert from 'koa-convert'
import serve from 'koa-static'
import cors from 'kcors'
// import finalHandler from './lib/middlewares/finalHandler'
import path from 'path'
import router from './router'
import mongoose from 'mongoose'

import config from './config'

const app = new Koa()

mongoose.Promise = global.Promise
mongoose.connect(config.mongoConfig.url, config.mongoConfig.opts)

app.keys = ['monkov-domon']
app.context.config = config

app.use(cors({
  maxAge: 7 * 24 * 60 * 60,
  credentials: true,
  allowMethods: 'GET, HEAD, PUT, POST, PATCH, DELETE',
  allowHeaders: 'Content-Type, Accept, Authorization'
}))
  .use(logger())
  .use(bodyParser())
  .use(session(app))
  .use(serve(path.join(__dirname, '/public')))
  .use(router.routes())
  .use(router.allowedMethods())

  

export default app
