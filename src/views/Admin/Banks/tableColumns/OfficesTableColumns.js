import { Row } from 'react-bootstrap'
import { TooltipButton, PlusButton } from 'components'
import { EditBtnIcon, DeleteBtnIcon } from 'icons'
import { useIntl } from 'react-intl'

// eslint-disable-next-line react/prop-types
export const OfficesTableColumns = openModal => {
  const intl = useIntl()
  return [
    {
      dataField: 'name',
      text: intl.formatMessage({ id: 'global.office' }),
    },
    {
      dataField: 'isDeletable',
      text: intl.formatMessage({ id: 'actions' }),
      headerFormatter: () => <PlusButton onClick={openModal} />,
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
      headerStyle: {
        position: 'absolute',
        right: 0,
        top: '-5px',
      },
    },
  ]
}
