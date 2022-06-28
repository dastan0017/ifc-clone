import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'react-bootstrap'
import { InputValidationEnum } from 'enums'

export const WorkTypeForm = ({ onSubmit, data }) => {
  const intl = useIntl()

  const schema = yup.object().shape({
    name: yup
      .string()
      .typeError(intl.formatMessage({ id: 'validation.is_required' }))
      .required(intl.formatMessage({ id: 'validation.is_required' }))
      .matches(InputValidationEnum.NO_ONLY_SPACES, intl.formatMessage({ id: 'validation.not_valid' })),
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
        <label htmlFor="name">{intl.formatMessage({ id: 'reference_books.work_type_name' })}</label>
        <input
          placeholder={intl.formatMessage({ id: 'placeholder.enter_name' })}
          style={errors.name && { border: '1px solid red' }}
          name="name"
          type="text"
          ref={register}
        />

        <Button type="submit" className="btn-primary modal_btn">
          {intl.formatMessage({ id: 'global.save' })}
        </Button>
      </form>
    </>
  )
}
WorkTypeForm.propTypes = {
  onSubmit: PropTypes.func,
  data: PropTypes.object,
}
