/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react'
import { Row, Spinner } from 'react-bootstrap'
import { AddButton, BasicTable, EmptyPage, SimpleModal, SearchInputContainer } from 'components'
import { AddBtnIcon } from 'icons'
import { useIntl } from 'react-intl'
import { useStore } from 'hooks'
import { MaterialTypesTableColumns } from '../../tableColumns'
import { sendNotification } from 'components/Toast'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import * as styles from '../../ReferencePages.module.scss'
import { MaterialTypeForm } from '../../forms'

const MaterialTypesPage = () => {
  const intl = useIntl()

  const { materialTypesList, getMaterialTypesList, addMaterialType, updateMaterialType, deleteMaterialType } = useStore('referenceBooksStore')

  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        setIsLoading(true)
        await getMaterialTypesList()
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getCurrencies()
  }, [getMaterialTypesList])

  const onModalOpen = useCallback(function (cellData, action = 'add') {
    setIsModalOpen(true)
    if (action === 'edit') {
      setModalData({ initValues: cellData && { ...cellData }, action })
    } else if (action === 'add') {
      setModalData({ action })
    } else if (action === 'delete') {
      setModalData({ initValues: cellData && { ...cellData }, action })
    }
  }, [])

  const onSubmit = async data => {
    const _data = { ...data, id: modalData?.initValues?.id }

    try {
      setIsLoading(true)
      setIsModalOpen(false)
      if (modalData.action === 'edit') {
        await updateMaterialType(_data)
      } else if (modalData.action === 'add') {
        await addMaterialType(_data)
      } else if (modalData.action === 'delete') {
        await deleteMaterialType(modalData.initValues?.id)
      }

      await getMaterialTypesList()

      sendNotification(
        intl.formatMessage({
          id: 'global.successfully',
          defaultMessage: 'Успех',
        }),
        'success',
      )
    } catch (error) {
      sendNotification(
        Object.values(error.response?.data.errors?.Alert?.[0].toString()) || intl.formatMessage({ id: 'global.default_error_message' }),
        'error',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const tableColumns = MaterialTypesTableColumns(onModalOpen)

  const { SearchBar } = Search

  return (
    <Row className={`${styles.container} page_content`}>
      <ToolkitProvider keyField="id" data={materialTypesList} columns={tableColumns} search>
        {props => (
          <>
            <Row className={styles.table_header}>
              <SearchInputContainer>
                <SearchBar {...props.searchProps} delay={200} placeholder={intl.formatMessage({ id: 'reference_books.material_type_name' })} />
              </SearchInputContainer>
              <AddButton onClick={onModalOpen} btnText={intl.formatMessage({ id: 'reference_books.add_material_type' })} ButtonIcon={AddBtnIcon} />
            </Row>
            <Row className={styles.table_container}>
              {isLoading && (
                <div className="loading_overlay">
                  <Spinner animation="border" size="lg" variant="success" />
                </div>
              )}
              {materialTypesList.length !== 0 ? <BasicTable {...props.baseProps} /> : <EmptyPage text="Пусто" withoutButton={true} />}
            </Row>
          </>
        )}
      </ToolkitProvider>
      <SimpleModal
        onSubmit={onSubmit}
        isOpen={isModalOpen}
        data={modalData}
        hideModal={() => setIsModalOpen(false)}
        ModalForm={MaterialTypeForm}
        modalName="material_type"
      />
    </Row>
  )
}

export default MaterialTypesPage
