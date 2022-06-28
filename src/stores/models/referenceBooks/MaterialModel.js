import { types } from 'mobx-state-tree'
import { DictionaryModel } from '../common'

export const MaterialModel = types.model('MaterialModel', {
  id: types.number,
  name: types.string,
  isDeletable: types.boolean,
  materialType: types.maybeNull(DictionaryModel),
  measurementUnit: types.maybeNull(DictionaryModel),
})
