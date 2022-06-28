import { useEffect } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { InputValidationEnum } from 'enums'

export const BankForm = ({ data, onSubmit }) => {
  const intl = useIntl()
  const validationSchema = Yup.object().shape({
    bankName: Yup.string()
      .required(intl.formatMessage({ id: 'validation.is_required' }))
      .matches(InputValidationEnum.NO_ONLY_SPACES, intl.formatMessage({ id: 'validation.not_valid' })),
    countryId: Yup.number().required(intl.formatMessage({ id: 'validation.is_required' })),
  })

  const formOptions = { resolver: yupResolver(validationSchema) }

  const { register, handleSubmit, reset, errors } = useForm(formOptions)

  // set initial values
  useEffect(() => {
    if (data.action === 'edit') {
      reset({ bankName: data.name, countryId: data.countryId })
    }
  }, [reset, data])

  return (
    <form className="form_container" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="countryId">{intl.formatMessage({ id: 'global.country' })}</label>
      <select name="countryId" aria-label="Default select example" ref={register}>
        {data?.countriesList.map((country, idx) => (
          <option key={idx} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
      {errors.bankName && <span style={{ color: 'red' }}>{errors.bankName.message}</span>}
      <label htmlFor="bankName">{intl.formatMessage({ id: 'banks.bank_name' })}</label>
      <input
        name="bankName"
        ref={register}
        type="text"
        placeholder={intl.formatMessage({ id: 'banks.insert_bank_name' })}
        style={errors.bankName && { border: '1px solid red' }}
      />

      <button type="submit" className="btn btn-primary mt-4">
        {intl.formatMessage({ id: 'global.save' })}
      </button>
    </form>
  )
}
BankForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
}
export default BankForm
