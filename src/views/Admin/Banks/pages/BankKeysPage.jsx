import { useState, useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { AddButton, SimpleModal, EmptyPage, BasicTable } from 'components'
import { AddBtnIcon } from 'icons'
import PropTypes from 'prop-types'
import { Row, Spinner } from 'react-bootstrap'
import { useStore } from 'hooks'
import { sendNotification } from 'components/Toast'
import { KeysTableColumns } from '../tableColumns'
import { KeyForm } from '../forms'

export const BankKeysPage = ({ bankId }) => {
  const intl = useIntl()

  const { editBankKey, addNewBankKey, deleteBankKey, keysList, getBankKeysList } = useStore('banksStore')

  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})

  useEffect(() => {
    const getBankKeys = async () => {
      try {
        setIsLoading(true)
        await getBankKeysList(bankId)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getBankKeys()
  }, [bankId, getBankKeysList])

  const onModalOpen = useCallback((cellData, action = 'add') => {
    setIsModalOpen(true)
    if (action === 'edit') {
      setModalData({ ...cellData, action })
    } else if (action === 'add') {
      setModalData({ action })
    } else if (action === 'delete') {
      setModalData({ ...cellData, action })
    }
  }, [])

  const onSubmit = async data => {
    const bankKeyData = {
      id: data.id,
      bankId,
      key: data.key,
    }

    try {
      setIsLoading(true)
      setIsModalOpen(false)
      if (modalData.action === 'edit') {
        await editBankKey(bankKeyData)
      } else if (modalData.action === 'add') {
        await addNewBankKey(bankKeyData)
      } else if (modalData.action === 'delete') {
        await deleteBankKey(data.id)
      }

      await getBankKeysList(bankId)

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

  const tableColumns = KeysTableColumns(onModalOpen)

  return (
    <Row className="bank_details_page bank_keys_page">
      <AddButton onClick={onModalOpen} btnText={intl.formatMessage({ id: 'add.btn' })} ButtonIcon={AddBtnIcon} />
      <SimpleModal
        onSubmit={onSubmit}
        isOpen={isModalOpen}
        data={modalData}
        hideModal={() => setIsModalOpen(false)}
        ModalForm={KeyForm}
        modalName="key"
      />
      {isLoading && (
        <div className="loading_overlay">
          <Spinner animation="border" size="lg" variant="success" />
        </div>
      )}
      <>
        {keysList.length === 0 ? (
          <EmptyPage text={intl.formatMessage({ id: 'no.bank_key.yet' })} onClick={onModalOpen} />
        ) : (
          <BasicTable data={keysList} tableColumns={tableColumns} />
        )}
      </>
    </Row>
  )
}
BankKeysPage.propTypes = {
  bankId: PropTypes.string,
}

export default BankKeysPage
