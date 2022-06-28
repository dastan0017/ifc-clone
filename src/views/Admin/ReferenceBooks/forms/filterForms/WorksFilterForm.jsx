import { useEffect } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Button, Row } from 'react-bootstrap'
import { useIntl } from 'react-intl'

export const WorksFilterForm = ({ data, onSubmit, hideWindow, resetFilter, initFilterValue }) => {
  const intl = useIntl()

  const validationSchema = Yup.object().shape({
    workTypeId: Yup.number(),
    measurementUnitId: Yup.number(),
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, reset, errors } = useForm(formOptions)

  // set initial values
  useEffect(() => {
    reset({ ...initFilterValue })
  }, [initFilterValue, reset])

  const onCancel = () => {
    resetFilter()
    hideWindow()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form form_container">
      <Row className="window_body">
        <label htmlFor="workTypeId">{intl.formatMessage({ id: 'reference_books.work_type' })}</label>
        <select name="workTypeId" aria-label="Default select example" ref={register} defaultValue={-1}>
          <option value={-1} key={-1}>
            {intl.formatMessage({ id: 'global.not_specified' })}
          </option>
          {data?.workTypesList?.map(el => (
            <option value={el.id} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>

        <label htmlFor="measurementUnitId">{intl.formatMessage({ id: 'reference_books.measurement_unit' })}</label>
        <select name="measurementUnitId" aria-label="Default select example" ref={register} defaultValue={-1}>
          <option value={-1} key={-1}>
            {intl.formatMessage({ id: 'global.not_specified' })}
          </option>
          {data?.measurementUnitsList?.map(el => (
            <option value={el.id} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>
      </Row>
      <Row className="window_footer">
        <Button type="submit">{intl.formatMessage({ id: 'global.apply' })}</Button>
        <Button variant="secondary" onClick={onCancel}>
          {intl.formatMessage({ id: 'global.cancel' })}
        </Button>
      </Row>
    </form>
  )
}
WorksFilterForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
  hideWindow: PropTypes.func,
  resetFilter: PropTypes.func,
  initFilterValue: PropTypes.object,
}
export default WorksFilterForm
