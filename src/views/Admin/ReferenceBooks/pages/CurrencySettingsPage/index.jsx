import { useState, useEffect, useCallback } from 'react'
import { Row, Spinner } from 'react-bootstrap'
import { AddButton, BasicTable, EmptyPage, SimpleModal } from 'components'
import { AddBtnIcon } from 'icons'
import { useIntl } from 'react-intl'
import { useStore } from 'hooks'
import { CurrencySettingsTableColumns } from '../../tableColumns'
import { CurrencyForm } from '../../forms'
import { sendNotification } from 'components/Toast'
import * as styles from '../../ReferencePages.module.scss'

const CurrencySettingsPage = () => {
  const intl = useIntl()

  const { currencyList, getCurrencyList, addCurrency, updateCurrency, deleteCurrency } = useStore('referenceBooksStore')

  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        setIsLoading(true)
        await getCurrencyList()
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getCurrencies()
  }, [getCurrencyList])

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
        await updateCurrency(_data)
      } else if (modalData.action === 'add') {
        await addCurrency(_data)
      } else if (modalData.action === 'delete') {
        await deleteCurrency(modalData.initValues?.id)
      }

      await getCurrencyList()

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

  const tableColumns = CurrencySettingsTableColumns(onModalOpen)

  return (
    <Row className={`${styles.container} page_content`}>
      <Row className={styles.table_header}>
        <AddButton onClick={onModalOpen} btnText={intl.formatMessage({ id: 'reference_books.add_currency' })} ButtonIcon={AddBtnIcon} />
      </Row>
      <SimpleModal
        onSubmit={onSubmit}
        isOpen={isModalOpen}
        data={modalData}
        hideModal={() => setIsModalOpen(false)}
        ModalForm={CurrencyForm}
        modalName="currency"
      />
      <Row className={styles.table_container}>
        {isLoading && (
          <div className="loading_overlay">
            <Spinner animation="border" size="lg" variant="success" />
          </div>
        )}
        {currencyList.length !== 0 ? <BasicTable data={currencyList} tableColumns={tableColumns} /> : <EmptyPage text="Пусто" withoutButton={true} />}
      </Row>
    </Row>
  )
}

export default CurrencySettingsPage
