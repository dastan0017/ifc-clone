import { Row } from 'react-bootstrap'
import { TooltipButton } from 'components'
import { EditBtnIcon, DeleteBtnIcon } from 'icons'
import { useIntl } from 'react-intl'

// eslint-disable-next-line react/prop-types
export const AdminsTableColumns = openModal => {
  const intl = useIntl()
  return [
    {
      dataField: 'id',
      text: '№',
      formatter: (cell, row, rowIndex) => <Row className="id_cell">{rowIndex + 1}</Row>,
    },
    {
      dataField: 'userName',
      text: intl.formatMessage({ id: 'global.login' }),
      sort: true,
    },
    {
      dataField: 'bank',
      text: intl.formatMessage({ id: 'global.bank' }),
      formatter: (bank, row) => <div>{bank.name}</div>,
      sort: true,
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
