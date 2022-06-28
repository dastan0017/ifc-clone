import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { EmptyPageImage, AddBtnIcon } from 'icons'
import { AddButton } from '../Buttons/AddButton'
import { useIntl } from 'react-intl'
import './EmptyPage.scss'

export const EmptyPage = ({ text, onClick, withoutButton = false }) => {
  const intl = useIntl()
  return (
    <Row className="emptyPage">
      <Row className="emptyPage_content">
        <EmptyPageImage />
        <p>{text}</p>
        {!withoutButton && <AddButton btnText={intl.formatMessage({ id: 'add.btn' })} onClick={onClick} ButtonIcon={AddBtnIcon} />}
      </Row>
    </Row>
  )
}
EmptyPage.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  withoutButton: PropTypes.bool,
}

export default EmptyPage
