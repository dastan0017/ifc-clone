import { applySnapshot, getSnapshot, types } from 'mobx-state-tree'
import { fromPromise, FULFILLED } from 'mobx-utils'
import { BankModel, BankKeyModel, BankFilialModel, BankOfficeModel, PriceRegionModel } from 'stores/models'
import { apiV1 } from '../../utils'
import { when } from 'mobx'

export const BanksStore = types
  .model('BanksStore')
  .props({
    _data: types.optional(types.array(BankModel), []),
    _keysList: types.optional(types.array(BankKeyModel), []),
    _filialsList: types.optional(types.array(BankFilialModel), []),
    _officesList: types.optional(types.array(BankOfficeModel), []),
    _priceRegionsList: types.optional(types.array(PriceRegionModel), []),
    _isPending: types.optional(types.boolean, false),
  })
  .actions(self => {
    const API_URL = '/Banks'
    const BANK_KEYS_URL = 'BankKeys'
    const FILIALS_URL = '/Branches'
    const OFFICES_URL = '/Offices'
    const PRICE_REGION_URL = 'PriceRegions'
    let firstRequest = true

    const setBanksList = banksList => {
      applySnapshot(self._data, banksList)
    }

    const setBankKeysList = keysList => {
      applySnapshot(self._keysList, keysList)
    }

    const setBankFilialsList = filialsList => {
      applySnapshot(self._filialsList, filialsList)
    }

    const setBankOfficesList = officesList => {
      applySnapshot(self._officesList, officesList)
    }

    const setPriceRegionsList = regionsList => {
      applySnapshot(self._priceRegionsList, regionsList)
    }

    const getBanksList = (cid = null) => {
      const getBanksRequest = fromPromise(apiV1.get(`${API_URL}`, { params: { cid } }))
      when(() => {
        getBanksRequest.case({
          fulfilled: response => {
            setBanksList(response.data)
            return true
          },
        })
      })

      return getBanksRequest
    }

    const getBank = bankId => {
      const request = fromPromise(apiV1.get(`${API_URL}/${bankId}`, { params: { id: bankId } }))
      return request
    }

    const editBank = async bankData => {
      const editBankRequest = fromPromise(apiV1.put(`${API_URL}`, bankData))
      return editBankRequest
    }

    const addNewBank = async bankData => {
      const addNewBankRequest = fromPromise(apiV1.post(`${API_URL}`, bankData))
      return addNewBankRequest
    }

    const deleteBank = async id => {
      const deleteBankRequest = fromPromise(apiV1.delete(`${API_URL}/${id}`))
      return deleteBankRequest
    }

    const getBankKeysList = (bankId = null) => {
      const getBankKeysRequest = fromPromise(apiV1.get(`${BANK_KEYS_URL}`, { params: { bid: bankId } }))
      when(() => {
        getBankKeysRequest.case({
          fulfilled: response => {
            setBankKeysList(response.data)
            return true
          },
        })
      })

      return getBankKeysRequest
    }

    const editBankKey = async keyData => {
      const editBankKeyRequest = fromPromise(apiV1.put(`${BANK_KEYS_URL}`, keyData))
      return editBankKeyRequest
    }

    const addNewBankKey = async keyData => {
      const addNewBankKeyRequest = fromPromise(apiV1.post(`${BANK_KEYS_URL}`, keyData))
      return addNewBankKeyRequest
    }

    const deleteBankKey = async id => {
      const deleteBankKeyRequest = fromPromise(apiV1.delete(`${BANK_KEYS_URL}/${id}`))
      return deleteBankKeyRequest
    }

    const getFilialsList = (bankId = null, regionId = null) => {
      const getFilialsRequest = fromPromise(apiV1.get(`${FILIALS_URL}`, { params: { bid: bankId, rid: regionId } }))
      when(() => {
        getFilialsRequest.case({
          fulfilled: response => {
            setBankFilialsList(response.data)
            return true
          },
        })
      })

      return getFilialsRequest
    }

    const addNewFilial = filialData => {
      const addNewFilialRequest = fromPromise(apiV1.post(`${FILIALS_URL}`, filialData))
      return addNewFilialRequest
    }

    const editFilial = filialData => {
      const editFilialRequest = fromPromise(apiV1.put(`${FILIALS_URL}`, filialData))
      return editFilialRequest
    }

    const deleteFilial = filialId => {
      const deleteFilialRequest = fromPromise(apiV1.delete(`${FILIALS_URL}/${filialId}`))
      return deleteFilialRequest
    }

    const getOfficesList = (bankId = null, regionId = null) => {
      const getOfficesRequest = fromPromise(apiV1.get(`${OFFICES_URL}`, { params: { bid: bankId, rid: regionId } }))
      when(() => {
        getOfficesRequest.case({
          fulfilled: response => {
            setBankOfficesList(response.data)
            return true
          },
        })
      })

      return getOfficesRequest
    }

    const addNewOffice = officeData => {
      const addNewFilialRequest = fromPromise(apiV1.post(`${OFFICES_URL}`, officeData))
      return addNewFilialRequest
    }

    const editOffice = officeData => {
      const editFilialRequest = fromPromise(apiV1.put(`${OFFICES_URL}`, officeData))
      return editFilialRequest
    }

    const deleteOffice = filialId => {
      const deleteFilialRequest = fromPromise(apiV1.delete(`${OFFICES_URL}/${filialId}`))
      return deleteFilialRequest
    }

    const getPriceRegionsList = () => {
      const getRegionsRequest = fromPromise(apiV1.get(`${PRICE_REGION_URL}`))
      when(() => {
        getRegionsRequest.case({
          fulfilled: response => {
            setPriceRegionsList(response.data)
            return true
          },
        })
      })

      return getRegionsRequest
    }

    return {
      getBanksList,
      editBank,
      addNewBank,
      deleteBank,
      setBanksList,
      getBankKeysList,
      setBankKeysList,
      editBankKey,
      addNewBankKey,
      deleteBankKey,
      getFilialsList,
      setBankFilialsList,
      getOfficesList,
      setBankOfficesList,
      addNewFilial,
      editFilial,
      deleteFilial,
      addNewOffice,
      editOffice,
      deleteOffice,
      getPriceRegionsList,
      getBank,
    }
  })
  .views(self => ({
    get banksList() {
      return getSnapshot(self._data)
    },
    get isPending() {
      return self._isPending
    },
    get keysList() {
      return getSnapshot(self._keysList)
    },
    get filialsList() {
      return getSnapshot(self._filialsList)
    },
    get officesList() {
      return getSnapshot(self._officesList)
    },
    get priceRegionsList() {
      return getSnapshot(self._priceRegionsList)
    },
  }))

export default BanksStore
