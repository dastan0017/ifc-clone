import { types } from 'mobx-state-tree'
import { DictionaryModel } from '../common'

export const WorkModel = types.model('WorkModel', {
  id: types.number,
  name: types.string,
  workTypeId: types.number,
  measurementUnitId: types.number,
  localizedNameByHeader: types.string,
  localizedNameByQuery: types.string,
  isDeletable: types.boolean,
  workType: types.maybeNull(DictionaryModel),
  measurementUnit: types.maybeNull(DictionaryModel),
})
