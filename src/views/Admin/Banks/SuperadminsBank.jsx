import { useCallback, useEffect, useState, Suspense, lazy } from 'react'
import { Row, Spinner } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { useStore } from 'hooks'
import { observer } from 'mobx-react'
import { EmptyPage, BasicTable, AddButton, SimpleModal, Select } from 'components'
import { AddBtnIcon } from 'icons'
import '../Pages.scss'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { sendNotification } from 'components/Toast'
import { BanksTableColumns } from './tableColumns'
import { BankForm } from './forms'
const OneBankPage = lazy(() => import('./OneBankPage'))
import { LanguageCodeEnum } from 'enums'

const SuperadminsBank = observer(({ routes }) => {
  const intl = useIntl()
  const history = useHistory()

  const { getBanksList, banksList, addNewBank, editBank, deleteBank } = useStore('banksStore')
  const { countriesList, getCountryList } = useStore('commonStore')

  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})

  const getBanks = useCallback(
    async countryId => {
      try {
        setIsLoading(true)
        await getBanksList(countryId)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    },
    [getBanksList],
  )

  useEffect(() => {
    const getCountries = async () => {
      try {
        await getCountryList(LanguageCodeEnum[intl.locale])
      } catch (err) {
        console.log(err)
      }
    }
    getCountries()

    getBanks()
  }, [getBanks, getCountryList, intl.locale])

  const onModalOpen = useCallback(
    (cellData, action = 'add') => {
      setIsModalOpen(true)
      if (action === 'edit') {
        setModalData({ ...cellData, action, countriesList })
      } else if (action === 'add') {
        setModalData({ action, countriesList })
      } else if (action === 'delete') {
        setModalData({ action, ...cellData })
      }
    },
    [countriesList],
  )

  const handleCountryChange = countryId => {
    getBanks(countryId)
  }

  const onSubmit = async data => {
    const bankData = {
      id: data.id,
      Name: data.bankName,
      CountryId: data.countryId,
      // TODO: IN FUTURE suppliers will be added here
      Suppliers: [],
    }

    try {
      if (modalData.action === 'edit') {
        await editBank(bankData)
      } else if (modalData.action === 'add') {
        await addNewBank(bankData)
      } else if (modalData.action === 'delete') {
        await deleteBank(data.id)
      }

      await getBanksList()

      sendNotification(
        intl.formatMessage({
          id: 'global.successfully',
          defaultMessage: 'Успех',
        }),
        'success',
      )
      setIsModalOpen(false)
    } catch (error) {
      sendNotification(intl.formatMessage({ id: 'global.default_error_message' }), 'error')
    }
  }

  const tableRowEvents = {
    onClick: (e, row, rowIndex) => {
      if (e.target.tagName === 'TD') {
        history.push(`/banks/${row.id}`)
      }
    },
  }

  const tableColumns = BanksTableColumns(onModalOpen)

  return (
    <>
      <Row className="w-100">
        <Suspense fallback={''}>
          <Switch>
            <Route exact path="/banks">
              <Row className="page_header">
                <Row className="page_header-filter">
                  <h2>{intl.formatMessage({ id: 'banks' })}</h2>
                  <Select list={countriesList} onChange={handleCountryChange} defaultMessage={intl.formatMessage({ id: 'global.select_country' })} />
                </Row>
                <AddButton onClick={onModalOpen} btnText={intl.formatMessage({ id: 'add.btn' })} ButtonIcon={AddBtnIcon} />
              </Row>
              <Row className="page_content">
                <SimpleModal
                  onSubmit={onSubmit}
                  isOpen={isModalOpen}
                  data={modalData}
                  hideModal={() => setIsModalOpen(false)}
                  ModalForm={BankForm}
                  modalName="bank"
                />
                {banksList === [] ? (
                  <EmptyPage text={intl.formatMessage({ id: 'no.bank.yet' })} onClick={onModalOpen} />
                ) : (
                  <>
                    {isLoading && (
                      <div className="loading_overlay">
                        <Spinner animation="border" size="lg" variant="success" />
                      </div>
                    )}
                    <BasicTable data={banksList} tableColumns={tableColumns} rowEvents={tableRowEvents} />
                  </>
                )}
              </Row>
            </Route>
            <Route path="/banks/:bankid">
              <OneBankPage />
            </Route>
            <Redirect to="/banks" />
          </Switch>
        </Suspense>
      </Row>
    </>
  )
})

export default SuperadminsBank
