import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'react-bootstrap'
import { InputValidationEnum } from 'enums'

export const CurrencyForm = ({ onSubmit, data }) => {
  const intl = useIntl()

  const schema = yup.object().shape({
    name: yup
      .string()
      .typeError(intl.formatMessage({ id: 'validation.is_required' }))
      .required(intl.formatMessage({ id: 'validation.is_required' }))
      .matches(InputValidationEnum.NO_ONLY_SPACES, intl.formatMessage({ id: 'validation.not_valid' })),

    isoCode: yup
      .string()
      .typeError(intl.formatMessage({ id: 'validation.is_required' }))
      .required(intl.formatMessage({ id: 'validation.is_required' }))
      .matches(InputValidationEnum.NO_SPACES_UPPERCASE, intl.formatMessage({ id: 'validation.only_latin_uppercase' })),
    ratio: yup
      .number(intl.formatMessage({ id: 'validation.not_valid' }))
      .typeError(intl.formatMessage({ id: 'validation.is_required' }))
      .positive(intl.formatMessage({ id: 'validation.not_valid' }))
      .required(intl.formatMessage({ id: 'validation.is_required' })),
  })
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  })
  //   Set initial values
  useEffect(() => {
    if (data.action === 'edit') {
      reset(data.initValues)
    }
  }, [reset, data])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form form_container">
        {errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}
        <label htmlFor="name">{intl.formatMessage({ id: 'reference_books.currency_name' })}</label>
        <input
          style={errors.name && { border: '1px solid red' }}
          name="name"
          type="text"
          ref={register}
          placeholder={intl.formatMessage({ id: 'placeholder.enter_currency_name' })}
        />

        {errors.isoCode && <span style={{ color: 'red' }}>{errors.isoCode.message}</span>}
        <label htmlFor="isoCode">{intl.formatMessage({ id: 'reference_books.currency_code' })}</label>
        <input
          style={errors.isoCode && { border: '1px solid red' }}
          name="isoCode"
          type="text"
          ref={register}
          placeholder={intl.formatMessage({ id: 'placeholder.enter_currency_code' })}
        />

        {errors.ratio && <span style={{ color: 'red' }}>{errors.ratio.message}</span>}
        <label htmlFor="ratio">{intl.formatMessage({ id: 'reference_books.currency_rate' })}</label>
        <input style={errors.ratio && { border: '1px solid red' }} name="ratio" type="number" ref={register} step="any" />

        <Button type="submit" className="btn-primary modal_btn">
          {intl.formatMessage({ id: 'global.save' })}
        </Button>
      </form>
    </>
  )
}
CurrencyForm.propTypes = {
  onSubmit: PropTypes.func,
  data: PropTypes.object,
}
