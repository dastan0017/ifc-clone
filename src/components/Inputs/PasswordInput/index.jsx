import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { EyeOpen, EyeClosed } from 'icons'
import '../CustomInputs.scss'

export const PasswordInput = ({ register, ...props }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  return (
    <div className="password_input">
      <input {...props} type={isPasswordShown ? 'text' : 'password'} ref={register} />
      <button
        onClick={e => {
          e.preventDefault()
          setIsPasswordShown(!isPasswordShown)
        }}
      >
        {isPasswordShown ? <EyeClosed /> : <EyeOpen />}
      </button>
    </div>
  )
}
PasswordInput.propTypes = {
  register: PropTypes.any,
}

export default PasswordInput
