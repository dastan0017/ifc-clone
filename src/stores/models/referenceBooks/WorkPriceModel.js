import { types } from 'mobx-state-tree'
import { DictionaryModel } from '../common'

export const WorkPriceModel = types.model('WorkPriceModel', {
  id: types.number,
  price: types.number,
  coefficient: types.number,
  priceRegion: DictionaryModel,
  currency: DictionaryModel,
  work: DictionaryModel,
  lastModified: types.string,
  isDeletable: types.boolean,
})
