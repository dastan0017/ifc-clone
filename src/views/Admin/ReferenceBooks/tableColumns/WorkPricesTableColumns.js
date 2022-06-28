import { Row } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { Select } from 'components'
import { useStore } from 'hooks'

// eslint-disable-next-line react/prop-types
export const WorkPricesTableColumns = (currencyList = []) => {
  const intl = useIntl()

  const { updateWorkPrice } = useStore('referenceBooksStore')

  const handleCurrencyChange = async ({ currencyId, ...data }) => {
    const updatedData = {
      Id: data.id,
      WorkId: data.work.id,
      PriceRegionId: data.priceRegion.id,
      CurrencyId: +currencyId,
      Price: data.price,
      Coefficient: data.coefficient,
    }

    try {
      await updateWorkPrice(updatedData)
    } catch (err) {
      console.log(err)
    }
  }
  return [
    {
      dataField: 'work',
      text: intl.formatMessage({ id: 'reference_books.work_name' }),
      formatter: (work, row, rowIndex) => <Row className="id_cell">{work.name}</Row>,
      filterValue: (work, row) => work.name, // we will search the value after filterValue called
    },
    {
      dataField: 'price',
      text: intl.formatMessage({ id: 'reference_books.price' }),
      searchable: false,
    },
    {
      dataField: 'lastModified',
      text: intl.formatMessage({ id: 'reference_books.date_of_change' }),
      formatter: (cell, row) => cell?.slice(0, 16).split('T').join('  '),
      searchable: false,
    },
    {
      dataField: 'priceRegion',
      text: intl.formatMessage({ id: 'reference_books.price_region' }),
      formatter: (region, row, rowIndex) => <Row>{region.name}</Row>,
      searchable: false,
    },
    {
      dataField: 'coefficient',
      text: intl.formatMessage({ id: 'reference_books.coefficient' }),
      searchable: false,
    },
    {
      dataField: 'currency',
      text: intl.formatMessage({ id: 'reference_books.currency' }),
      formatter: (currency, row, rowIndex) => (
        <Select list={currencyList} onChange={currencyId => handleCurrencyChange({ currencyId, ...row })} initValue={currency.id} />
      ),
      classes: 'dropdown',
      headerStyle: { minWidth: '170px' },
      searchable: false,
    },
  ]
}
