import { Row } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { Select } from 'components'
import { useStore } from 'hooks'

// eslint-disable-next-line react/prop-types
export const MaterialPricesTableColumns = (currencyList = []) => {
  const intl = useIntl()

  const { updateMaterialPrice } = useStore('referenceBooksStore')

  const handleCurrencyChange = async ({ currencyId, ...data }) => {
    const updatedData = {
      Id: data.id,
      MaterialId: data.material.id,
      PriceRegionId: data.priceRegion.id,
      SupplierId: data.supplier.id,
      CurrencyId: +currencyId,
      Price: data.price,
      Coefficient: data.coefficient,
    }

    try {
      await updateMaterialPrice(updatedData)
    } catch (err) {
      console.log(err)
    }
  }
  return [
    {
      dataField: 'material',
      text: intl.formatMessage({ id: 'reference_books.material_name' }),
      formatter: (material, row, rowIndex) => <Row className="id_cell">{material.name}</Row>,
      filterValue: (material, row) => material.name, // we will search the value after filterValue called
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
    {
      dataField: 'supplier',
      text: intl.formatMessage({ id: 'reference_books.supplier' }),
      formatter: (supplier, row, rowIndex) => <Row>{supplier.name}</Row>,
      searchable: false,
    },
  ]
}
