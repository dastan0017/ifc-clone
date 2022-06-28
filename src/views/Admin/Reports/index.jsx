import { useEffect, useState, useRef } from 'react'
import { Row, Spinner, Button } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { useStore } from 'hooks'
import { observer } from 'mobx-react'
import { EmptyPage, TooltipButton, AddButton, TableFilterWindow } from 'components'
import { FilterButtonIcon, ExportCSVButtonIcon } from 'icons'
import { sendNotification } from 'components/Toast'
import { ReportsFilterForm } from './forms'
import { ReportsTable } from './ReportsTable'
import '../Pages.scss'

const ReportsPage = observer(() => {
  const intl = useIntl()
  let { getReportsList, reportsList, exportReportsAsExcel, getImprovementsList, improvementsList } = useStore('reportsStore')
  const { getOfficesList, getFilialsList, officesList, filialsList } = useStore('banksStore')

  const reportsTableRef = useRef(null)

  const [isLoading, setIsLoading] = useState(false)
  const [isFilterWindowOpen, setIsFilterWindowOpen] = useState(false)
  const [filterData, setFilterData] = useState({})

  const [isTableSelected, setIsTableSeleted] = useState(false)

  useEffect(() => {
    const getReports = async () => {
      try {
        setIsLoading(true)
        await getReportsList()
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getReports()
  }, [getReportsList])

  useEffect(() => {
    const getImprovements = async () => {
      try {
        await getImprovementsList()
      } catch (error) {
        console.log(error)
      }
    }
    getImprovements()

    const getOffices = async () => {
      try {
        await getOfficesList()
      } catch (error) {
        console.log(error)
      }
    }
    getOffices()

    const getFilials = async () => {
      try {
        await getFilialsList()
      } catch (error) {
        console.log(error)
      }
    }
    getFilials()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onFilterWindowOpen = () => {
    setFilterData({ officesList, filialsList, improvementsList })
    setIsFilterWindowOpen(true)
  }

  const filterReportsList = params => {
    reportsTableRef.current.filterTable(params)
  }

  const resetReportsFilter = () => {
    reportsTableRef.current.resetTableFilter()
  }

  const onTableSelected = list => {
    setIsTableSeleted(list.length !== 0)
  }

  const handleDeleteReports = async () => {
    try {
      setIsLoading(true)
      await reportsTableRef.current.deleteReports()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Row className="w-100">
      <Row className="page_header">
        <h2>{intl.formatMessage({ id: 'reports' })}</h2>
        <Row>
          {isTableSelected && (
            <Button variant="danger" onClick={handleDeleteReports}>
              {intl.formatMessage({ id: 'global.delete' })}
            </Button>
          )}
          <TooltipButton ButtonIcon={FilterButtonIcon} onClick={onFilterWindowOpen} tooltipText={intl.formatMessage({ id: 'global.filter' })} />
          <AddButton
            iconFirst={true}
            onClick={() => reportsTableRef.current.exportExcel(exportReportsAsExcel)}
            btnText={intl.formatMessage({ id: 'global.export' })}
            ButtonIcon={ExportCSVButtonIcon}
          />
        </Row>
      </Row>
      <Row className="page_content">
        {reportsList === [] ? (
          <EmptyPage text={intl.formatMessage({ id: 'no.bank.yet' })} />
        ) : (
          <>
            {isLoading && (
              <div className="loading_overlay">
                <Spinner animation="border" size="lg" variant="success" />
              </div>
            )}
            <ReportsTable tableRef={reportsTableRef} data={reportsList} onTableSelected={onTableSelected} />
          </>
        )}
        <TableFilterWindow
          data={filterData}
          isOpen={isFilterWindowOpen}
          hideWindow={() => setIsFilterWindowOpen(false)}
          onSubmit={filterReportsList}
          resetFilter={resetReportsFilter}
          FilterForm={ReportsFilterForm}
        />
      </Row>
    </Row>
  )
})

export default ReportsPage
