import { lazy } from 'react'
import { Row } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { observer } from 'mobx-react'
import { NavLink, Redirect, Switch, Route } from 'react-router-dom'
import { HorizontalScrollWithButton } from 'components'
const EnergyPricesPage = lazy(() => import('./pages/EnergyPricesPage/index'))
const CurrencySettingsPage = lazy(() => import('./pages/CurrencySettingsPage'))
const MaterialTypesPage = lazy(() => import('./pages/MaterialTypesPage'))
const WorkTypesPage = lazy(() => import('./pages/WorkTypesPage'))
const MaterialsPage = lazy(() => import('./pages/MaterialsPage'))
const WorksPage = lazy(() => import('./pages/WorksPage'))
const MaterialPricesPage = lazy(() => import('./pages/MaterialPricesPage'))
const WorkPricesPage = lazy(() => import('./pages/WorkPricesPage'))
const PriceRegionsPage = lazy(() => import('./pages/PriceRegionsPage'))
import '../Pages.scss'

const ReferenceBooksPage = observer(() => {
  const intl = useIntl()

  return (
    <Row className="w-100">
      <Row className="page_header">
        <h2>{intl.formatMessage({ id: 'reference_books' })}</h2>
      </Row>
      <Row className="w-100"></Row>
      <Row className="inpage_navbar">
        <HorizontalScrollWithButton>
          <NavLink to={`/reference_books/energy_prices`} className={isActive => (isActive ? 'nav-link-active' : '')}>
            {intl.formatMessage({ id: 'reference_books.energy_prices' })}
          </NavLink>
          <NavLink to={`/reference_books/currency_setting`} className={isActive => (isActive ? 'nav-link-active' : '')}>
            {intl.formatMessage({ id: 'reference_books.currency_setting' })}
          </NavLink>
          <NavLink to={`/reference_books/material_types`} className={isActive => (isActive ? 'nav-link-active' : '')}>
            {intl.formatMessage({ id: 'reference_books.material_types' })}
          </NavLink>
          <NavLink to={`/reference_books/work_types`} className={isActive => (isActive ? 'nav-link-active' : '')}>
            {intl.formatMessage({ id: 'reference_books.work_types' })}
          </NavLink>
          <NavLink to={`/reference_books/material_lists`} className={isActive => (isActive ? 'nav-link-active' : '')}>
            {intl.formatMessage({ id: 'reference_books.material_lists' })}
          </NavLink>
          <NavLink to={`/reference_books/work_lists`} className={isActive => (isActive ? 'nav-link-active' : '')}>
            {intl.formatMessage({ id: 'reference_books.work_lists' })}
          </NavLink>
          <NavLink to={`/reference_books/material_coefficients`} className={isActive => (isActive ? 'nav-link-active' : '')}>
            {intl.formatMessage({ id: 'reference_books.material_coefficients' })}
          </NavLink>
          <NavLink to={`/reference_books/work_coefficients`} className={isActive => (isActive ? 'nav-link-active' : '')}>
            {intl.formatMessage({ id: 'reference_books.work_coefficients' })}
          </NavLink>
          <NavLink to={`/reference_books/price_region`} className={isActive => (isActive ? 'nav-link-active' : '')}>
            {intl.formatMessage({ id: 'reference_books.price_region' })}
          </NavLink>
        </HorizontalScrollWithButton>
      </Row>
      <Row className="page_content">
        <Switch>
          <Route path="/reference_books/energy_prices">
            <EnergyPricesPage />
          </Route>
          <Route path="/reference_books/currency_setting">
            <CurrencySettingsPage />
          </Route>
          <Route path="/reference_books/material_types">
            <MaterialTypesPage />
          </Route>
          <Route path="/reference_books/work_types">
            <WorkTypesPage />
          </Route>
          <Route path="/reference_books/material_lists">
            <MaterialsPage />
          </Route>
          <Route path="/reference_books/work_lists">
            <WorksPage />
          </Route>
          <Route path="/reference_books/material_coefficients">
            <MaterialPricesPage />
          </Route>
          <Route path="/reference_books/work_coefficients">
            <WorkPricesPage />
          </Route>
          <Route path="/reference_books/price_region">
            <PriceRegionsPage />
          </Route>
          <Redirect to="/reference_books/energy_prices" />
        </Switch>
      </Row>
    </Row>
  )
})

export default ReferenceBooksPage
