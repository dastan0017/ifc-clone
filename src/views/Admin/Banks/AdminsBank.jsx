import { useEffect, useState, Suspense, lazy } from 'react'
import { Row } from 'react-bootstrap'
import { useStore } from 'hooks'
import { observer } from 'mobx-react'
import '../Pages.scss'
import { Switch, Route, Redirect } from 'react-router-dom'
const OneBankPage = lazy(() => import('./OneBankPage'))

const AdminsBank = observer(({ routes }) => {
  const { getAdminInfo } = useStore('adminsStore')

  const [adminInfo, setAdminInfo] = useState({ bankId: undefined })

  useEffect(() => {
    const getAdmin = async () => {
      try {
        await getAdminInfo().then(res => {
          setAdminInfo(res.data)
        })
      } catch (err) {
        console.log(err)
      }
    }
    getAdmin()
  }, [getAdminInfo])

  return (
    <>
      <Row className="w-100">
        <Suspense fallback={<div>...loading</div>}>
          <Switch>
            <Route path={`/banks/${adminInfo.bankId}`}>
              <OneBankPage bankId={adminInfo.bankId} />
            </Route>
            <Redirect to={`/banks/${adminInfo.bankId}/keys`} />
          </Switch>
        </Suspense>
      </Row>
    </>
  )
})

export default AdminsBank
