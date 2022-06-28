import { types } from 'mobx-state-tree'
import { DictionaryModel } from '../common'

export const EnergyResourceModel = types.model('EnergyResourceModel', {
  id: types.number,
  priceRegionId: types.number,
  typeId: types.number,
  price: types.number,
  isDeletable: types.boolean,
  type: types.maybeNull(DictionaryModel),
  priceRegion: types.maybeNull(DictionaryModel),
})
