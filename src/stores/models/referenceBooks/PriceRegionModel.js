import { types } from 'mobx-state-tree'

export const PriceRegionModel = types.model('EnergyResourceModel', {
  id: types.number,
  name: types.string,
  isHead: types.boolean,
  updatedUtc: types.string,
  isDeletable: types.boolean,
})
