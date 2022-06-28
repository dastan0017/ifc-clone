import { useState, lazy, Suspense } from 'react'
import { Row } from 'react-bootstrap'
import { useLocation, NavLink, Redirect } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { Switch, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useStore } from 'hooks'
import { observer } from 'mobx-react'
const BankKeysPage = lazy(() => import('./pages/BankKeysPage'))
const BanksFilialsPage = lazy(() => import('./pages/BanksFilialsPage'))

export const OneBankPage = observer(props => {
  const { pathname } = useLocation()
  const bankid = pathname.split('/')[2]
  const intl = useIntl()

  const { getBank } = useStore('banksStore')

  const [bank, setBank] = useState(null)

  useEffect(() => {
    const getBankInfo = async () => {
      try {
        const bankInfo = await getBank(bankid).then(res => res.data)
        await setBank(bankInfo)
      } catch (err) {
        console.log(err)
      }
    }

    getBankInfo()
  }, [bankid, getBank])

  return (
    <Suspense fallback={<div>...loading</div>}>
      <Row className="page_header">
        {/* TODO: Add bank name to title after getting it from api */}
        <h2>
          {intl.formatMessage({ id: 'global.bank' })} {bank && `- ${bank.name}`}
        </h2>
      </Row>
      <Row className="inpage_navbar">
        <NavLink to={`/banks/${bankid}/keys`} className={isActive => (isActive ? 'nav-link-active' : '')}>
          {intl.formatMessage({ id: 'keys' })}
        </NavLink>
        <NavLink to={`/banks/${bankid}/filials-and-offices`} className={isActive => (isActive ? 'nav-link-active' : '')}>
          {intl.formatMessage({ id: 'filials_and_offices' })}
        </NavLink>
      </Row>
      <Row className="page_content">
        <Switch>
          <Route path={`/banks/${bankid}/keys`}>
            <BankKeysPage bankId={bankid} />
          </Route>
          <Route path={`/banks/${bankid}/filials-and-offices`}>
            <BanksFilialsPage bankId={bankid} />
          </Route>
          <Redirect to={`/banks/${bankid}/keys`} />
        </Switch>
      </Row>
    </Suspense>
  )
})

export default OneBankPage
