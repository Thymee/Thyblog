import mongoose from 'mongoose'

const tagSchema = mongoose.Schema({
  name: String
}, {
  versionKey: false,
  toJSON: {
    getters: true
  },
  toObject: {
    getters: true
  }
})

export default mongoose.model('tag', tagSchema)
