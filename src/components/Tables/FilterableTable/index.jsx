import { useState, useEffect, useCallback } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import { Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import paginationFactory, { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator'
import { useIntl } from 'react-intl'
import '../Table.scss'

const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => {
  return (
    <>
      <div className="btn-group" role="group">
        {options.map(option => {
          const isSelect = currSizePerPage === `${option.page}`
          return (
            <button
              key={option.text}
              type="button"
              onClick={() => onSizePerPageChange(option.page)}
              className={`btn ${isSelect ? 'btn-dark' : 'btn-secondary'}`}
            >
              {option.text}
            </button>
          )
        })}
      </div>
    </>
  )
}

export const FilterableTable = ({ data, openModal, tableColumns, filterTable, tableRef, className, ...props }) => {
  const intl = useIntl()

  const [tableData, setTableData] = useState(data)
  useEffect(() => {
    setTableData(data)
  }, [data])

  const filter = useCallback(
    params => {
      setTableData(filterTable(params, data))
    },
    [data, filterTable],
  )

  const resetFilter = useCallback(() => {
    setTableData(data)
  }, [data])

  useEffect(() => {
    tableRef &&
      (tableRef.current = {
        filter,
        resetFilter,
      })
  }, [filter, resetFilter, tableRef])

  const paginationOptions = {
    sizePerPageRenderer,
    custom: true,
    totalSize: data?.length,
  }

  return (
    <Row className={`table_container ${className}`}>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => (
          <>
            <Row className="table_container">
              <BootstrapTable keyField="id" data={tableData} columns={tableColumns} {...paginationTableProps} {...props} />
            </Row>
            <Row className="table_pagination">
              <Row className="page_size_changer">
                <p>{intl.formatMessage({ id: 'global.rows_per_page' })}</p>
                <SizePerPageDropdownStandalone className="custom-page-dropwown" {...paginationProps} />
              </Row>
              <PaginationListStandalone {...paginationProps} />
            </Row>
          </>
        )}
      </PaginationProvider>
    </Row>
  )
}
FilterableTable.propTypes = {
  data: PropTypes.array,
  openModal: PropTypes.func,
  tableColumns: PropTypes.array,
  filterTable: PropTypes.func,
  tableRef: PropTypes.any,
  className: PropTypes.string,
}
export default FilterableTable
