import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { useIntlContext } from '../../../../IntlProviderWrapper'
import { LanguagesIcon } from 'icons'
import '../UserInfo.scss'

const DropdownLanguage = () => {
  const intl = useIntl()
  const { switchToEnglish, switchToRussian, switchToKyrgyz } = useIntlContext()

  return (
    <Dropdown>
      <Dropdown.Toggle className="langToggle_btn" name={intl.formatMessage({ id: 'language' })}>
        <LanguagesIcon className="lang_icon" />
        <p>{intl.formatMessage({ id: 'language' })}</p>
      </Dropdown.Toggle>

      <Dropdown.Menu className="langDropdown_menu">
        <Dropdown.Item onClick={switchToRussian}>Русский</Dropdown.Item>
        <Dropdown.Item onClick={switchToKyrgyz}>Кыргыз тили</Dropdown.Item>
        <Dropdown.Item onClick={switchToEnglish}>English</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownLanguage
