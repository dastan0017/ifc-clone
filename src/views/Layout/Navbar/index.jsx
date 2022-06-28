import PropTypes from 'prop-types'
import { FormattedMessage, useIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'
import { LogoIcon, AdministratorsIcon, BanksIcon, ReportsIcon, ReferenceBooksIcon } from 'icons'
import UserInfo from '../UserInfo'
import { useStore } from 'hooks'
import './Navbar.scss'

const Navbar = ({ routes }) => {
  const intl = useIntl()
  const { user } = useStore('authStore')

  return (
    <nav>
      <div className="nav_container">
        <NavLink to="/banks">
          <div className="logo">
            <LogoIcon />
            <p className="logo_name">{intl.formatMessage({ id: 'global.logo_name' })}</p>
          </div>
        </NavLink>
        <div className="navbar">
          {routes.map(({ path, name, navigated }) => {
            let icon = null
            switch (name.id) {
              case 'administrators':
                icon = <AdministratorsIcon />
                break
              case 'banks':
                icon = <BanksIcon />
                break
              case 'reports':
                icon = <ReportsIcon />
                break
              case 'reference_books':
                icon = <ReferenceBooksIcon />
                break
              default:
                break
            }

            if (user.roleNames[0] === 'Admin' && name.id === 'banks') {
              return null
            }

            return (
              navigated && (
                <NavLink to={path} activeClassName="navbar_active" key={name.id + path} className="navbar_item">
                  {icon} <FormattedMessage {...name} />
                </NavLink>
              )
            )
          })}
        </div>
      </div>

      <UserInfo />
    </nav>
  )
}
Navbar.propTypes = {
  routes: PropTypes.array,
}

export default Navbar
