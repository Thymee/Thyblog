import utils from '../utils'
import mw from '../middlewares'
import Draft from '../models/draft.js'
// import Tag from '../models/tag.js'
// import Category from '../models/category.js'

export default router => {
  router
    .post('/drafts', mw.verifyToken, create)
    .patch('/drafts/:id', mw.verifyToken, modify)
    .get('/drafts', mw.verifyToken, draftList)
    .get('/drafts/:id', mw.verifyToken, draftDetail)
    .delete('/drafts/:id', mw.verifyToken, deleteDraft)
}

async function create (ctx, next) {
  const title = ctx.request.body.title
  const createTime = new Date()
  const lastEditTime = new Date()
  const excerpt = ''
  const content = ''
  const post = null
  const published = false
  !title && ctx.throw(400, 'Title Required')
  let draft = new Draft({
    title,
    createTime,
    lastEditTime,
    excerpt,
    content,
    post,
    published
  })
  await draft.save().catch(utils.internalErrHandler)
  ctx.status = 200
  ctx.body = {
    success: true,
    data: draft
  }
  await next()
}

async function draftList (ctx, next) {
  const tags = ctx.query.tags
  const category = ctx.query.category
  let findOpt = {}
  tags && Object.assign(findOpt, {
    tags: {
      '$all': [tags]
    }
  })
  category && Object.assign(findOpt, {category})
  const draftArr = await Draft
    .find(findOpt)
    .populate('tags category')
    .select('title tags category createTime lastEditTime excerpt post published')
    .sort({lastEditTime: -1})
    .exec().catch(utils.internalErrHandler)
  ctx.status = 200
  ctx.body = {
    success: true,
    data: draftArr
  }
  await next()
}

async function draftDetail (ctx, next) {
  const id = ctx.params.id
  let draft = await Draft
    .findById(id)
    .populate('tags category')
    .select('title tags category imagesrc createTime lastEditTime excerpt article draftPublished content')
    .exec().catch(utils.internalErrHandler)
  ctx.status = 200
  ctx.body = {
    success: true,
    data: draft
  }
  await next()
}

async function modify (ctx, next) {
  const id = ctx.params.id
  const modifyOpt = ctx.request.body
  // modify the excerpt if the content is modified
  if (modifyOpt.content) {
    const contentArr = modifyOpt.content.split('<!-- more -->')
    modifyOpt.excerpt = contentArr.length > 1
      ? contentArr[0]
      : ''
  }
  modifyOpt.lastEditTime = new Date()
  modifyOpt.published = false
  let result = await Draft
    .findByIdAndUpdate(id, {$set: modifyOpt}, {new: true})
    .populate('tags category')
    .exec().catch(utils.internalErrHandler)
  ctx.status = 200
  ctx.body = {
    success: true,
    data: result
  }
  await next()
}

async function deleteDraft (ctx, next) {
  const id = ctx.params.id
  const draft = await Draft
    .findById(id)
    .select('post')
    .exec().catch(utils.internalErrHandler)
  !draft && ctx.throw(400, 'draft not exist')
  // if the draft is published, it cannot be deleted
  // later I will add a function to delete published draft
  draft.post && ctx.throw(403, 'draft already published')
  await draft.remove().catch(utils.internalErrHandler)
  ctx.status = 200
  ctx.body = {
    success: true
  }
  await next()
}
