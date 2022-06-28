import { types } from 'mobx-state-tree'

const UserInfoModel = types.model('UserInfoModel', {
  userName: types.optional(types.string, '', [null, undefined]),
  accessToken: types.maybeNull(types.string),
  refreshToken: types.maybeNull(types.string),
  id: types.maybeNull(types.string),
  roleNames: types.maybeNull(types.array(types.string)),
})

export default UserInfoModel
