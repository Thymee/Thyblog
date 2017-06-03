import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  title: String,
  visit: {
    type: Number,
    default: 0
  },
  imagesrc: String,
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tag'
    }
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  lastEditTime: {
    type: Date,
    default: Date.now
  },
  hidden: Boolean,
  excerpt: String,
  content: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment'
    }
  ]
}, {
  versionKey: false,
  skipVersioning: {
    tags: true
  },
  toJSON: {
    getters: true
  },
  toObject: {
    getters: true
  }
})
postSchema
  .path('createTime')
  .get(v => new Date(v).format('yyyy-MM-dd hh:mm:ss'))
postSchema
  .path('lastEditTime')
  .get(v => new Date(v).format('yyyy-MM-dd hh:mm:ss'))
export default mongoose.model('post', postSchema)
