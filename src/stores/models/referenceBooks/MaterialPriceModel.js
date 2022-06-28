import { types } from 'mobx-state-tree'
import { DictionaryModel } from '../common'

export const MaterialPriceModel = types.model('MaterialPriceModel', {
  id: types.number,
  price: types.number,
  coefficient: types.number,
  priceRegion: DictionaryModel,
  supplier: DictionaryModel,
  currency: DictionaryModel,
  material: DictionaryModel,
  lastModified: types.string,
  isDeletable: types.boolean,
})
