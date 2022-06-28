import { types } from 'mobx-state-tree'

export const MaterialTypesModel = types.model('MaterialTypesModel', {
  id: types.number,
  name: types.string,
  isDeletable: types.boolean,
})
