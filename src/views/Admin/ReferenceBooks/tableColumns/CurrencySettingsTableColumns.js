import { Row } from 'react-bootstrap'
import { TooltipButton } from 'components'
import { EditBtnIcon, DeleteBtnIcon } from 'icons'
import { useIntl } from 'react-intl'
import { CurrencyCodeEnum } from 'enums'

// eslint-disable-next-line react/prop-types
export const CurrencySettingsTableColumns = openModal => {
  const intl = useIntl()
  return [
    {
      dataField: 'name',
      text: intl.formatMessage({ id: 'reference_books.currency' }),
      formatter: (name, row) => <Row className="id_cell">{name}</Row>,
    },
    {
      dataField: 'isoCode',
      text: intl.formatMessage({ id: 'reference_books.currency_code' }),
      formatter: (isoCode, row) => <Row>{CurrencyCodeEnum[isoCode] ? CurrencyCodeEnum[isoCode] : isoCode}</Row>,
    },
    {
      dataField: 'ratio',
      text: intl.formatMessage({ id: 'reference_books.currency_rate' }),
    },
    {
      dataField: 'lastModified',
      text: intl.formatMessage({ id: 'global.last_modified' }),
      sort: true,
      formatter: (cell, row) => cell?.slice(0, 16).split('T').join('  '),
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
