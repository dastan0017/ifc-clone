import { useCallback, useEffect, useState } from 'react'
import { Row, Spinner } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { useStore } from 'hooks'
import { observer } from 'mobx-react'
import { EmptyPage, BasicTable, AddButton, SimpleModal } from 'components'
import { AddBtnIcon } from 'icons'
import '../Pages.scss'
import { sendNotification } from 'components/Toast'
import { AdminsTableColumns } from './tableColumns'
import { AdministratorsForm } from './forms'

const AdministratorsPage = observer(() => {
  const intl = useIntl()
  const { editAdmin, addNewAdmin, deleteAdmin, getAdminsList, adminsList } = useStore('adminsStore')
  const banksStore = useStore('banksStore')

  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})

  useEffect(() => {
    const getAdmins = async () => {
      try {
        setIsLoading(true)
        await getAdminsList()
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getAdmins()
  }, [getAdminsList])

  useEffect(() => {
    const getBanksList = async () => {
      try {
        await banksStore.getBanksList()
      } catch (err) {
        console.log(err)
      }
    }

    getBanksList()
  }, [banksStore])

  const onModalOpen = useCallback(
    (cellData, action = 'add') => {
      setIsModalOpen(true)
      if (action === 'edit') {
        setModalData({ ...cellData, action, banksList: banksStore.banksList })
      } else if (action === 'add') {
        setModalData({ action, banksList: banksStore.banksList })
      } else if (action === 'delete') {
        setModalData({ action, ...cellData })
      }
    },
    [banksStore.banksList],
  )

  const onSubmit = async data => {
    const userData = {
      ...data,
      id: modalData?.id,
      email: 'test@gmail.com',
      firstName: 'a',
      lastName: 'b',
      phoneNumber: '0700-000-000',
    }

    try {
      setIsLoading(true)
      setIsModalOpen(false)
      if (modalData.action === 'edit') {
        await editAdmin(userData)
      } else if (modalData.action === 'add') {
        await addNewAdmin(userData)
      } else if (modalData.action === 'delete') {
        await deleteAdmin(modalData.id)
      }

      await getAdminsList()

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

  const tableColumns = AdminsTableColumns(onModalOpen)

  return (
    <Row className="w-100">
      <Row className="page_header">
        <h2>{intl.formatMessage({ id: 'administrators' })}</h2>
        <AddButton onClick={onModalOpen} btnText={intl.formatMessage({ id: 'add.btn' })} ButtonIcon={AddBtnIcon} />
      </Row>
      <Row className="page_content">
        <SimpleModal
          onSubmit={onSubmit}
          isOpen={isModalOpen}
          data={modalData}
          hideModal={() => setIsModalOpen(false)}
          ModalForm={AdministratorsForm}
          modalName="user"
        />
        {adminsList !== [] ? (
          <>
            {isLoading && (
              <div className="loading_overlay">
                <Spinner animation="border" size="lg" variant="success" />
              </div>
            )}
            <BasicTable data={adminsList} tableColumns={tableColumns} />
          </>
        ) : (
          <EmptyPage text={intl.formatMessage({ id: 'no.bank.yet' })} />
        )}
      </Row>
    </Row>
  )
})

export default AdministratorsPage
