import { when } from 'mobx'
import { apiV1 } from '../../utils'
import { applySnapshot, getSnapshot, types } from 'mobx-state-tree'
import { fromPromise } from 'mobx-utils'
import {
  EnergyResourceModel,
  PriceRegionModel,
  CurrencyModel,
  MaterialTypesModel,
  MaterialModel,
  WorkModel,
  MaterialPriceModel,
  WorkPriceModel,
} from '../models'

const ReferenceBooksStore = types
  .model('ReferenceBooksStore')
  .props({
    _energyResourceList: types.array(EnergyResourceModel),
    _priceRegionList: types.array(PriceRegionModel),
    _currecyList: types.array(CurrencyModel),
    _materialTypesList: types.array(MaterialTypesModel),
    _workTypesList: types.array(MaterialTypesModel),
    _materialsList: types.array(MaterialModel),
    _worksList: types.array(WorkModel),
    _materialPricesList: types.array(MaterialPriceModel),
    _workPricesList: types.array(WorkPriceModel),
  })
  .actions(self => {
    const ENERGY_RESOURCE_URL = 'EnergyResources'
    const PRICE_REGIONS_URL = 'PriceRegions'
    const CURRENCIES_URL = 'Currencies'
    const MATERIAL_TYPES_URL = 'MaterialTypes'
    const WORK_TYPES_URL = 'WorkTypes'
    const MATERIALS_URL = 'Materials'
    const WORKS_URL = 'Works'
    const MATERIAL_PRICES_URL = 'MaterialPrices'
    const WORK_PRICES_URL = 'WorkPrices'

    const setEnergyResourceList = resources => {
      applySnapshot(self._energyResourceList, resources)
    }
    const setPriceRegionList = regions => {
      applySnapshot(self._priceRegionList, regions)
    }
    const setCurrencyList = currencies => {
      applySnapshot(self._currecyList, currencies)
    }
    const setMaterialTypes = types => {
      applySnapshot(self._materialTypesList, types)
    }
    const setWorkTypesList = types => {
      applySnapshot(self._workTypesList, types)
    }
    const setMaterials = materials => {
      applySnapshot(self._materialsList, materials)
    }
    const setWorks = works => {
      applySnapshot(self._worksList, works)
    }
    const setMaterialPrices = prices => {
      applySnapshot(self._materialPricesList, prices)
    }
    const setWorkPrices = prices => {
      applySnapshot(self._workPricesList, prices)
    }

    const getEnergyResourceList = (language = null, typeId = null, regionId = null) => {
      const getEnergyResouresRequest = fromPromise(apiV1.get(`${ENERGY_RESOURCE_URL}`, { params: { culture: language, tid: typeId, rid: regionId } }))
      when(() => {
        getEnergyResouresRequest.case({
          fulfilled: response => {
            setEnergyResourceList(response.data)
            return true
          },
        })
      })

      return getEnergyResouresRequest
    }

    const addEnergyResource = async data => {
      const addResourceRequest = fromPromise(apiV1.post(`${ENERGY_RESOURCE_URL}`, data))
      return addResourceRequest
    }

    const updateEnergyResource = async newData => {
      const updateResourceRequest = fromPromise(apiV1.put(`${ENERGY_RESOURCE_URL}`, newData))
      return updateResourceRequest
    }

    const deleteEnergyResource = async id => {
      const deleteResourceRequest = fromPromise(apiV1.delete(`${ENERGY_RESOURCE_URL}/${id}`, { params: { id } }))
      return deleteResourceRequest
    }

    const getCurrencyList = () => {
      const getCurrencyRequest = fromPromise(apiV1.get(`${CURRENCIES_URL}`))
      when(() => {
        getCurrencyRequest.case({
          fulfilled: response => {
            setCurrencyList(response.data)
            return true
          },
        })
      })

      return getCurrencyRequest
    }

    const addCurrency = async data => {
      const request = fromPromise(apiV1.post(`${CURRENCIES_URL}`, data))
      return request
    }

    const updateCurrency = async newData => {
      const request = fromPromise(apiV1.put(`${CURRENCIES_URL}`, newData))
      return request
    }

    const deleteCurrency = async id => {
      const request = fromPromise(apiV1.delete(`${CURRENCIES_URL}/${id}`, { params: { id } }))
      return request
    }

    const getPriceRegionList = () => {
      const getRegionsRequest = fromPromise(apiV1.get(`${PRICE_REGIONS_URL}`))
      when(() => {
        getRegionsRequest.case({
          fulfilled: response => {
            setPriceRegionList(response.data)
            return true
          },
        })
      })

      return getRegionsRequest
    }

    const addPriceRegion = async data => {
      const request = fromPromise(apiV1.post(`${PRICE_REGIONS_URL}`, data))
      return request
    }

    const updatePriceRegion = async newData => {
      const request = fromPromise(apiV1.put(`${PRICE_REGIONS_URL}`, newData))
      return request
    }

    const deletePriceRegion = async id => {
      const request = fromPromise(apiV1.delete(`${PRICE_REGIONS_URL}/${id}`, { params: { id } }))
      return request
    }

    const getWorkTypesList = () => {
      const request = fromPromise(apiV1.get(`${WORK_TYPES_URL}`))
      when(() => {
        request.case({
          fulfilled: response => {
            setWorkTypesList(response.data)
            return true
          },
        })
      })

      return request
    }

    const getMaterialTypesList = () => {
      const request = fromPromise(apiV1.get(`${MATERIAL_TYPES_URL}`))
      when(() => {
        request.case({
          fulfilled: response => {
            setMaterialTypes(response.data)
            return true
          },
        })
      })

      return request
    }

    const addWorkType = async data => {
      const request = fromPromise(apiV1.post(`${WORK_TYPES_URL}`, data))
      return request
    }

    const addMaterialType = async data => {
      const request = fromPromise(apiV1.post(`${MATERIAL_TYPES_URL}`, data))
      return request
    }

    const updateMaterialType = async newData => {
      const request = fromPromise(apiV1.put(`${MATERIAL_TYPES_URL}`, newData))
      return request
    }

    const updateWorkType = async newData => {
      const request = fromPromise(apiV1.put(`${WORK_TYPES_URL}`, newData))
      return request
    }

    const deleteMaterialType = async id => {
      const request = fromPromise(apiV1.delete(`${MATERIAL_TYPES_URL}/${id}`, { params: { id } }))
      return request
    }

    const deleteWorkType = async id => {
      const request = fromPromise(apiV1.delete(`${WORK_TYPES_URL}/${id}`, { params: { id } }))
      return request
    }

    const getMaterialsList = params => {
      const request = fromPromise(apiV1.get(`${MATERIALS_URL}`, { params }))
      when(() => {
        request.case({
          fulfilled: response => {
            setMaterials(response.data)
            return true
          },
        })
      })

      return request
    }

    const getMaterial = id => {
      const request = fromPromise(apiV1.get(`${MATERIALS_URL}/${id}`))
      return request
    }

    const addMaterial = async data => {
      const request = fromPromise(apiV1.post(`${MATERIALS_URL}`, data))
      return request
    }

    const updateMaterial = async newData => {
      const request = fromPromise(apiV1.put(`${MATERIALS_URL}`, newData))
      return request
    }

    const deleteMaterial = async id => {
      const request = fromPromise(apiV1.delete(`${MATERIALS_URL}/${id}`, { params: { id } }))
      return request
    }
    const addWork = async data => {
      const request = fromPromise(apiV1.post(`${WORKS_URL}`, data))
      return request
    }

    const updateWork = async newData => {
      const request = fromPromise(apiV1.put(`${WORKS_URL}`, newData))
      return request
    }

    const deleteWork = async id => {
      const request = fromPromise(apiV1.delete(`${WORKS_URL}/${id}`, { params: { id } }))
      return request
    }

    const getWorksList = params => {
      const request = fromPromise(apiV1.get(`${WORKS_URL}`, { params }))
      when(() => {
        request.case({
          fulfilled: response => {
            setWorks(response.data)
            return true
          },
        })
      })

      return request
    }

    const getWork = id => {
      const request = fromPromise(apiV1.get(`${WORKS_URL}/${id}`))
      return request
    }

    const getMaterialPricesList = params => {
      const request = fromPromise(apiV1.get(`${MATERIAL_PRICES_URL}`, { params }))
      when(() => {
        request.case({
          fulfilled: response => {
            setMaterialPrices(response.data)
            return true
          },
        })
      })

      return request
    }
    const getWorkPricesList = params => {
      const request = fromPromise(apiV1.get(`${WORK_PRICES_URL}`, { params }))
      when(() => {
        request.case({
          fulfilled: response => {
            setWorkPrices(response.data)
            return true
          },
        })
      })

      return request
    }

    const updateMaterialPrice = async newData => {
      const request = fromPromise(apiV1.put(`${MATERIAL_PRICES_URL}`, newData))
      return request
    }

    const updateWorkPrice = async newData => {
      const request = fromPromise(apiV1.put(`${WORK_PRICES_URL}`, newData))
      return request
    }

    const exportMaterialPricesAsExcel = (culture = 'en-US', fileType = 'excel') => {
      const request = fromPromise(apiV1.get(`${MATERIAL_PRICES_URL}/Export`, { params: { culture, type: fileType } }))
      return request
    }
    const importMaterialPricesAsExcel = (data, culture = 'en-US', fileType = 'excel') => {
      const request = fromPromise(apiV1.put(`${MATERIAL_PRICES_URL}/Import`, data))
      return request
    }

    const exportWorkPricesAsExcel = (culture = 'en-US', fileType = 'excel') => {
      const request = fromPromise(apiV1.get(`${WORK_PRICES_URL}/Export`, { params: { culture, type: fileType } }))
      return request
    }
    const importWorkPricesAsExcel = (data, culture = 'en-US', fileType = 'excel') => {
      const request = fromPromise(apiV1.put(`${WORK_PRICES_URL}/Import`, data))
      return request
    }

    return {
      setEnergyResourceList,
      getEnergyResourceList,
      getPriceRegionList,
      addEnergyResource,
      updateEnergyResource,
      deleteEnergyResource,
      getCurrencyList,
      addCurrency,
      updateCurrency,
      deleteCurrency,
      getMaterialTypesList,
      addMaterialType,
      updateMaterialType,
      deleteMaterialType,
      getMaterialsList,
      getWorksList,
      getWorkTypesList,
      addWorkType,
      deleteWorkType,
      updateWorkType,
      getMaterialPricesList,
      getWorkPricesList,
      exportMaterialPricesAsExcel,
      importMaterialPricesAsExcel,
      exportWorkPricesAsExcel,
      importWorkPricesAsExcel,
      addPriceRegion,
      updatePriceRegion,
      deletePriceRegion,
      addWork,
      updateWork,
      deleteWork,
      updateMaterialPrice,
      updateWorkPrice,
      addMaterial,
      updateMaterial,
      deleteMaterial,
      getWork,
      getMaterial,
    }
  })
  .views(self => ({
    get energyResourceList() {
      return getSnapshot(self._energyResourceList)
    },
    get priceRegionList() {
      return getSnapshot(self._priceRegionList)
    },
    get currencyList() {
      return getSnapshot(self._currecyList)
    },
    get materialTypesList() {
      return getSnapshot(self._materialTypesList)
    },
    get workTypesList() {
      return getSnapshot(self._workTypesList)
    },
    get materialsList() {
      return getSnapshot(self._materialsList)
    },
    get worksList() {
      return getSnapshot(self._worksList)
    },
    get materialPricesList() {
      return getSnapshot(self._materialPricesList)
    },
    get workPricesList() {
      return getSnapshot(self._workPricesList)
    },
  }))

export default ReferenceBooksStore
