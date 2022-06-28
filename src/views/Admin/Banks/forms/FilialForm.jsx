import { useEffect } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { InputValidationEnum } from 'enums'

export const FilialForm = ({ data, onSubmit }) => {
  const intl = useIntl()
  const validationSchema = Yup.object().shape({
    filialName: Yup.string()
      .required(intl.formatMessage({ id: 'validation.is_required' }))
      .matches(InputValidationEnum.NO_ONLY_SPACES, intl.formatMessage({ id: 'validation.not_valid' })),
    priceRegionId: Yup.number().required(intl.formatMessage({ id: 'validation.is_required' })),
  })

  const formOptions = { resolver: yupResolver(validationSchema) }

  const { register, handleSubmit, reset, errors } = useForm(formOptions)

  useEffect(() => {
    reset({ priceRegionId: data?.priceRegionId, filialName: data?.name })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <form className="form_container" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="priceRegionId">{intl.formatMessage({ id: 'global.region' })}</label>
      <select name="priceRegionId" aria-label="Default select example" ref={register}>
        {data.priceRegionsList?.map((region, idx) => (
          <option value={region.id} key={idx}>
            {region.name}
          </option>
        ))}
      </select>

      {errors.filialName && <span style={{ color: 'red' }}>{errors.filialName.message}</span>}
      <label htmlFor="filialName">{intl.formatMessage({ id: 'global.branch_name' })}</label>
      <input name="filialName" ref={register} type="text" placeholder={intl.formatMessage({ id: 'placeholder.enter_filial_name' })} />

      <button type="submit" className="btn btn-primary mt-4">
        {intl.formatMessage({ id: 'global.save' })}
      </button>
    </form>
  )
}
FilialForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
}
export default FilialForm
