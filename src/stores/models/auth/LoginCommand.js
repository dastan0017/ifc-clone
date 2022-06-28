import { types } from 'mobx-state-tree'

const LoginCommand = types.model('LoginCommand', {
  userName: types.string,
  password: types.string,
})

export default LoginCommand
