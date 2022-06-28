import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'react-bootstrap'
import { InputValidationEnum } from 'enums'

export const PriceRegionForm = ({ onSubmit, data }) => {
  const intl = useIntl()

  const schema = yup.object().shape({
    name: yup
      .string()
      .typeError(intl.formatMessage({ id: 'validation.is_required' }))
      .required(intl.formatMessage({ id: 'validation.is_required' }))
      .matches(InputValidationEnum.NO_ONLY_SPACES, intl.formatMessage({ id: 'validation.not_valid' })),
    isHead: yup.boolean().required(),
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
        <label htmlFor="name">{intl.formatMessage({ id: 'reference_books.region_name' })}</label>
        <input
          style={errors.name && { border: '1px solid red' }}
          placeholder={intl.formatMessage({ id: 'placeholder.enter_name' })}
          name="name"
          type="text"
          ref={register}
        />

        <label htmlFor="name">{intl.formatMessage({ id: 'reference_books.is_head' })}</label>
        <select name="isHead" aria-label="Default select example" ref={register}>
          <option value={false}>{intl.formatMessage({ id: 'global.no' })}</option>
          <option value={true}>{intl.formatMessage({ id: 'global.yes' })}</option>
        </select>

        <Button type="submit" className="btn-primary modal_btn">
          {intl.formatMessage({ id: 'global.save' })}
        </Button>
      </form>
    </>
  )
}
PriceRegionForm.propTypes = {
  onSubmit: PropTypes.func,
  data: PropTypes.object,
}
