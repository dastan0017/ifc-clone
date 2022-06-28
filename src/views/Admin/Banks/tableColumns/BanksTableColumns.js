import { Row } from 'react-bootstrap'
import { TooltipButton } from 'components'
import { EditBtnIcon, DeleteBtnIcon } from 'icons'
import { useIntl } from 'react-intl'

// eslint-disable-next-line react/prop-types
export const BanksTableColumns = openModal => {
  const intl = useIntl()
  return [
    {
      dataField: 'name',
      text: intl.formatMessage({ id: 'global.bank' }),
      sort: true,
      formatter: (cell, row, rowIndex) => <Row className="id_cell">{cell}</Row>,
    },
    {
      dataField: 'branchesOfficesCount',
      text: intl.formatMessage({ id: 'global.offices' }),
      sort: true,
    },
    {
      dataField: 'branchesCount',
      text: intl.formatMessage({ id: 'global.filials' }),
      sort: true,
    },
    {
      dataField: 'keysCount',
      text: intl.formatMessage({ id: 'global.keys' }),
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
