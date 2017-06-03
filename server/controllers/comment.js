import utils from '../utils'
import mw from '../middlewares'
import Comment from '../models/comment.js'
import Post from '../models/post.js'
export default router => {
  router
    .post('/comments', postComments)
    .patch('/comments/:id', mw.verifyToken, modifyComments)
    .delete('/comments/:id', mw.verifyToken, deleteComments)
}

async function postComments(ctx, next) {
  const user = ctx.request.body.user
  const content = ctx.request.body.content
  const postTitle = ctx.request.body.postTitle
  const replyTo = ctx.request.body.replyTo || 0
  const createTime = Date.now()
  if (!user || !content || !postTitle) {
    ctx.throw('400', 'author, content, postId required')
  }
  let comment = new Comment({
    user,
    content,
    createTime,
    replyTo
  })
  await comment.save().catch(utils.internalErrHandler)
  await Post.findOneAndUpdate({
    title: postTitle
  }, {
    $push: {
      comments: comment.id
    }
  }).exec().catch(utils.internalErrHandler)
  ctx.status = 200
  ctx.body = {
    success: true,
    data: comment
  }
  await next()
}

async function deleteComments(ctx, next) {
  await next()
}

async function modifyComments(ctx, next) {
  await next()
}
