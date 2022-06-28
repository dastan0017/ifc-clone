import { lazy } from 'react'
import { Row } from 'react-bootstrap'
import { useStore } from 'hooks'
import { observer } from 'mobx-react'
import '../Pages.scss'

const AdminsBankPage = lazy(() => import('./AdminsBank'))
const SuperadminsBankPage = lazy(() => import('./SuperadminsBank'))

const BanksPage = observer(({ routes }) => {
  const { user } = useStore('authStore')

  return (
    <>
      <Row className="w-100">{user.roleNames.length === 1 && user.roleNames[0] === 'Admin' ? <AdminsBankPage /> : <SuperadminsBankPage />}</Row>
    </>
  )
})

export default BanksPage
