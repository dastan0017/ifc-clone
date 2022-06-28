import PropTypes from 'prop-types'
import '../Buttons.scss'

export const AddButton = ({ btnText, onClick, iconFirst, ButtonIcon }) => {
  return (
    <button
      onClick={e => {
        e.preventDefault()
        onClick?.()
      }}
      className="add_btn"
    >
      {iconFirst ? (
        <>
          {ButtonIcon && <ButtonIcon className="m-3" />}
          <span>{btnText}</span>
        </>
      ) : (
        <>
          <span>{btnText}</span>
          {ButtonIcon && <ButtonIcon />}
        </>
      )}
    </button>
  )
}
AddButton.propTypes = {
  btnText: PropTypes.string,
  onClick: PropTypes.func,
  iconFirst: PropTypes.bool,
  ButtonIcon: PropTypes.any,
}

export default AddButton
