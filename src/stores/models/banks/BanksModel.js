import { types } from 'mobx-state-tree'

const CountryModel = types.model('CountryModel', {
  id: types.number,
  name: types.string,
})

export const BankModel = types.model('BankModel', {
  id: types.number,
  name: types.string,
  countryId: types.number,
  isDeletable: types.boolean,
  country: types.maybeNull(CountryModel),
  keysCount: types.number,
  branchesOfficesCount: types.number,
  branchesCount: types.number,
})

export const BankKeyModel = types.model('BankKeyModel', {
  id: types.number,
  bankId: types.number,
  key: types.string,
  createdUtc: types.string,
  isDeletable: types.boolean,
  bank: types.maybeNull(types.model({ id: types.number, name: types.string })),
})

export const BankFilialModel = types.model('BankFilialModel', {
  id: types.number,
  name: types.string,
  priceRegionId: types.maybeNull(types.number),
  bankId: types.maybeNull(types.number),
  updatedUtc: types.string,
  isDeletable: types.boolean,
  bank: types.maybeNull(types.model({ id: types.number, name: types.string })),
  priceRegion: types.maybeNull(types.model({ id: types.number, name: types.string })),
})

export const BankOfficeModel = types.model('BankOfficeModel', {
  id: types.number,
  name: types.string,
  priceRegionId: types.maybeNull(types.number),
  branchId: types.maybeNull(types.number),
  updatedUtc: types.maybeNull(types.string),
  isDeletable: types.boolean,
  priceRegion: types.maybeNull(types.model({ id: types.number, name: types.string })),
  branch: types.maybeNull(types.model({ id: types.number, name: types.string })),
})

export default BankModel
