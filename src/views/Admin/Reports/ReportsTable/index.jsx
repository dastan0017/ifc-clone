/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import { Row } from 'react-bootstrap'
import paginationFactory, { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator'
import PropTypes from 'prop-types'
import { ReportsTableColumns } from './tableColumns'
import { exportExcelByUrl } from 'utils'
import { sendNotification } from 'components/Toast'
import { useIntl } from 'react-intl'
import { filterReportsTable } from './helpers/filterReportsTable'
import { useStore } from 'hooks'
import { LanguageCodeEnum } from 'enums'
import './ReportsTable.scss'

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

export const ReportsTable = ({ data = [], openModal, tableRef, onTableSelected, ...props }) => {
  const intl = useIntl()
  let { updateReportsList, reportsList, deleteReportsList } = useStore('reportsStore')

  const columns = ReportsTableColumns(openModal, updateReport)
  const [selected, setSelected] = useState([])
  useEffect(() => {
    onTableSelected(selected)
  }, [selected, onTableSelected])

  const [tableData, setTableData] = useState(data)
  useEffect(() => {
    setTableData(data)
  }, [data])

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      setSelected([...selected, row])
    } else {
      setSelected(selected.filter(x => x?.id !== row.id))
    }
  }

  const handleOnSelectAll = (isSelect, rows) => {
    if (isSelect) {
      setSelected(rows)
    } else {
      setSelected([])
    }
  }

  const selectRow = {
    mode: 'checkbox',
    selected: selected.map(el => el.id),
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
    selectColumnPosition: 'right',
    classes: 'selected_row',
  }

  const exportExcel = async exportReportsList => {
    try {
      const urlToDownload = await exportReportsList(LanguageCodeEnum[intl.locale], 'excel').then(res => res.data)
      await exportExcelByUrl(urlToDownload)
    } catch (error) {
      sendNotification(intl.formatMessage({ id: 'global.default_error_message' }), 'error')
    }
  }

  const filterTable = params => {
    setTableData(filterReportsTable(params, data))
  }

  const resetTableFilter = () => {
    setTableData(data)
  }

  const deleteReports = async () => {
    const reportsIds = selected.map(report => report.id)
    try {
      await deleteReportsList(reportsIds)
    } catch (err) {
      sendNotification(intl.formatMessage({ id: 'global.default_error_message' }), 'error')
    } finally {
      setSelected([])
    }
  }

  useEffect(() => {
    tableRef.current = {
      exportExcel,
      filterTable,
      resetTableFilter,
      deleteReports,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, deleteReports])

  async function updateReport(updatedReport) {
    try {
      await updateReportsList([updatedReport])
    } catch (err) {
      sendNotification(intl.formatMessage({ id: 'global.default_error_message' }), 'error')
    }
  }

  const paginationOptions = {
    sizePerPageRenderer,
    custom: true,
    totalSize: data?.length,
  }

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => (
          <>
            <Row className="reports_table">
              <BootstrapTable keyField="id" data={tableData} columns={columns} selectRow={selectRow} {...paginationTableProps} />
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
    </>
  )
}
ReportsTable.propTypes = {
  data: PropTypes.array,
  openModal: PropTypes.func,
  tableRef: PropTypes.any,
  onTableSelected: PropTypes.func,
}
export default ReportsTable
