import { MultilingualForm } from 'components'
import { Row } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { useCallback } from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { InputValidationEnum } from 'enums'

export const WorkForm = ({ onSubmit, data }) => {
  const intl = useIntl()

  const formFields = useCallback(() => {
    return {
      multilingualFields: {
        ky_KG: [
          {
            type: 'text',
            name: 'workName__ky_KG',
            placeholder: intl.formatMessage({ id: 'reference_books.work_name_placeholder' }),
            label: intl.formatMessage({ id: 'reference_books.work_name' }),
          },
        ],
        ru_RU: [
          {
            type: 'text',
            name: 'workName__ru_RU',
            placeholder: intl.formatMessage({ id: 'reference_books.work_name_placeholder' }),
            label: intl.formatMessage({ id: 'reference_books.work_name' }),
          },
        ],
        en_US: [
          {
            type: 'text',
            name: 'workName__en_US',
            placeholder: intl.formatMessage({ id: 'reference_books.work_name_placeholder' }),
            label: intl.formatMessage({ id: 'reference_books.work_name' }),
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
          name: 'workTypeId',
          label: intl.formatMessage({ id: 'reference_books.work_type' }),
          options: data?.workTypesList,
        },
      ],
    }
  }, [data?.workTypesList, data?.measurementUnitsList, intl])

  const fields = formFields()

  const validationSchema = Yup.object().shape({
    workName__ky_KG: Yup.string().matches(InputValidationEnum.NO_ONLY_SPACES_CAN_BE_EMPTY, intl.formatMessage({ id: 'validation.not_valid' })),
    workName__en_US: Yup.string().matches(InputValidationEnum.NO_ONLY_SPACES_CAN_BE_EMPTY, intl.formatMessage({ id: 'validation.not_valid' })),
    workName__ru_RU: Yup.string()
      .typeError(intl.formatMessage({ id: 'validation.is_required' }))
      .required(intl.formatMessage({ id: 'validation.is_required' }))
      .matches(InputValidationEnum.NO_ONLY_SPACES, intl.formatMessage({ id: 'validation.not_valid' })),
    measurementUnitId: Yup.number().required(),
    workTypeId: Yup.number().required(),
  })

  return (
    <Row>
      <MultilingualForm validationSchema={validationSchema} formFields={fields} onSubmit={onSubmit} data={data} />
    </Row>
  )
}
WorkForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
}
