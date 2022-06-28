import PropTypes from 'prop-types'
import { PlusButtonIcon } from 'icons'
import '../Buttons.scss'

export const PlusButton = ({ btnText, onClick }) => {
  return (
    <button
      onClick={e => {
        e.preventDefault()
        onClick?.()
      }}
      className="plus_btn"
    >
      <PlusButtonIcon />
      {btnText && <span>{btnText}</span>}
    </button>
  )
}
PlusButton.propTypes = {
  btnText: PropTypes.string,
  onClick: PropTypes.func,
}

export default PlusButton
