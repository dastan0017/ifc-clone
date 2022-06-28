import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { PasswordInput } from 'components'
import { Button } from 'react-bootstrap'
import { InputValidationEnum } from 'enums'

export const AdministratorsForm = ({ onSubmit, data }) => {
  const intl = useIntl()

  const schema = yup.object().shape({
    userName: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.is_required' }))
      .matches(InputValidationEnum.NO_SPACES, intl.formatMessage({ id: 'validation.not_valid' })),
    pwd: yup
      .string()
      .required(
        intl.formatMessage({
          id: 'validation.is_required',
        }),
      )
      .matches(InputValidationEnum.NO_SPACES_WITH_CHARACTERS, intl.formatMessage({ id: 'validation.not_valid' })),
    bankId: yup.number().required(intl.formatMessage({ id: 'validation.is_required' })),
  })
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  })
  // set initial values
  useEffect(() => {
    if (data.action === 'edit') {
      reset({ pwd: '', userName: data.userName, bankId: data.bankId })
    }
  }, [reset, data])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form form_container">
        {errors.userName && <span>{errors.userName.message}</span>}
        <label htmlFor="userName">{intl.formatMessage({ id: 'global.login' })}</label>
        <input name="userName" type="text" placeholder="Name" ref={register} />
        {errors.pwd && <span>{errors.pwd.message}</span>}
        <label htmlFor="pwd">{intl.formatMessage({ id: 'global.password' })}</label>
        <PasswordInput name="pwd" type="password" register={register} />
        {errors.bankId && <span>{errors.pwd.message}</span>}
        <label htmlFor="bankId">{intl.formatMessage({ id: 'select.bank' })}</label>
        <select name="bankId" aria-label="Default select example" ref={register}>
          {data?.banksList?.map(el => (
            <option value={el.id} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>

        <Button type="submit" className="btn-primary modal_btn">
          {intl.formatMessage({ id: 'global.save' })}
        </Button>
      </form>
    </>
  )
}
AdministratorsForm.propTypes = {
  onSubmit: PropTypes.func,
  data: PropTypes.object,
}
