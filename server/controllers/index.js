import initPost from './post.js'
import initTag from './tag.js'
import initComment from './comment.js'
import initCategory from './category.js'
import initDraft from './draft.js'
import initPublish from './publication.js'
import initToken from './tokens.js'
// import fs from 'fs'
// const files = fs.readdirSync(__dirname)
// let controllers = {}
// for(let file of files){
  // if(file !== 'index.js'){
    // const fileName = file.split('.')[0]
    // controllers[fileName] = require('./'+file)
  // }
 // }
export default router => {
  initPost(router)
  initTag(router)
  initCategory(router)
  initDraft(router)
  initPublish(router)
  initToken(router)
  initComment(router)
}
