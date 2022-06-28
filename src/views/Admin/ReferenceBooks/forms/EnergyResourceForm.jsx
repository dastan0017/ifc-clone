import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'react-bootstrap'

export const EnergyResourceForm = ({ onSubmit, data }) => {
  const intl = useIntl()

  const schema = yup.object().shape({
    priceRegionId: yup.number(),
    typeId: yup.number(),
    price: yup
      .number(intl.formatMessage({ id: 'validation.not_valid' }))
      .typeError(intl.formatMessage({ id: 'validation.is_required' }))
      .positive(intl.formatMessage({ id: 'validation.not_valid' }))
      .required(intl.formatMessage({ id: 'validation.is_required' })),
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

  const handleFormSubmit = formData => {
    const _data = data.action !== 'add' ? { typeId: data?.initValues.typeId, ...formData } : formData
    onSubmit(_data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="form form_container">
        {data.action === 'add' && (
          <>
            <label htmlFor="priceRegionId">{intl.formatMessage({ id: 'reference_books.price_region' })}</label>
            <select name="priceRegionId" aria-label="Default select example" ref={register}>
              {data?.priceRegionList?.map(el => (
                <option value={el.id} key={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
            {data?.energyTypeId === null && (
              <>
                <label htmlFor="typeId">{intl.formatMessage({ id: 'reference_books.resource_type' })}</label>
                <select name="typeId" aria-label="Default select example" ref={register}>
                  {data?.energyResourceTypeList?.map(el => (
                    <option value={el.id} key={el.id}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </>
            )}
          </>
        )}

        {errors.price && <span style={{ color: 'red' }}>{errors.price.message}</span>}
        <label htmlFor="price">{intl.formatMessage({ id: 'reference_books.price' })}</label>
        <input
          style={errors.price && { border: '1px solid red' }}
          name="price"
          type="number"
          placeholder={intl.formatMessage({ id: 'placeholder.enter_price' })}
          ref={register}
        />

        <Button type="submit" className="btn-primary modal_btn">
          {intl.formatMessage({ id: 'global.save' })}
        </Button>
      </form>
    </>
  )
}
EnergyResourceForm.propTypes = {
  onSubmit: PropTypes.func,
  data: PropTypes.object,
}
