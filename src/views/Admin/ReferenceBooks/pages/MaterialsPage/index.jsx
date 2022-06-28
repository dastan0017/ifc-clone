/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback, useRef } from 'react'
import { Row, Spinner } from 'react-bootstrap'
import { AddButton, FilterableTable, EmptyPage, SimpleModal, SearchInputContainer, Select, TooltipButton, TableFilterWindow } from 'components'
import { AddBtnIcon, FilterIcon } from 'icons'
import { useIntl } from 'react-intl'
import { useStore } from 'hooks'
import { MaterialsTableColumns } from '../../tableColumns'
import { filterMaterialsTable } from '../../filterTableFunctions'
import { MaterialsFilterForm, MaterialForm } from '../../forms'
import { LanguageCodeEnum } from 'enums'
import { observer } from 'mobx-react'
import { sendNotification } from 'components/Toast'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import * as styles from '../../ReferencePages.module.scss'

const MaterialsPage = observer(() => {
  const intl = useIntl()

  const { getMaterial, getMaterialsList, materialsList, getMaterialTypesList, materialTypesList, addMaterial, updateMaterial, deleteMaterial } =
    useStore('referenceBooksStore')
  const { measurementUnitsList, getMeasurementUnitsList } = useStore('commonStore')

  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({ measurementUnitsList: [], materialTypesList: [] })
  const [filterData, setFilterData] = useState({ measurementUnitsList: [], materialTypesList: [] })
  const [isFilterWindowOpen, setIsFilterWindowOpen] = useState(false)
  const [filterParams, setFilterParams] = useState({ culture: LanguageCodeEnum[intl.locale], tid: null, mid: null })

  const materialsTableRef = useRef(null)

  useEffect(() => {
    const getMaterialTypes = async () => {
      try {
        await getMaterialTypesList(LanguageCodeEnum[intl.locale])
      } catch (err) {
        console.log(err)
      }
    }
    getMaterialTypes()

    const getMeasurements = async () => {
      try {
        await getMeasurementUnitsList(LanguageCodeEnum[intl.locale])
      } catch (err) {
        console.log(err)
      }
    }
    getMeasurements()
  }, [getMaterialTypesList, getMeasurementUnitsList, intl.locale])

  useEffect(() => {
    const getMaterials = async () => {
      try {
        setIsLoading(true)
        await getMaterialsList(filterParams)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getMaterials()
  }, [getMaterialsList, filterParams])

  const onModalOpen = useCallback(
    async function (cellData, action = 'add') {
      setIsModalOpen(true)
      if (action === 'edit') {
        let languages = {
          kyrgyz: {},
          english: {},
          russian: {},
        }
        let translations = await getMaterial(cellData.id).then(res => res.data.translations)
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
            materialTypeId: cellData.materialType.id,
            measurementUnitId: cellData.measurementUnit.id,
            // TODO: Add fields to backend and get translations from there
            materialName__ru_RU: languages?.russian?.materialName || cellData.name,
            materialName__en_US: languages?.english?.materialName || cellData.name,
            materialName__ky_KG: languages?.kyrgyz?.materialName || cellData.name,
          },
          action,
          materialTypesList,
          measurementUnitsList,
        })
      } else if (action === 'add') {
        setModalData({ action, materialTypesList, measurementUnitsList })
      } else if (action === 'delete') {
        setModalData({ initValues: cellData && { ...cellData }, action })
      }
    },
    [getMaterial, materialTypesList, measurementUnitsList],
  )

  const onSubmit = async data => {
    const _data = {
      id: modalData.initValues?.id,
      Name: data.materialName__ru_RU,
      Comment: '',
      MaterialTypeId: data.materialTypeId,
      MeasurementUnitId: data.measurementUnitId,
      AdditionalInformation: '',
      Info: null,
      Translations: [
        { CultureName: 'en-US', MaterialName: data.materialName__en_US || data.materialName__ru_RU, Comment: '' },
        { CultureName: 'ru-RU', MaterialName: data.materialName__ru_RU, Comment: '' },
        { CultureName: 'ky-KG', MaterialName: data.materialName__ky_KG || data.materialName__ru_RU, Comment: '' },
      ],
      Tags: [],
    }

    try {
      setIsLoading(true)
      setIsModalOpen(false)
      if (modalData.action === 'edit') {
        await updateMaterial(_data)
      } else if (modalData.action === 'add') {
        await addMaterial(_data)
      } else if (modalData.action === 'delete') {
        await deleteMaterial(modalData.initValues?.id)
      }

      await getMaterialsList(filterParams)

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

  const handleMaterialTypeChange = typeId => {
    setFilterParams(prev => {
      return { ...prev, tid: typeId }
    })
  }

  const handleFilterWindowOpen = () => {
    setFilterData({ measurementUnitsList, materialTypesList })
    setIsFilterWindowOpen(true)
  }

  const handleResetFilter = () => {
    materialsTableRef.current.resetFilter()
  }

  const handleFilter = params => {
    materialsTableRef.current.filter(params)
  }

  const tableColumns = MaterialsTableColumns(onModalOpen)

  const { SearchBar } = Search

  return (
    <Row className={`${styles.container} page_content`}>
      <ToolkitProvider keyField="id" data={materialsList} columns={tableColumns} search>
        {props => (
          <>
            <Row className={styles.table_header}>
              <Select
                style={{ marginRight: '12px', height: '100%' }}
                list={materialTypesList}
                onChange={handleMaterialTypeChange}
                defaultMessage={intl.formatMessage({ id: 'reference_books.select_material_type' })}
              />
              <SearchInputContainer>
                <SearchBar {...props.searchProps} delay={200} placeholder={intl.formatMessage({ id: 'reference_books.search_materials' })} />
              </SearchInputContainer>
              <TooltipButton
                ButtonIcon={FilterIcon}
                onClick={handleFilterWindowOpen}
                tooltipText={intl.formatMessage({ id: 'global.filter' })}
                style={{ borderRadius: '8px', border: '1px solid #162938', padding: '10px 20px', marginRight: '12px' }}
              />
              <AddButton onClick={onModalOpen} btnText={intl.formatMessage({ id: 'reference_books.add_material' })} ButtonIcon={AddBtnIcon} />
            </Row>
            <SimpleModal
              onSubmit={onSubmit}
              isOpen={isModalOpen}
              data={modalData}
              hideModal={() => setIsModalOpen(false)}
              ModalForm={MaterialForm}
              modalName="material"
            />
            <Row className={styles.table_container}>
              {isLoading && (
                <div className="loading_overlay">
                  <Spinner animation="border" size="lg" variant="success" />
                </div>
              )}
              {materialsList.length !== 0 ? (
                <FilterableTable {...props.baseProps} tableRef={materialsTableRef} filterTable={filterMaterialsTable} />
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
        FilterForm={MaterialsFilterForm}
      />
    </Row>
  )
})

export default MaterialsPage
