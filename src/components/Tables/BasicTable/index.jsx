/* eslint-disable jsx-a11y/anchor-is-valid */
import BootstrapTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import { Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import '../Table.scss'
import paginationFactory, { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator'
import { useIntl } from 'react-intl'

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

export const BasicTable = ({ data, openModal, tableColumns, ...props }) => {
  const intl = useIntl()

  const paginationOptions = {
    sizePerPageRenderer,
    custom: true,
    totalSize: data?.length,
  }

  return (
    <PaginationProvider pagination={paginationFactory(paginationOptions)}>
      {({ paginationProps, paginationTableProps }) => (
        <>
          <Row className="table_container">
            <BootstrapTable keyField="id" data={data} columns={tableColumns} {...paginationTableProps} {...props} />
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
  )
}

BasicTable.propTypes = {
  data: PropTypes.array,
  openModal: PropTypes.func,
  tableColumns: PropTypes.array,
}
export default BasicTable
