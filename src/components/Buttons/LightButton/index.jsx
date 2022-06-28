import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import '../Buttons.scss'

export const LightButton = ({ btnText, onClick, iconFirst, ButtonIcon, ...props }) => {
  return (
    <Button
      onClick={e => {
        e.preventDefault()
        onClick?.()
      }}
      variant="outline-secondary"
      className="light_btn"
      {...props}
    >
      {iconFirst ? (
        <>
          <ButtonIcon className="m-3" />
          <span style={{ marginLeft: '28px' }}>{btnText}</span>
        </>
      ) : (
        <>
          <span style={{ marginRight: '28px' }}>{btnText}</span>
          <ButtonIcon />
        </>
      )}
    </Button>
  )
}
LightButton.propTypes = {
  btnText: PropTypes.string,
  onClick: PropTypes.func,
  iconFirst: PropTypes.bool,
  ButtonIcon: PropTypes.any,
}

export default LightButton
