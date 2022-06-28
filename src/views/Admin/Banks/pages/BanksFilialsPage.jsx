import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Spinner } from 'react-bootstrap'
import { PlusButton, TooltipButton, EmptyPage, SimpleModal } from 'components'
import { EditBtnIcon, DeleteBtnIcon } from 'icons'
import { NavLink, Switch, Route, useLocation, useHistory } from 'react-router-dom'
import { FilialsOfficesPage } from './FilialsOfficesPage'
import { useStore } from 'hooks'
import { sendNotification } from 'components/Toast'
import { useIntl } from 'react-intl'
import { FilialForm } from '../forms'
import { observer } from 'mobx-react'

export const BanksFilialsPage = observer(({ bankId }) => {
  const intl = useIntl()
  const { pathname } = useLocation()
  const history = useHistory()
  // get current route and use it as filialId
  const filialId = pathname.split('/')[4]

  const { addNewFilial, editFilial, deleteFilial, getFilialsList, filialsList, priceRegionsList, getPriceRegionsList } = useStore('banksStore')

  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})

  useEffect(() => {
    const getRegions = async () => {
      try {
        await getPriceRegionsList()
      } catch (err) {
        console.log(err)
      }
    }

    getRegions()

    const getFilials = async () => {
      try {
        setIsLoading(true)
        await getFilialsList(bankId)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getFilials()
  }, [bankId, getFilialsList, getPriceRegionsList])

  const onModalOpen = (cellData, action = 'add') => {
    setIsModalOpen(true)
    if (action === 'edit') {
      setModalData({ ...cellData, action, priceRegionsList })
    } else if (action === 'add') {
      setModalData({ action, priceRegionsList })
    } else if (action === 'delete') {
      setModalData({ action })
    }
  }

  const onSubmit = async data => {
    const filialData = {
      name: data.filialName,
      bankId: parseInt(bankId, 10),
      id: parseInt(filialId, 10),
      priceRegionId: parseInt(data.priceRegionId, 10),
    }

    try {
      setIsLoading(true)
      setIsModalOpen(false)
      if (modalData.action === 'edit') {
        await editFilial(filialData)
      } else if (modalData.action === 'add') {
        await addNewFilial(filialData)
      } else if (modalData.action === 'delete') {
        await deleteFilial(filialId)
        await history.goBack()
      }

      await getFilialsList(bankId)

      sendNotification(
        intl.formatMessage({
          id: 'global.successfully',
          defaultMessage: 'Успех',
        }),
        'success',
      )
      setIsModalOpen(false)
    } catch (error) {
      sendNotification(
        Object.values(error.response?.data.errors?.Alert?.[0].toString()) || intl.formatMessage({ id: 'global.default_error_message' }),
        'error',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Row className="bank_details_page">
      <SimpleModal
        onSubmit={onSubmit}
        isOpen={isModalOpen}
        data={modalData}
        hideModal={() => setIsModalOpen(false)}
        ModalForm={FilialForm}
        modalName="branch"
      />
      <Row className="filials">
        <Row className="filials_header">
          <h3>{intl.formatMessage({ id: 'global.filials' })}</h3>
          <PlusButton onClick={onModalOpen} />
        </Row>
        <Row className="filials_content" style={{ position: 'relative' }}>
          {isLoading && (
            <div className="loading_overlay">
              <Spinner animation="border" size="lg" variant="success" />
            </div>
          )}
          {filialsList.length !== 0 ? (
            filialsList.map((el, idx) => (
              <NavLink to={`/banks/${bankId}/filials-and-offices/${el.id}`} key={idx} className={isActive => (isActive ? 'nav-link-active' : '')}>
                <div className="item_left">
                  <div className="circle"></div>
                  <span>{el.name}</span>
                </div>
                <Row>
                  <TooltipButton
                    ButtonIcon={EditBtnIcon}
                    onClick={() => onModalOpen({ name: el.name, priceRegionId: el.priceRegionId }, 'edit')}
                    tooltipText={intl.formatMessage({ id: 'global.edit' })}
                  />
                  {el.isDeletable && (
                    <TooltipButton
                      ButtonIcon={DeleteBtnIcon}
                      onClick={() => onModalOpen({}, 'delete')}
                      tooltipText={intl.formatMessage({ id: 'global.delete' })}
                    />
                  )}
                </Row>
              </NavLink>
            ))
          ) : (
            <EmptyPage text={intl.formatMessage({ id: 'no.branch.yet' })} onClick={onModalOpen} />
          )}
        </Row>
      </Row>
      <Row className="offices">
        <Switch>
          <Route path={`/banks/${bankId}/filials-and-offices/:filialid`}>
            <FilialsOfficesPage bankId={bankId} />
          </Route>
        </Switch>
      </Row>
    </Row>
  )
})
BanksFilialsPage.propTypes = {
  bankId: PropTypes.string,
}

export default BanksFilialsPage
