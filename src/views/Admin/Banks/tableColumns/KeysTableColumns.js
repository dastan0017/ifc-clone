import { Row } from 'react-bootstrap'
import { TooltipButton, PlusButton } from 'components'
import { EditBtnIcon, DeleteBtnIcon } from 'icons'
import { useIntl } from 'react-intl'

// eslint-disable-next-line react/prop-types
export const KeysTableColumns = openModal => {
  const intl = useIntl()
  return [
    {
      dataField: 'id',
      text: '№',
      sort: true,
      formatter: (cell, row, rowIndex) => <Row className="id_cell">{rowIndex + 1}</Row>,
    },
    {
      dataField: 'key',
      text: intl.formatMessage({ id: 'key' }),
    },
    {
      dataField: 'actions',
      text: intl.formatMessage({ id: 'actions' }),
      formatter: (cell, row) => {
        return (
          <Row className="action_cell">
            <TooltipButton ButtonIcon={EditBtnIcon} onClick={() => openModal(row, 'edit')} tooltipText={intl.formatMessage({ id: 'global.edit' })} />
            <TooltipButton
              ButtonIcon={DeleteBtnIcon}
              onClick={() => openModal(row, 'delete')}
              tooltipText={intl.formatMessage({ id: 'global.delete' })}
            />
          </Row>
        )
      },
    },
  ]
}
