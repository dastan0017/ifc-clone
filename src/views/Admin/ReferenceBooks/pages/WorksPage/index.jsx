/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback, useRef } from 'react'
import { Row, Spinner } from 'react-bootstrap'
import { AddButton, FilterableTable, EmptyPage, SimpleModal, SearchInputContainer, Select, TooltipButton, TableFilterWindow } from 'components'
import { AddBtnIcon, FilterIcon } from 'icons'
import { useIntl } from 'react-intl'
import { useStore } from 'hooks'
import { WorkTableColumns } from '../../tableColumns'
import { filterWorksTable } from '../../filterTableFunctions'
import { WorksFilterForm, WorkForm } from '../../forms'
import { LanguageCodeEnum } from 'enums'
import { observer } from 'mobx-react'
import { sendNotification } from 'components/Toast'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import * as styles from '../../ReferencePages.module.scss'

const WorksPage = observer(() => {
  const intl = useIntl()

  const { getWork, getWorksList, worksList, getWorkTypesList, workTypesList, addWork, updateWork, deleteWork } = useStore('referenceBooksStore')
  const { measurementUnitsList, getMeasurementUnitsList } = useStore('commonStore')

  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({ measurementUnitsList: [], workTypesList: [] })
  const [filterData, setFilterData] = useState({ measurementUnitsList: [], workTypesList: [] })
  const [isFilterWindowOpen, setIsFilterWindowOpen] = useState(false)
  const [filterParams, setFilterParams] = useState({ culture: LanguageCodeEnum[intl.locale], tid: null, mid: null })

  const materialsTableRef = useRef(null)

  useEffect(() => {
    const getWorkTypes = async () => {
      try {
        await getWorkTypesList(LanguageCodeEnum[intl.locale])
      } catch (err) {
        console.log(err)
      }
    }
    getWorkTypes()

    const getMeasurements = async () => {
      try {
        await getMeasurementUnitsList(LanguageCodeEnum[intl.locale])
      } catch (err) {
        console.log(err)
      }
    }
    getMeasurements()
  }, [getMeasurementUnitsList, getWorkTypesList, intl.locale])

  useEffect(() => {
    const getWorks = async () => {
      try {
        setIsLoading(true)
        await getWorksList(filterParams)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getWorks()
  }, [getWorksList, filterParams])

  const onModalOpen = useCallback(
    async function (cellData, action = 'add') {
      setIsModalOpen(true)
      if (action === 'edit') {
        let languages = {
          kyrgyz: {},
          english: {},
          russian: {},
        }
        let translations = await getWork(cellData.id).then(res => res.data.translations)
        translations.forEach(el => {
          if (el.cultureName === 'ru-RU') {
            languages.russian = el
          } else if (el.cultureName === 'ky-KG') {
            languages.kyrgyz = el
          } else if (el.cultureName === 'en-US') {
            languages.english = el
          }
        })

        setModalData({
          initValues: cellData && {
            ...cellData,
            workTypeId: cellData.workType.id,
            measurementUnitId: cellData.measurementUnit.id,
            // TODO: Add fields to backend and get translations from there
            workName__ru_RU: languages?.russian?.workName || cellData.name,
            workName__en_US: languages?.english?.workName || cellData.name,
            workName__ky_KG: languages?.kyrgyz?.workName || cellData.name,
          },
          action,
          workTypesList,
          measurementUnitsList,
        })
      } else if (action === 'add') {
        setModalData({ action, workTypesList, measurementUnitsList })
      } else if (action === 'delete') {
        setModalData({ initValues: cellData && { ...cellData }, action })
      }
    },
    [getWork, measurementUnitsList, workTypesList],
  )

  const onSubmit = async data => {
    const _data = {
      id: modalData.initValues?.id,
      Name: data.workName__ru_RU,
      WorkTypeId: data.workTypeId,
      MeasurementUnitId: data.measurementUnitId,
      Translations: [
        { CultureName: 'en-US', WorkName: data.workName__en_US || data.workName__ru_RU },
        { CultureName: 'ru-RU', WorkName: data.workName__ru_RU },
        { CultureName: 'ky-KG', WorkName: data.workName__ky_KG || data.workName__ru_RU },
      ],
    }

    try {
      setIsLoading(true)
      setIsModalOpen(false)
      if (modalData.action === 'edit') {
        await updateWork(_data)
      } else if (modalData.action === 'add') {
        await addWork(_data)
      } else if (modalData.action === 'delete') {
        await deleteWork(modalData.initValues?.id)
      }

      await getWorksList(filterParams)

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

  const handleWorkTypeChange = typeId => {
    setFilterParams(prev => {
      return { ...prev, tid: typeId }
    })
  }

  const handleFilterWindowOpen = () => {
    setFilterData({ measurementUnitsList, workTypesList })
    setIsFilterWindowOpen(true)
  }

  const handleResetFilter = () => {
    materialsTableRef.current.resetFilter()
  }

  const handleFilter = params => {
    materialsTableRef.current.filter(params)
  }

  const tableColumns = WorkTableColumns(onModalOpen)

  const { SearchBar } = Search

  return (
    <Row className={`${styles.container} page_content`}>
      <ToolkitProvider keyField="id" data={worksList} columns={tableColumns} search>
        {props => (
          <>
            <Row className={styles.table_header}>
              <Select
                style={{ marginRight: '12px', height: '100%', width: '220px' }}
                list={workTypesList}
                onChange={handleWorkTypeChange}
                defaultMessage={intl.formatMessage({ id: 'reference_books.select_work_type' })}
              />
              <SearchInputContainer>
                <SearchBar {...props.searchProps} delay={200} placeholder={intl.formatMessage({ id: 'reference_books.search_works' })} />
              </SearchInputContainer>
              <TooltipButton
                ButtonIcon={FilterIcon}
                onClick={handleFilterWindowOpen}
                tooltipText={intl.formatMessage({ id: 'global.filter' })}
                style={{ borderRadius: '8px', border: '1px solid #162938', padding: '10px 20px', marginRight: '12px' }}
              />
              <AddButton onClick={onModalOpen} btnText={intl.formatMessage({ id: 'reference_books.add_work' })} ButtonIcon={AddBtnIcon} />
            </Row>
            <SimpleModal
              onSubmit={onSubmit}
              isOpen={isModalOpen}
              data={modalData}
              hideModal={() => setIsModalOpen(false)}
              ModalForm={WorkForm}
              modalName="work"
            />
            <Row className={styles.table_container}>
              {isLoading && (
                <div className="loading_overlay">
                  <Spinner animation="border" size="lg" variant="success" />
                </div>
              )}
              {worksList.length !== 0 ? (
                <FilterableTable {...props.baseProps} tableRef={materialsTableRef} filterTable={filterWorksTable} />
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
        FilterForm={WorksFilterForm}
      />
    </Row>
  )
})

export default WorksPage
