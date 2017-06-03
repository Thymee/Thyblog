import utils from '../utils'
import mw from '../middlewares'
import Draft from '../models/draft.js'
import Post from '../models/post.js'

export default router => router.post('/publication', mw.verifyToken, publish)

async function publish (ctx, next) {
  const id = ctx.request.body.id
  const draft = await Draft
    .findById(id)
    .exec().catch(utils.internalErrHandler)
  if (!draft.title.length || !draft.excerpt.length || !draft.content.length) {
    ctx.throw(400, 'title, excerpt and content required')
  }
  draft.published = true
  draft.lastEditTime = new Date()
  // delete extra data
  const postObj = draft.toObject()
  delete postObj._id
  delete postObj.id
  delete postObj.published
  delete postObj.post
  let post
  /**
   * if draft has been publish before, update the post
   * else create new post
   */
  if (draft.post) {
    delete postObj.createTime
    post = await Post
      .findByIdAndUpdate(draft.post, {$set: postObj}, {new: true})
      .populate('tags category')
      .exec().catch(utils.internalErrHandler)
  } else {
    postObj.createTime = postObj.lastEditTime
    delete postObj.lastEditTime
    postObj.visit = 0
    postObj.comments = []
    post = await new Post(postObj).save().catch(utils.internalErrHandler)
    draft.post = post.id
  }
  draft.save().catch(utils.internalErrHandler)
  ctx.status = 200
  ctx.body = {
    success: true,
    data: post
  }
  await next()
}
