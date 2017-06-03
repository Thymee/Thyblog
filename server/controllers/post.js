import Post from '../models/post.js'
import Tag from '../models/tag.js'
import Category from '../models/category.js'
import utils from '../utils'
import mw from '../middlewares'

export default router => {
  router
    .get('/posts', postlist)
    .post('/posts', mw.verifyToken, create)
    .get('/posts/:title', postDetail)
    .patch('/posts/:title', mw.verifyToken, modify)
}

let create = async(ctx, next) => {
  const {title, tags, content, excerpt} = ctx.request.body
  if (!title || !content) {
    ctx.throw(400, 'Title and content required')
  }
  const post = new Post({
    title,
    tags,
    content,
    excerpt,
    visit: 0,
    createTime: new Date(),
    lastEditTime: new Date(),
    comments: []
  })
  const result = await post.save().catch(utils.internalErrHandler)
  ctx.status = 200
  ctx.body = {
    success: true,
    data: result._id
  }
  await next()
}

let postlist = async(ctx, next) => {
  const tag = ctx.query.tag
  const category = ctx.query.category
  const limit = ~~ctx.query.limit || 10 // number of posts per page
  const page = ~~ctx.query.page || 1
  let skip = limit * (page - 1)
  let findOpt = {}
  if (tag) {
    let tagId = await Tag
      .findOne({name: tag})
      .exec().catch(utils.internalErrHandler)
    tagId = tagId.id
    Object.assign(findOpt, {
      tags: {
        '$all': [tagId]
      }
    })
  }
  if (category) {
    let catId = await Category
      .findOne({name: category})
      .exec().catch(utils.internalErrHandler())
    catId = catId.id
    Object.assign(findOpt, {category: catId})
  }
  const {postArr, totalNumber} = {
    postArr: await Post
      .find(findOpt)
      .populate('tags category')
      .select('title imagesrc category tags createTime excerpt')
      .sort({createTime: -1})
      .limit(limit)
      .skip(skip)
      .exec().catch(utils.internalErrHandler),
    totalNumber: await Post
      .find(findOpt)
      .count()
      .exec()
      .catch(utils.internalErrHandler)
  }
  ctx.status = 200
  ctx.body = {
    success: true,
    data: {
      postArr,
      totalNumber
    }
  }
  await next()
}

let postDetail = async(ctx, next) => {
  const title = ctx.params.title
  let post = await Post
    .findOne({title})
    .populate('tags category comments')
    .select('title imagesrc category tags createTime content comments')
    .exec().catch(utils.internalErrHandler)
  ctx.status = 200
  // also find the pre and next post
  if (post) {
    post = post.toObject();
    ({prevPost: post.prevPost, nextPost: post.nextPost} = {
      prevPost: await Post.findOne({
        _id: {
          $gt: post._id
        }
      }, 'title imagesrc _id')
        .exec().catch(utils.internalErrHandler),
      nextPost: await Post.findOne({
        _id: {
          $lt: post._id
        }
      }, 'title imagesrc _id')
        .sort({_id: -1})
        .exec().catch(utils.internalErrHandler)
    })
  }
  ctx.body = {
    success: true,
    data: post
  }
  await next()
}

let modify = async(ctx, next) => {
  const title = ctx.params.title
  let post = await Post.findAndUpdate({
    title
  }, {
    $set: ctx.request.body
  }, {new: true})
    .exec().catch(utils.internalErrHandler)
  ctx.status = 200
  ctx.body = {
    success: true,
    data: post
  }
  await next()
}
