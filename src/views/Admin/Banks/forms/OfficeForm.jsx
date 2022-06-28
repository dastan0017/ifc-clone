import { useEffect } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { InputValidationEnum } from 'enums'

export const OfficeForm = ({ data, onSubmit }) => {
  const intl = useIntl()

  const validationSchema = Yup.object().shape({
    officeName: Yup.string()
      .required(intl.formatMessage({ id: 'validation.is_required' }))
      .matches(InputValidationEnum.NO_ONLY_SPACES, intl.formatMessage({ id: 'validation.not_valid' })),
    priceRegionId: Yup.number().required(intl.formatMessage({ id: 'validation.is_required' })),
  })

  const formOptions = { resolver: yupResolver(validationSchema) }

  const { register, handleSubmit, reset, errors } = useForm(formOptions)

  useEffect(() => {
    reset({ priceRegionId: data.priceRegionId, officeName: data?.name })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <form className="form_container" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="priceRegionId">{intl.formatMessage({ id: 'global.region' })}</label>
      <select name="priceRegionId" aria-label="Default select example" ref={register}>
        {data?.priceRegionsList.map((el, idx) => (
          <option key={idx} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
      {errors.officeName && <span style={{ color: 'red' }}>{errors.officeName.message}</span>}
      <label htmlFor="officeName">{intl.formatMessage({ id: 'office.name' })}</label>
      <input name="officeName" ref={register} type="text" placeholder={intl.formatMessage({ id: 'office_create.placeholder' })} />

      <button type="submit" className="btn btn-primary mt-4">
        {intl.formatMessage({ id: 'global.save' })}
      </button>
    </form>
  )
}
OfficeForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
}
export default OfficeForm
