import { useState } from 'react'
import { Row, CloseButton } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './TableFilterWindow.scss'
import { useIntl } from 'react-intl'

export const TableFilterWindow = ({ isOpen, hideWindow, onSubmit, data, resetFilter, initFilterValues, FilterForm }) => {
  const intl = useIntl()

  const [initFilterValue, setInitFilterValue] = useState(initFilterValues)

  const handleSubmit = data => {
    onSubmit(data)
    setInitFilterValue(data)
  }

  const handleResetFilter = () => {
    resetFilter()
    setInitFilterValue(initFilterValues)
  }

  return (
    <>
      {isOpen && (
        <Row className="window_container">
          <Row className="window_header">
            <h3>{intl.formatMessage({ id: 'global.filters' })}</h3>
            <CloseButton onClick={hideWindow} />
          </Row>
          <FilterForm hideWindow={hideWindow} onSubmit={handleSubmit} data={data} resetFilter={handleResetFilter} initFilterValue={initFilterValue} />
        </Row>
      )}
    </>
  )
}
TableFilterWindow.propTypes = {
  isOpen: PropTypes.bool,
  hideWindow: PropTypes.func,
  onSubmit: PropTypes.func,
  resetFilter: PropTypes.func,
  data: PropTypes.object,
  initFilterValues: PropTypes.object,
  FilterForm: PropTypes.any,
}
export default TableFilterWindow
