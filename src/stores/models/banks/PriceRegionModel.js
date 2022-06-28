import { types } from 'mobx-state-tree'

export const PriceRegionModel = types.model('PriceRegionModel', {
  id: types.number,
  name: types.string,
  updatedUtc: types.maybeNull(types.string),
  isHead: types.boolean,
  isDeletable: types.boolean,
})
