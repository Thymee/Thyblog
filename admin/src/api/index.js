import service from './service.js'

export default {
  async createToken (username, password) {
    return await service.post('tokens', {username, password})
  },
  async getDraftList (query) {
    return await service.get('drafts', query)
  },
  async getDraft (id) {
    return await service.get(`drafts/${id}`)
  },
  async modifyDraftContent (id, content) {
    return await service.patch(`drafts/${id}`, {content})
  },
  async modifyDraftTitle (id, title) {
    return await service.patch(`drafts/${id}`, {title})
  },
  async modifyDraftTags (id, tags) {
    return await service.patch(`drafts/${id}`, {tags})
  },
  async modifyDraftCategory (id, category) {
    return await service.patch(`drafts/${id}`, {category})
  },
  async modifyDraftImage (id, imagesrc) {
    return await service.patch(`drafts/${id}`, {imagesrc})
  },
  async createTag (name) {
    return await service.post('tags', {name})
  },
  async createCategory (name) {
    return await service.post('categories', {name})
  },
  async createDraft (title) {
    return await service.post('drafts', {title})
  },
  async publish (id) {
    return await service.post('publication', {id})
  },
  async deleteDraft (id) {
    return await service.delete(`drafts/${id}`)
  },
  async getAllTags () {
    return await service.get('tags')
  },
  async modifyTag (id, newName) {
    return await service.patch(`tags/${id}`, {name: newName})
  },
  async deleteTag (id) {
    return await service.delete(`tags/${id}`)
  },
  async getAllCategories () {
    return await service.get('categories')
  },
  async modifyCategory (id, newName) {
    return await service.patch(`categories/${id}`, {name: newName})
  },
  async deleteCatefory (id) {
    return await service.delete(`categories/${id}`)
  },
  async searchTagWithWord (keyword) {
    return await service.get('tags', {'start-with': keyword})
  }
}
