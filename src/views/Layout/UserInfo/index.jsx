import DropdownLanguage from './DropdownLanguage'
import { LogoutIcon } from 'icons'
import { Row } from 'react-bootstrap'
import { useStore } from 'hooks'

const UserInfo = () => {
  const authStore = useStore('authStore')

  const logOut = () => {
    authStore.signOut()
  }

  return (
    <Row className="user_info">
      <DropdownLanguage className="user_info-item" />
      <LogoutIcon onClick={logOut} className="user_info-item logout_icon" style={{ cursor: 'pointer' }} />
    </Row>
  )
}
export default UserInfo
