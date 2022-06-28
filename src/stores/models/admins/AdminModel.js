import { types } from 'mobx-state-tree'

const _BankModel = types.model('BankModel', {
  id: types.number,
  name: types.string,
})

const AdminModel = types.model('AdminModel', {
  id: types.string,
  firstName: types.string,
  lastName: types.string,
  bankId: types.number,
  userName: types.string,
  email: types.maybeNull(types.string),
  phoneNumber: types.maybeNull(types.string),
  isDeletable: types.maybeNull(types.boolean),
  bank: types.maybeNull(_BankModel),
})

export const AdminInfoModel = types.model('AdminInfoModel', {
  id: types.string,
  firstName: types.string,
  lastName: types.string,
  bankId: types.number,
  userName: types.string,
  email: types.maybeNull(types.string),
  phoneNumber: types.maybeNull(types.string),
})

export default AdminModel
