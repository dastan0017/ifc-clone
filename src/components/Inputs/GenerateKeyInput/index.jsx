import { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import '../CustomInputs.scss'
import { Button } from 'react-bootstrap'

export const GenerateKeyInput = ({ register, generateRandomKey, ...props }) => {
  const intl = useIntl()

  const generateKey = () => {
    let a = (Math.random() + 1).toString(36).substring(4)
    let b = (Math.random() + 1).toString(36).substring(4)
    let c = (Math.random() + 1).toString(36).substring(4)
    const generatedString = `${a}-${b}-${c}`
    generateRandomKey(generatedString)
  }

  return (
    <div className="generate_key_input">
      <input {...props} ref={register} />
      <Button
        onClick={e => {
          e.preventDefault()
          generateKey()
        }}
      >
        {intl.formatMessage({ id: 'global.generate' })} {'>'}
      </Button>
    </div>
  )
}
GenerateKeyInput.propTypes = {
  register: PropTypes.any,
  generateRandomKey: PropTypes.func,
}

export default GenerateKeyInput
