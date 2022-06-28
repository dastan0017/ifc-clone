import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { EmptyPage, SimpleModal, BasicTable } from 'components'
import { useStore } from 'hooks'
import { Row, Spinner } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { sendNotification } from 'components/Toast'
import { OfficesTableColumns } from '../tableColumns'
import { OfficeForm } from '../forms'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

export const FilialsOfficesPage = observer(({ bankId }) => {
  const intl = useIntl()
  const { filialid } = useParams()

  const banksStore = useStore('banksStore')

  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})

  useEffect(() => {
    const getOfficesList = async filialId => {
      try {
        setIsLoading(true)
        await banksStore.getOfficesList(filialId)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getOfficesList(filialid)
  }, [banksStore, filialid])

  const onModalOpen = (cellData, action = 'add') => {
    setIsModalOpen(true)
    if (action === 'edit') {
      setModalData({ ...cellData, action, priceRegionsList: banksStore.priceRegionsList })
    } else if (action === 'add') {
      setModalData({ action, priceRegionsList: banksStore.priceRegionsList })
    } else if (action === 'delete') {
      setModalData({ ...cellData, action })
    }
  }

  const onSubmit = async data => {
    const officeData = {
      id: data.id,
      name: data.officeName,
      priceRegionId: data.priceRegionId !== '' ? data.priceRegionId : null,
      branchId: parseInt(filialid, 10),
    }

    try {
      setIsLoading(true)
      setIsModalOpen(false)
      if (modalData.action === 'edit') {
        await banksStore.editOffice(officeData)
      } else if (modalData.action === 'add') {
        await banksStore.addNewOffice(officeData)
      } else if (modalData.action === 'delete') {
        await banksStore.deleteOffice(data.id)
      }

      await banksStore.getOfficesList(filialid)
      await banksStore.getFilialsList(bankId)

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

  const tableColumns = OfficesTableColumns(onModalOpen)

  return (
    <Row className="w-100">
      <SimpleModal
        onSubmit={onSubmit}
        isOpen={isModalOpen}
        data={modalData}
        hideModal={() => setIsModalOpen(false)}
        ModalForm={OfficeForm}
        modalName="office"
      />
      <Row className="page_content">
        {isLoading && (
          <div className="loading_overlay">
            <Spinner animation="border" size="lg" variant="success" />
          </div>
        )}
        <>
          {banksStore.officesList.length !== 0 ? (
            <BasicTable data={banksStore.officesList} tableColumns={tableColumns} />
          ) : (
            <EmptyPage text={intl.formatMessage({ id: 'no.office.yet' })} onClick={onModalOpen} />
          )}
        </>
      </Row>
    </Row>
  )
})
FilialsOfficesPage.propTypes = {
  bankId: PropTypes.string,
}
