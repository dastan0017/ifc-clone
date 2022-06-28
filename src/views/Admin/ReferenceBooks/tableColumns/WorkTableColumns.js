import { Row } from 'react-bootstrap'
import { TooltipButton } from 'components'
import { EditBtnIcon, DeleteBtnIcon } from 'icons'
import { useIntl } from 'react-intl'

// eslint-disable-next-line react/prop-types
export const WorkTableColumns = openModal => {
  const intl = useIntl()
  return [
    {
      dataField: 'name',
      text: intl.formatMessage({ id: 'reference_books.work' }),
      formatter: (name, row) => <Row className="id_cell">{name}</Row>,
    },
    {
      dataField: 'measurementUnit',
      text: intl.formatMessage({ id: 'reference_books.measurement_unit' }),
      formatter: (measurementUnit, row) => <div>{measurementUnit.name}</div>,
    },
    {
      dataField: 'workType',
      text: intl.formatMessage({ id: 'reference_books.work_type' }),
      formatter: (workType, row) => <div>{workType.name}</div>,
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
