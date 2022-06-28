import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import PropTypes from 'prop-types'
import '../Buttons.scss'

export const TooltipButton = ({ onClick, tooltipText, ButtonIcon, ...props }) => {
  const renderTooltip = props => {
    return (
      <Tooltip {...props} id="edit_btn_tooltip">
        {tooltipText}
      </Tooltip>
    )
  }
  return (
    <button
      onClick={e => {
        e.preventDefault()
        onClick?.()
      }}
      className="delete_btn"
      {...props}
    >
      <OverlayTrigger placement="top" overlay={renderTooltip} delay={{ show: 100, hide: 100 }}>
        <ButtonIcon />
      </OverlayTrigger>
    </button>
  )
}
TooltipButton.propTypes = {
  onClick: PropTypes.func,
  tooltipText: PropTypes.string,
  ButtonIcon: PropTypes.any,
}

export default TooltipButton
