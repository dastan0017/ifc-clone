import { MultilingualForm } from 'components'
import { Row } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { useCallback } from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { InputValidationEnum } from 'enums'

export const MaterialForm = ({ onSubmit, data }) => {
  const intl = useIntl()

  const formFields = useCallback(() => {
    return {
      multilingualFields: {
        ky_KG: [
          {
            type: 'text',
            name: 'materialName__ky_KG',
            placeholder: intl.formatMessage({ id: 'reference_books.material_name_placeholder' }),
            label: intl.formatMessage({ id: 'reference_books.material_name' }),
          },
        ],
        ru_RU: [
          {
            type: 'text',
            name: 'materialName__ru_RU',
            placeholder: intl.formatMessage({ id: 'reference_books.material_name_placeholder' }),
            label: intl.formatMessage({ id: 'reference_books.material_name' }),
          },
        ],
        en_US: [
          {
            type: 'text',
            name: 'materialName__en_US',
            placeholder: intl.formatMessage({ id: 'reference_books.material_name_placeholder' }),
            label: intl.formatMessage({ id: 'reference_books.material_name' }),
          },
        ],
      },
      staticFields: [
        {
          type: 'select',
          name: 'measurementUnitId',
          label: intl.formatMessage({ id: 'reference_books.measurement_unit' }),
          options: data?.measurementUnitsList,
        },
        {
          type: 'select',
          name: 'materialTypeId',
          label: intl.formatMessage({ id: 'reference_books.material_type' }),
          options: data?.materialTypesList,
        },
      ],
    }
  }, [data?.materialTypesList, data?.measurementUnitsList, intl])

  const fields = formFields()

  const materialFormSchema = Yup.object().shape({
    materialName__ky_KG: Yup.string().matches(InputValidationEnum.NO_ONLY_SPACES_CAN_BE_EMPTY, intl.formatMessage({ id: 'validation.not_valid' })),
    materialName__en_US: Yup.string().matches(InputValidationEnum.NO_ONLY_SPACES_CAN_BE_EMPTY, intl.formatMessage({ id: 'validation.not_valid' })),
    materialName__ru_RU: Yup.string()
      .typeError(intl.formatMessage({ id: 'validation.is_required' }))
      .required(intl.formatMessage({ id: 'validation.is_required' }))
      .matches(InputValidationEnum.NO_ONLY_SPACES, intl.formatMessage({ id: 'validation.not_valid' })),
    measurementUnitId: Yup.number().required(),
    materialTypeId: Yup.number().required(),
  })

  return (
    <Row>
      <MultilingualForm validationSchema={materialFormSchema} formFields={fields} onSubmit={onSubmit} data={data} />
    </Row>
  )
}
MaterialForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
}
