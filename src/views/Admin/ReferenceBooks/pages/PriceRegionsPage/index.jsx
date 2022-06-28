import { useState, useEffect, useCallback } from 'react'
import { Row, Spinner } from 'react-bootstrap'
import { AddButton, BasicTable, EmptyPage, SimpleModal, CurrencyForm } from 'components'
import { AddBtnIcon } from 'icons'
import { useIntl } from 'react-intl'
import { useStore } from 'hooks'
import { observer } from 'mobx-react'
import { PriceRegionsTableColumns } from '../../tableColumns'
import { PriceRegionForm } from '../../forms'
import { sendNotification } from 'components/Toast'
import * as styles from '../../ReferencePages.module.scss'
import './PriceRegionsPage.scss'

const PriceRegionsPage = observer(() => {
  const intl = useIntl()

  const { getPriceRegionList, priceRegionList, updatePriceRegion, addPriceRegion, deletePriceRegion } = useStore('referenceBooksStore')

  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        setIsLoading(true)
        await getPriceRegionList()
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getCurrencies()
  }, [getPriceRegionList])

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
        await updatePriceRegion(_data)
      } else if (modalData.action === 'add') {
        await addPriceRegion(_data)
      } else if (modalData.action === 'delete') {
        await deletePriceRegion(modalData.initValues?.id)
      }
      await getPriceRegionList()
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

  const tableColumns = PriceRegionsTableColumns(onModalOpen)

  return (
    <Row className={`${styles.container} page_content`}>
      <Row className={styles.table_header}>
        <AddButton onClick={onModalOpen} btnText={intl.formatMessage({ id: 'global.add_region' })} ButtonIcon={AddBtnIcon} />
      </Row>
      <SimpleModal
        onSubmit={onSubmit}
        isOpen={isModalOpen}
        data={modalData}
        hideModal={() => setIsModalOpen(false)}
        ModalForm={PriceRegionForm}
        modalName="region"
      />
      <Row className={styles.table_container}>
        {isLoading && (
          <div className="loading_overlay">
            <Spinner animation="border" size="lg" variant="success" />
          </div>
        )}
        {priceRegionList.length !== 0 ? (
          <BasicTable data={priceRegionList} tableColumns={tableColumns} />
        ) : (
          <EmptyPage text="Пусто" withoutButton={true} />
        )}
      </Row>
    </Row>
  )
})

export default PriceRegionsPage
