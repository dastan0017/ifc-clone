import { useState, useEffect, useCallback, useRef } from 'react'
import { Row, Spinner } from 'react-bootstrap'
import { useStore } from 'hooks'
import { useIntl } from 'react-intl'
import { LanguageCodeEnum } from 'enums'
import { TableFilterWindow, TooltipButton, EmptyPage, LightButton, SimpleModal, Select, FilterableTable, SearchInputContainer } from 'components'
import { AddBtnIcon, RightArrowIcon, LeftArrowIcon, FilterIcon } from 'icons'
import { observer } from 'mobx-react'
import { MaterialPricesTableColumns } from '../../tableColumns'
import { filterMaterialPricesTable } from '../../filterTableFunctions'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit'
import { sendNotification } from 'components/Toast'
import { exportExcelByUrl } from 'utils'
import * as styles from '../../ReferencePages.module.scss'
import { FileUploadForm } from 'components'
import { MaterialPricesFilterForm } from '../../forms'
import * as specificStyles from './MaterialPricesPage.module.scss'

const MaterialPricesPage = observer(() => {
  const intl = useIntl()

  const { materialPricesList, getMaterialPricesList, exportMaterialPricesAsExcel, currencyList, getCurrencyList, importMaterialPricesAsExcel } =
    useStore('referenceBooksStore')
  const { getSuppliersList, suppliersList } = useStore('commonStore')
  const { getPriceRegionsList, priceRegionsList } = useStore('banksStore')

  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({ priceRegionList: [], resourceTypeList: [], initValues: {} })
  const [filterParams, setFilterParams] = useState({ rid: null, sid: null, cid: null })
  const materialPricesTableRef = useRef(null)
  const [filterData, setFilterData] = useState({ measurementUnitsList: [], materialTypesList: [] })
  const [isFilterWindowOpen, setIsFilterWindowOpen] = useState(false)

  useEffect(() => {
    const getNeededData = async () => {
      try {
        await getCurrencyList()
        await getSuppliersList()
      } catch (err) {
        console.log(err)
      }
    }
    getNeededData()
  }, [getCurrencyList, getSuppliersList])

  useEffect(() => {
    const getPriceRegions = async () => {
      try {
        await getPriceRegionsList(LanguageCodeEnum[intl.locale])
      } catch (err) {
        console.log(err)
      }
    }
    getPriceRegions()
  }, [getPriceRegionsList, intl.locale])

  const getPrices = useCallback(async () => {
    try {
      setIsLoading(true)
      await getMaterialPricesList(filterParams)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [getMaterialPricesList, filterParams])

  useEffect(() => {
    getPrices()
  }, [filterParams, getPrices])

  const onModalOpen = useCallback(function (cellData, action = 'add') {
    setIsModalOpen(true)
    if (action === 'edit') {
      setModalData({ initValues: cellData, action })
    } else if (action === 'add') {
      setModalData({ action })
    } else if (action === 'delete') {
      setModalData({ initValues: cellData, action })
    }
  }, [])

  const onSubmit = async data => {
    let _data = new FormData()

    _data.append('name', 'excel')
    _data.append('file', data?.[0])

    try {
      setIsLoading(true)
      setIsModalOpen(false)
      await importMaterialPricesAsExcel(_data)

      await getMaterialPricesList(LanguageCodeEnum[intl.locale])

      sendNotification(
        intl.formatMessage({
          id: 'global.successfully',
          defaultMessage: 'Успех',
        }),
        'success',
      )
    } catch (error) {
      sendNotification(intl.formatMessage({ id: 'global.default_error_message' }), 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePriceRegionChange = regionId => {
    setFilterParams(prev => ({ ...prev, rid: regionId }))
  }

  const { SearchBar } = Search

  const handleFilterWindowOpen = () => {
    setFilterData({ currencyList, priceRegionsList, suppliersList })
    setIsFilterWindowOpen(true)
  }

  const handleExportAsExcel = async () => {
    try {
      const urlToDownload = await exportMaterialPricesAsExcel(LanguageCodeEnum[intl.locale], 'excel').then(res => res.data)
      await exportExcelByUrl(urlToDownload)
    } catch (err) {
      console.log(err)
    }
  }

  const handleFilter = params => {
    materialPricesTableRef.current.filter(params)
  }

  const handleResetFilter = () => {
    materialPricesTableRef.current.resetFilter()
  }

  const tableColumns = currencyList && MaterialPricesTableColumns(currencyList)

  return (
    <Row className={`${styles.container} page_content`}>
      <SimpleModal
        onSubmit={onSubmit}
        isOpen={isModalOpen}
        data={modalData}
        hideModal={() => setIsModalOpen(false)}
        ModalForm={FileUploadForm}
        modalName="region"
        headerTitle={intl.formatMessage({ id: 'reference_books.import_from_excel' })}
      />
      <ToolkitProvider keyField="id" data={materialPricesList} columns={tableColumns} search>
        {props => (
          <>
            <Row className={styles.table_header}>
              <Select
                style={{ marginRight: '12px', height: '100%' }}
                list={priceRegionsList}
                onChange={handlePriceRegionChange}
                defaultMessage={intl.formatMessage({ id: 'reference_books.all_coefficients' })}
              />
              <SearchInputContainer>
                <SearchBar {...props.searchProps} delay={200} placeholder={intl.formatMessage({ id: 'reference_books.search_materials' })} />
              </SearchInputContainer>
              <LightButton
                style={{ marginRight: '12px' }}
                onClick={handleExportAsExcel}
                btnText={intl.formatMessage({ id: 'global.export_to_excel' })}
                ButtonIcon={RightArrowIcon}
              />
              <LightButton
                style={{ marginRight: '12px' }}
                onClick={onModalOpen}
                btnText={intl.formatMessage({ id: 'global.import_from_excel' })}
                ButtonIcon={LeftArrowIcon}
              />
              <TooltipButton
                ButtonIcon={FilterIcon}
                onClick={handleFilterWindowOpen}
                tooltipText={intl.formatMessage({ id: 'global.filter' })}
                style={{ borderRadius: '8px', border: '1px solid #162938', padding: '10px 20px', marginRight: '12px' }}
              />
            </Row>
            <Row className={styles.table_container}>
              {isLoading && (
                <div className="loading_overlay">
                  <Spinner animation="border" size="lg" variant="success" />
                </div>
              )}
              {materialPricesList.length !== 0 ? (
                <FilterableTable
                  tableRef={materialPricesTableRef}
                  filterTable={filterMaterialPricesTable}
                  {...props.baseProps}
                  className={specificStyles.material_prices_table}
                />
              ) : (
                <EmptyPage text="Пусто" withoutButton={true} />
              )}
            </Row>
          </>
        )}
      </ToolkitProvider>
      <TableFilterWindow
        data={filterData}
        isOpen={isFilterWindowOpen}
        hideWindow={() => setIsFilterWindowOpen(false)}
        onSubmit={handleFilter}
        resetFilter={handleResetFilter}
        FilterForm={MaterialPricesFilterForm}
      />
    </Row>
  )
})

export default MaterialPricesPage
