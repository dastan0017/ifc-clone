import { Row } from 'react-bootstrap'
import { TooltipButton } from 'components'
import { EditBtnIcon, DeleteBtnIcon } from 'icons'
import { useIntl } from 'react-intl'

// eslint-disable-next-line react/prop-types
export const MaterialsTableColumns = openModal => {
  const intl = useIntl()
  return [
    {
      dataField: 'name',
      text: intl.formatMessage({ id: 'reference_books.material' }),
      formatter: (name, row) => <Row className="id_cell">{name}</Row>,
    },
    {
      dataField: 'measurementUnit',
      text: intl.formatMessage({ id: 'reference_books.measurement_unit' }),
      formatter: (measurementUnit, row) => <div>{measurementUnit.name}</div>,
    },
    {
      dataField: 'materialType',
      text: intl.formatMessage({ id: 'reference_books.material_type' }),
      formatter: (materialType, row) => <div>{materialType.name}</div>,
    },
    {
      dataField: 'isDeletable',
      text: intl.formatMessage({ id: 'actions' }),
      formatter: (isDeletable, row) => {
        return (
          <Row className="action_cell">
            <TooltipButton ButtonIcon={EditBtnIcon} onClick={() => openModal(row, 'edit')} tooltipText={intl.formatMessage({ id: 'global.edit' })} />
            {isDeletable && (
              <TooltipButton
                ButtonIcon={DeleteBtnIcon}
                onClick={() => openModal(row, 'delete')}
                tooltipText={intl.formatMessage({ id: 'global.delete' })}
              />
            )}
          </Row>
        )
      },
    },
  ]
}
