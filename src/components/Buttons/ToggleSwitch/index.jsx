import { useState } from 'react'
import PropTypes from 'prop-types'
import './ToggleSwitch.scss'

export const ToggleSwitch = ({ defaultValue = false, onToggle }) => {
  const [isOn, setIsOn] = useState(defaultValue)

  const handleToggle = () => {
    setIsOn(prev => {
      setIsOn(!prev)
      onToggle(!prev)
    })
  }

  let classNames = ['switch', isOn ? 'switch_is-on' : 'switch_is-off'].join(' ')
  return (
    <div className={classNames} onClick={handleToggle}>
      <ToggleButton isOn={isOn} />
    </div>
  )
}
ToggleSwitch.propTypes = {
  defaultValue: PropTypes.bool,
  onToggle: PropTypes.func,
}

const ToggleButton = ({ isOn }) => {
  let classNames = ['toggle-button', isOn ? 'toggle-button_position-right' : 'toggle-button_position-left'].join(' ')
  return <span className={classNames}></span>
}
ToggleButton.propTypes = {
  isOn: PropTypes.bool,
}

export default ToggleSwitch
