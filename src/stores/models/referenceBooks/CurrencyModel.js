import { types } from 'mobx-state-tree'

export const CurrencyModel = types.model('CurrencyModel', {
  id: types.number,
  name: types.string,
  ratio: types.number,
  isoCode: types.string,
  lastModified: types.string,
  isDeletable: types.boolean,
})
