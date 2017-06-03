import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
  content: String,
  createTime: {
    type: Date
  },
  user: String,
  userAvator: {
    type: String,
    default: ''
  },
  replyTo: Number
})

export default mongoose.model('comment', commentSchema)
