import { Row } from 'react-bootstrap'
import { TooltipButton } from 'components'
import { EditBtnIcon, DeleteBtnIcon } from 'icons'
import { useIntl } from 'react-intl'
import { useStore } from 'hooks'

// eslint-disable-next-line react/prop-types
export const PriceRegionsTableColumns = openModal => {
  const intl = useIntl()
  const { updatePriceRegion, getPriceRegionList } = useStore('referenceBooksStore')

  const handleIsHeadChange = async (isHead, data) => {
    try {
      const newData = { ...data, isHead: !isHead }
      await updatePriceRegion(newData)
      await getPriceRegionList()
    } catch (err) {
      console.log(err)
    }
  }

  return [
    {
      dataField: 'name',
      text: intl.formatMessage({ id: 'reference_books.price_region' }),
      formatter: (name, row) => <Row className="id_cell">{name}</Row>,
    },
    {
      dataField: 'isHead',
      text: intl.formatMessage({ id: 'reference_books.is_head' }),
      formatter: (isHead, row) => {
        return <button className={`isHead isHead_${isHead ? 'yes' : 'no'}`} onClick={() => handleIsHeadChange(isHead, row)}></button>
      },
      classes: 'column_ishead',
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
      headerStyle: {
        right: '5px',
        position: 'absolute',
      },
    },
  ]
}
