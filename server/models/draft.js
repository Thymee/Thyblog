import mongoose from 'mongoose'
const draftSchema = mongoose.Schema({
  title: String,
  imagesrc: String,
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tag'
    }
  ],
  createTime: {
    type: Date
  },
  lastEditTime: {
    type: Date,
    default: Date.now
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
  },
  excerpt: String,
  content: String,
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  },
  published: Boolean
}, {
  versionKey: false,
  skipVersioning: {
    tags: false
  },
  toJSON: {
    getters: true
  },
  toObject: {
    getters: true
  }
})

draftSchema.path('createTime').get(v => new Date(v).format('yyyy-MM-dd hh:mm:ss'))
draftSchema.path('lastEditTime').get(v => new Date(v).format('yyyy-MM-dd hh:mm:ss'))

export default mongoose.model('draft', draftSchema)
