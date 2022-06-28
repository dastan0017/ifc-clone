import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { GenerateKeyInput } from 'components'
import { Button, Spinner } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { InputValidationEnum } from 'enums'

export const KeyForm = ({ data, onSubmit }) => {
  const intl = useIntl()
  const [isLoading, setIsLoading] = useState(false)

  const validationSchema = Yup.object().shape({
    key: Yup.string()
      .required(intl.formatMessage({ id: 'validation.is_required' }))
      .matches(InputValidationEnum.NO_SPACES_WITH_CHARACTERS, intl.formatMessage({ id: 'validation.not_valid' })),
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, reset, errors, setValue, trigger } = useForm(formOptions)

  // set initial values
  useEffect(() => {
    if (data.action === 'edit') {
      reset({ key: data.key })
    }
  }, [reset, data])

  const handleGenerateKey = randomKey => {
    setValue('key', randomKey)
    trigger()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form form_container">
      {errors.key && <span style={{ color: 'red' }}>{errors.key.message}</span>}
      <label htmlFor="key">{intl.formatMessage({ id: 'key' })}</label>
      <GenerateKeyInput
        style={errors.key && { border: '1px solid red' }}
        name="key"
        register={register}
        placeholder={intl.formatMessage({ id: 'placeholder.enter_key' })}
        generateRandomKey={handleGenerateKey}
      />

      <Button type="submit" className="btn-primary modal_btn">
        {isLoading ? <Spinner animation="border" size="sm" /> : intl.formatMessage({ id: 'global.save' })}
      </Button>
    </form>
  )
}
KeyForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
}
export default KeyForm
