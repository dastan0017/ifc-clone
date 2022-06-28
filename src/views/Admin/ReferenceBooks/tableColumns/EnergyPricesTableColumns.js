import { Row } from 'react-bootstrap'
import { TooltipButton, ToggleSwitch } from 'components'
import { EditBtnIcon, DeleteBtnIcon } from 'icons'
import { useIntl } from 'react-intl'
import { MeasurementUnitEnum } from 'enums'
// eslint-disable-next-line react/prop-types
export const EnergyPricesTableColumns = openModal => {
  const intl = useIntl()
  return [
    {
      dataField: 'priceRegion',
      text: intl.formatMessage({ id: 'reference_books.price_region' }),
      formatter: (region, row, rowIndex) => <Row className="id_cell">{region.name}</Row>,
    },
    {
      dataField: 'typeId',
      text: intl.formatMessage({ id: 'reference_books.measurement_unit' }),
      formatter: (typeId, row) => <Row>{intl.formatMessage({ id: `measurement.${MeasurementUnitEnum[typeId]}` })}</Row>,
    },
    // {
    //   dataField: 'Дата изменения',
    //   text: intl.formatMessage({ id: 'reference_books.date_of_change' }),
    //   sort: true,
    // },
    {
      dataField: 'price',
      text: intl.formatMessage({ id: 'reference_books.price' }),
      sort: true,
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
