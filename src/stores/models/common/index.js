import { types } from 'mobx-state-tree'

export const DictionaryModel = types.model('DictionaryModel', {
  id: types.number,
  name: types.string,
})
