import jwt from 'jsonwebtoken'
import config from '../config'
import utils from '../utils'
import mw from '../middlewares'
import md5 from 'md5'
import User from '../models/user.js'

const cert = config.jwt.cert

export default async router => {
  await seed()
  router
    .post('/tokens', create)
    .get('/tokens/check', mw.verifyToken, check)
}

/**
 * create the admin account
 * @method seed
 * @return {Promise} [description]
 */
async function seed () {
  let user = await User
    .find()
    .exec().catch(err => {
      utils.logger.error(err)
      throw new Error('Data seed failed')
    })
  if (!user.length) {
    user = new User({
      name: 'admin',
      username: 'admin',
      password: md5('admin').toUpperCase(),
      avatar: '',
      createTime: new Date()
    })
    await user.save().exec().catch(err => {
      utils.logger.error(err)
      throw new Error('Data seed failed')
    })
  }
}

async function create (ctx, next) {
  const username = ctx.request.body.username
  const password = ctx.request.body.password
  let user = await User.findOne({username}).exec()
  if (user) {
    if (user.password === password) {
      const token = jwt.sign({
        uid: user._id,
        name: user.name,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60
      }, cert)
      ctx.status = 200
      ctx.body = {
        success: true,
        data: {
          uid: user._id,
          name: user.name,
          token
        }
      }
    } else { ctx.throw(500, 'invalid password') }
  } else { ctx.throw(500, 'invalid username') }
  await next()
}

async function check (ctx, next) {
  ctx.status = 200
  ctx.body = {
    success: true,
    message: 'Passed'
  }
  await next()
}
