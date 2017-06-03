import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
  name: String,
  sub: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category'
    }
  ]
}, {
  versionKey: false,
  toJSON: {
    getters: true
  },
  toObject: {
    getters: true
  }
})

export default mongoose.model('category', categorySchema)
