import Category from '../models/category.js'
import Post from '../models/post.js'
import Draft from '../models/draft.js'
import utils from '../utils'
import mw from '../middlewares'
export default router => {
  router
    .post('/categories', mw.verifyToken, create)
    .get('/categories', allCategory)
    .patch('/categories/:id', mw.verifyToken, modify)
    .delete('/categories/:id', mw.verifyToken, deleteCat)
}

async function allCategory (ctx, next) {
  const categories = await Category
    .find()
    .populate('sub')
    .exec().catch(utils.internalErrHandler)
  ctx.status = 200
  ctx.body = {
    success: true,
    data: categories
  }
  await next()
  // let result = []
  // let categories = await Post
  //   .aggregate([
  //   {
  //     '$group': {
  //       _id: '$category',
  //       count: {
  //         '$sum': 1
  //       }
  //     }
  //   }
  // ])
  //   .exec()
  //   .catch(utils.internalErrHandler);
  // await Promise.all(categories.map(async(cat) => {
  //   const res = await Category
  //     .findById(cat._id)
  //     .populate('sub')
  //     .select('name sub')
  //     .exec()
  //     .catch(utils.internalErrHandler);
  //   cat.name = res
  //     ? res.name
  //     : 'Uncategoried'
  //   cat.sub = res
  //     ? res.sub
  //     : ''
  //   result.push(cat)
  // }))
  // let orderedResult = result.slice()
  // result.forEach((cat, index, arr) => {
  //   if (cat.sub.length) {
  //     for (let sub of cat.sub) {
  //       for (let subcat of result) {
  //         if (subcat._id.toString() == sub._id.toString()) {
  //           sub.count = subcat.count
  //           console.log(sub)
  //           cat.count += subcat.count
  //           orderedResult.splice(orderedResult.indexOf(subcat), 1)
  //           break
  //         }
  //       }
  //     }
  //   }
  // })
  // ctx.status = 200
  // ctx.body = {
  //   success: true,
  //   data: orderedResult
  // }
  // await next()
}
async function create (ctx, next) {
  const catName = ctx.request.body.name
  if (!~~catName) {
    ctx.throw(400, 'category name expected')
  }
  // if category already exist
  // return the existed category id
  const category = await Category
    .findOne({name: catName})
    .exec().catch(utils.internalErrHandler)
  if (category) {
    ctx.status = 200
    ctx.body = {
      success: true,
      data: {
        id: category._id
      }
    }
    return await next()
  }
  // else create new category
  const newCat = new Category({name: catName})
  const result = await newCat
    .save()
    .catch(utils.internalErrHandler)
  ctx.status = 200
  ctx.body = {
    success: true,
    data: {
      id: result._id
    }
  }
  await next()
}

async function modify (ctx, next) {
  const catName = ctx.request.body.name
  const catId = ctx.params.id
  // if new category's name duplicated return the category id
  const cat = await Category
    .findOne({name: catName})
    .exec()
    .catch(utils.internalErrHandler)
  if (!cat) {
    await Category.update({
      _id: catId
    }, {
      $set: {
        name: catName
      }
    })
      .exec()
      .catch(utils.internalErrHandler)
    ctx.status = 200
    ctx.body = {
      success: true
    }
  } else {
    ctx.status = 200
    ctx.body = {
      success: true,
      data: {
        id: cat._id
      }
    }
  }
  await next()
}

async function deleteCat (ctx, next) {
  const name = ctx.params.name
  const category = await Category
    .findOne({name})
    .exec().catch(utils.internalErrHandler)
  // update posts and drafts data before deleting catefory from database
  await Promise.all([
    Draft.update({}, {
      $pull: {
        category: category.id
      }
    }).exec(),
    Post.update({}, {
      $pull: {
        category: category.id
      }
    }).exec(),
    Category
      .remove({_id: category.id})
      .exec()
  ]).catch(utils.internalErrHandler)
  await next()
}
