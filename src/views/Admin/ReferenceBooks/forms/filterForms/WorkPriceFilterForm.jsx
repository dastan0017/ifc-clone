import { useEffect } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Button, Row } from 'react-bootstrap'
import { useIntl } from 'react-intl'

export const WorkPricesFilterForm = ({ data, onSubmit, hideWindow, resetFilter, initFilterValue }) => {
  const intl = useIntl()

  const validationSchema = Yup.object().shape({
    currencyId: Yup.number(),
    priceRegionId: Yup.number(),
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
        <label htmlFor="currencyId">{intl.formatMessage({ id: 'reference_books.currency' })}</label>
        <select name="currencyId" aria-label="Default select example" ref={register} defaultValue={-1}>
          <option value={-1} key={-1}>
            {intl.formatMessage({ id: 'global.not_specified' })}
          </option>
          {data?.currencyList?.map(el => (
            <option value={el.id} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>

        <label htmlFor="priceRegionId">{intl.formatMessage({ id: 'reference_books.price_region' })}</label>
        <select name="priceRegionId" aria-label="Default select example" ref={register} defaultValue={-1}>
          <option value={-1} key={-1}>
            {intl.formatMessage({ id: 'global.not_specified' })}
          </option>
          {data?.priceRegionsList?.map(el => (
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
WorkPricesFilterForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
  hideWindow: PropTypes.func,
  resetFilter: PropTypes.func,
  initFilterValue: PropTypes.object,
}
export default WorkPricesFilterForm
