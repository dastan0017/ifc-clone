import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router-dom'
import { useStore } from '../../hooks'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Spinner } from 'react-bootstrap'
import { sendNotification } from '../../components/Toast/index'
import { useIntl } from 'react-intl'
import { InputValidationEnum } from 'enums'

const AuthForm = () => {
  const authStore = useStore('authStore')
  const intl = useIntl()

  const [isLoading, setIsLoading] = useState(false)

  const schema = yup.object().shape({
    userName: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.is_required' }))
      .matches(InputValidationEnum.NO_SPACES, intl.formatMessage({ id: 'validation.not_valid' })),
    password: yup
      .string()
      .required(
        intl.formatMessage({
          id: 'validation.is_required',
        }),
      )
      .matches(InputValidationEnum.NO_SPACES_WITH_CHARACTERS, intl.formatMessage({ id: 'validation.not_valid' })),
  })

  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async data => {
    const { isRemember } = data
    setIsLoading(true)
    try {
      await authStore.signIn(data)
      authStore.setIsRememberMe(isRemember)
      authStore.setIsAuth(true)
      authStore.setUserName(data.userName)
      sendNotification(`Вы вошли как ${authStore.user.userName}`, 'success')
    } catch (error) {
      sendNotification(Object.values(error.response?.data.errors.password || error.response?.data.errors.Alert)[0] || error.message, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return authStore.isAuth ? (
    <Redirect to="/" />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      {errors.userName && <span>{errors.userName.message}</span>}
      <label htmlFor="userName">{intl.formatMessage({ id: 'global.login' })}</label>
      <input name="userName" ref={register} type="text" placeholder={intl.formatMessage({ id: 'global.name' })} />
      {errors.password && <span>{errors.password.message}</span>}
      <label htmlFor="password">{intl.formatMessage({ id: 'global.password' })}</label>
      <input name="password" ref={register} type="password" placeholder={intl.formatMessage({ id: 'global.password' })} />
      <button type="submit" className="btn-primary">
        {isLoading ? <Spinner animation="border" size="sm" /> : <p>Войти</p>}
      </button>
    </form>
  )
}

export default AuthForm
