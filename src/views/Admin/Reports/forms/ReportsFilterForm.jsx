import { useState, useEffect, useCallback } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Button, Row } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import DatePicker from 'react-date-picker'
import moment from 'moment'
import { YesNoEnum, ZeroNonzeroEnum } from 'enums'
import './Forms.scss'

export const ReportsFilterForm = ({ data, onSubmit, hideWindow, resetFilter, initFilterValue }) => {
  const intl = useIntl()

  const [dateFrom, setDateFrom] = useState(null)
  const onDateFromChange = useCallback(date => setDateFrom(date), [])
  const [dateTo, setDateTo] = useState(null)
  const onDateToChange = useCallback(date => setDateTo(date), [])

  const validationSchema = Yup.object().shape({
    clientName: Yup.string(),
    clientPhone: Yup.string(),
    officeId: Yup.number(),
    // branchId: Yup.number(),
    loanAmountFrom: Yup.number(),
    loanAmountTo: Yup.number(),
    improvementId: Yup.number(),
    worksSavingAmount: Yup.number(),
    energyEfficient: Yup.number(),
    worksOnTheirOwn: Yup.number(),
    coalSavingAmount: Yup.number(),
    coalSavingVolume: Yup.number(),
    materialSavingAmount: Yup.number(),
    loanOfficerName: Yup.string(),
    dateFrom: Yup.string(),
    dateTo: Yup.string(),
    improvementAddress: Yup.string(),
    creditIssued: Yup.number(),
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

  const onFormSubmit = data => {
    let from = dateFrom && moment(dateFrom).format('YYYY-MM-DD')
    let to = dateTo && moment(dateTo).format('YYYY-MM-DD')
    onSubmit({ ...data, dateFrom: from, dateTo: to })
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="form form_container">
      <Row className="window_body">
        <label htmlFor="clientName">{intl.formatMessage({ id: 'reports.client_name' })}</label>
        <input name="clientName" ref={register} type="text" />

        <label htmlFor="clientPhone">{intl.formatMessage({ id: 'reports.client_phone' })}</label>
        <input name="clientPhone" ref={register} type="text" />

        <label htmlFor="priceFrom">{intl.formatMessage({ id: 'reports.office' })}</label>
        <select name="officeId" aria-label="Default select example" ref={register} defaultValue={-1}>
          <option value={-1} key={-1}>
            {intl.formatMessage({ id: 'global.not_specified' })}
          </option>
          {data?.officesList?.map(el => (
            <option value={el.id} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>
        {/* 
        <label htmlFor="branchId">{intl.formatMessage({ id: 'reports.branch' })}</label>
        <select name="branchId" aria-label="Default select example" ref={register} defaultValue={-1}>
          <option value={-1} key={-1}>
            {intl.formatMessage({ id: 'global.not_specified' })}
          </option>
          {data?.filialsList?.map(el => (
            <option value={el.id} key={el.id}>
              {el.name}
            </option>
          ))}
        </select> */}

        <label htmlFor="loanAmountFrom">{intl.formatMessage({ id: 'reports.price_from' })}</label>
        <input name="loanAmountFrom" ref={register} type="number" defaultValue={0} />

        <label htmlFor="loanAmountTo">{intl.formatMessage({ id: 'reports.price_to' })}</label>
        <input name="loanAmountTo" ref={register} type="number" defaultValue={0} />

        <label htmlFor="improvementId">{intl.formatMessage({ id: 'reports.improvement' })}</label>
        <select name="improvementId" aria-label="Default select example" ref={register} defaultValue={-1}>
          <option value={-1} key={-1}>
            {intl.formatMessage({ id: 'global.not_specified' })}
          </option>
          {data?.improvementsList?.map(el => (
            <option value={el.id} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>

        <label htmlFor="worksSavingAmount">{intl.formatMessage({ id: 'reports.works_saving_amount' })}</label>
        <select name="worksSavingAmount" aria-label="Default select example" ref={register} defaultValue={ZeroNonzeroEnum.NOT_SPECIFIED}>
          <option value={ZeroNonzeroEnum.NOT_SPECIFIED} key={'worksSavingAmount-1'}>
            {intl.formatMessage({ id: 'global.not_specified' })}
          </option>
          <option value={ZeroNonzeroEnum.ZERO} key={'worksSavingAmount0'}>
            {intl.formatMessage({ id: 'global.only_zero' })}
          </option>
          <option value={ZeroNonzeroEnum.NON_ZERO} key={'worksSavingAmount1'}>
            {intl.formatMessage({ id: 'global.nonzero' })}
          </option>
        </select>

        <label htmlFor="energyEfficient">{intl.formatMessage({ id: 'reports.energy_efficient' })}</label>
        <select name="energyEfficient" aria-label="Default select example" ref={register} defaultValue={YesNoEnum.NOT_SPECIFIED}>
          <option value={YesNoEnum.NOT_SPECIFIED} key={'energyEfficient-1'}>
            {intl.formatMessage({ id: 'global.not_specified' })}
          </option>
          <option value={YesNoEnum.YES} key={'energyEfficient-yes'}>
            {intl.formatMessage({ id: 'global.yes' })}
          </option>
          <option value={YesNoEnum.NO} key={'energyEfficient-no'}>
            {intl.formatMessage({ id: 'global.no' })}
          </option>
        </select>

        <label htmlFor="worksOnTheirOwn">{intl.formatMessage({ id: 'reports.works_on_their_own' })}</label>
        <select name="worksOnTheirOwn" aria-label="Default select example" ref={register} defaultValue={YesNoEnum.NOT_SPECIFIED}>
          <option value={YesNoEnum.NOT_SPECIFIED} key={'worksOnTheirOwn-1'}>
            {intl.formatMessage({ id: 'global.not_specified' })}
          </option>
          <option value={YesNoEnum.YES} key={'worksOnTheirOwn-yes'}>
            {intl.formatMessage({ id: 'global.yes' })}
          </option>
          <option value={YesNoEnum.NO} key={'worksOnTheirOwn-no'}>
            {intl.formatMessage({ id: 'global.no' })}
          </option>
        </select>

        <label htmlFor="coalSavingAmount">{intl.formatMessage({ id: 'reports.coal_saving_amount' })}</label>
        <select name="coalSavingAmount" aria-label="Default select example" ref={register} defaultValue={ZeroNonzeroEnum.NOT_SPECIFIED}>
          <option value={ZeroNonzeroEnum.NOT_SPECIFIED} key={'coalSavingAmount_-1'}>
            {intl.formatMessage({ id: 'global.not_specified' })}
          </option>
          <option value={ZeroNonzeroEnum.ZERO} key={'coalSavingAmount_0'}>
            {intl.formatMessage({ id: 'global.only_zero' })}
          </option>
          <option value={ZeroNonzeroEnum.NON_ZERO} key={'coalSavingAmount_1'}>
            {intl.formatMessage({ id: 'global.nonzero' })}
          </option>
        </select>

        <label htmlFor="coalSavingVolume">{intl.formatMessage({ id: 'reports.coal_saving_volume' })}</label>
        <select name="coalSavingVolume" aria-label="Default select example" ref={register} defaultValue={ZeroNonzeroEnum.NOT_SPECIFIED}>
          <option value={ZeroNonzeroEnum.NOT_SPECIFIED} key={'coalSavingVolume_-1'}>
            {intl.formatMessage({ id: 'global.not_specified' })}
          </option>
          <option value={ZeroNonzeroEnum.ZERO} key={'coalSavingVolume_0'}>
            {intl.formatMessage({ id: 'global.only_zero' })}
          </option>
          <option value={ZeroNonzeroEnum.NON_ZERO} key={'coalSavingVolume_1'}>
            {intl.formatMessage({ id: 'global.nonzero' })}
          </option>
        </select>

        <label htmlFor="materialSavingAmount">{intl.formatMessage({ id: 'reports.material_saving_amount' })}</label>
        <select name="materialSavingAmount" aria-label="Default select example" ref={register} defaultValue={ZeroNonzeroEnum.NOT_SPECIFIED}>
          <option value={ZeroNonzeroEnum.NOT_SPECIFIED} key={'materialSavingAmount_-1'}>
            {intl.formatMessage({ id: 'global.not_specified' })}
          </option>
          <option value={ZeroNonzeroEnum.ZERO} key={'materialSavingAmount_0'}>
            {intl.formatMessage({ id: 'global.only_zero' })}
          </option>
          <option value={ZeroNonzeroEnum.NON_ZERO} key={'materialSavingAmount_1'}>
            {intl.formatMessage({ id: 'global.nonzero' })}
          </option>
        </select>

        <label htmlFor="loanOfficerName">{intl.formatMessage({ id: 'reports.loan_officer_name' })}</label>
        <input name="loanOfficerName" ref={register} type="text" />

        <label htmlFor="dateFrom">{intl.formatMessage({ id: 'reports.date_from' })}</label>
        <DatePicker
          maxDate={dateTo}
          onChange={onDateFromChange}
          value={dateFrom}
          locale={`${intl.defaultLocale.toUpperCase()}-${intl.defaultLocale}`}
        />

        <label htmlFor="dateFrom">{intl.formatMessage({ id: 'reports.date_to' })}</label>
        <DatePicker
          minDate={dateFrom}
          onChange={onDateToChange}
          value={dateTo}
          locale={`${intl.defaultLocale.toUpperCase()}-${intl.defaultLocale}`}
        />

        <label htmlFor="improvementAddress">{intl.formatMessage({ id: 'reports.improvement_location_address' })}</label>
        <input name="improvementAddress" ref={register} type="text" />

        <label htmlFor="creditIssued">{intl.formatMessage({ id: 'reports.credit_issued' })}</label>
        <select name="creditIssued" aria-label="Default select example" ref={register} defaultValue={YesNoEnum.NOT_SPECIFIED}>
          <option value={YesNoEnum.NOT_SPECIFIED} key={'creditIssued-1'}>
            {intl.formatMessage({ id: 'global.not_specified' })}
          </option>
          <option value={YesNoEnum.YES} key={'creditIssued-yes'}>
            {intl.formatMessage({ id: 'global.yes' })}
          </option>
          <option value={YesNoEnum.NO} key={'creditIssued-no'}>
            {intl.formatMessage({ id: 'global.no' })}
          </option>
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
ReportsFilterForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
  hideWindow: PropTypes.func,
  resetFilter: PropTypes.func,
  initFilterValue: PropTypes.object,
}
export default ReportsFilterForm
