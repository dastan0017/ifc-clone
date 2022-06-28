import { useState, useEffect, useCallback } from 'react'
import { Row, Spinner } from 'react-bootstrap'
import { useStore } from 'hooks'
import { useIntl } from 'react-intl'
import { LanguageCodeEnum } from 'enums'
import { BasicTable, EmptyPage, AddButton, SimpleModal, Select } from 'components'
import { AddBtnIcon } from 'icons'
import { observer } from 'mobx-react'
import { EnergyPricesTableColumns } from '../../tableColumns'
import { EnergyResourceForm } from '../../forms'
import { sendNotification } from 'components/Toast'
import * as styles from '../../ReferencePages.module.scss'

const EnergyPricesPage = observer(() => {
  const intl = useIntl()

  const {
    getEnergyResourceList,
    energyResourceList,
    getPriceRegionList,
    priceRegionList,
    addEnergyResource,
    updateEnergyResource,
    deleteEnergyResource,
  } = useStore('referenceBooksStore')

  const { getEnergyResourceTypeList, energyResourceTypeList } = useStore('commonStore')

  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({ priceRegionList: [], resourceTypeList: [], initValues: {} })
  const [energyTypeId, setEnergyTypeId] = useState(null)

  const getResources = useCallback(
    async energyTypeId => {
      try {
        setIsLoading(true)
        await getEnergyResourceList(LanguageCodeEnum[intl.locale], energyTypeId)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    },
    [getEnergyResourceList, intl.locale],
  )

  useEffect(() => {
    getResources()

    const getResourceTypes = async () => {
      try {
        setIsLoading(true)
        await getEnergyResourceTypeList(LanguageCodeEnum[intl.locale])
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getResourceTypes()

    const getRegions = async () => {
      try {
        setIsLoading(true)
        await getPriceRegionList()
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getRegions()
  }, [getEnergyResourceTypeList, getPriceRegionList, getResources, intl.locale])

  useEffect(() => {
    getResources(energyTypeId)
  }, [energyTypeId, getResources])

  const onModalOpen = useCallback(
    function (cellData, action = 'add') {
      setIsModalOpen(true)
      if (action === 'edit') {
        setModalData({ initValues: cellData, action })
      } else if (action === 'add') {
        setModalData({ action, priceRegionList, energyResourceTypeList, energyTypeId })
      } else if (action === 'delete') {
        setModalData({ initValues: cellData, action })
      }
    },
    [priceRegionList, energyTypeId, energyResourceTypeList],
  )

  const onSubmit = async data => {
    const resourceData = {
      priceRegionId: modalData.initValues?.priceRegionId,
      typeId: parseInt(energyTypeId, 10),
      ...data,
      id: modalData.initValues?.id,
    }

    try {
      setIsLoading(true)
      setIsModalOpen(false)
      if (modalData.action === 'edit') {
        await updateEnergyResource(resourceData)
      } else if (modalData.action === 'add') {
        await addEnergyResource(resourceData)
      } else if (modalData.action === 'delete') {
        await deleteEnergyResource(modalData.initValues?.id)
      }

      await getEnergyResourceList(LanguageCodeEnum[intl.locale], energyTypeId)

      sendNotification(
        intl.formatMessage({
          id: 'global.successfully',
          defaultMessage: 'Успех',
        }),
        'success',
      )
    } catch (error) {
      sendNotification(
        Object.values(error.response?.data.errors.Alert[0].toString()) || intl.formatMessage({ id: 'global.default_error_message' }),
        'error',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleResourceTypeChange = typeId => {
    setEnergyTypeId(typeId)
  }

  const tableColumns = EnergyPricesTableColumns(onModalOpen)

  return (
    <Row className={`${styles.container} page_content`}>
      <Row className={styles.table_header}>
        <Select
          list={energyResourceTypeList}
          onChange={handleResourceTypeChange}
          defaultMessage={intl.formatMessage({ id: 'reference_books.select_resource_type' })}
        />
        <AddButton onClick={onModalOpen} btnText={intl.formatMessage({ id: 'global.add_region' })} ButtonIcon={AddBtnIcon} />
      </Row>
      <SimpleModal
        onSubmit={onSubmit}
        isOpen={isModalOpen}
        data={modalData}
        hideModal={() => setIsModalOpen(false)}
        ModalForm={EnergyResourceForm}
        modalName="region"
      />
      <Row className={styles.table_container}>
        {isLoading && (
          <div className="loading_overlay">
            <Spinner animation="border" size="lg" variant="success" />
          </div>
        )}
        {energyResourceList.length !== 0 ? (
          <BasicTable data={energyResourceList} tableColumns={tableColumns} />
        ) : (
          <EmptyPage text="Пусто" withoutButton={true} />
        )}
      </Row>
    </Row>
  )
})

export default EnergyPricesPage
