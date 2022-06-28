import { when } from 'mobx'
import { apiV1 } from '../../utils'
import { applySnapshot, getSnapshot, types } from 'mobx-state-tree'
import { fromPromise, FULFILLED } from 'mobx-utils'
import { DictionaryModel } from '../models'

const CommonStore = types
  .model('CommonStore')
  .props({
    _countryList: types.array(DictionaryModel),
    _energyResourceTypeList: types.array(DictionaryModel),
    _measurementUnitsList: types.array(DictionaryModel),
    _suppliersList: types.array(DictionaryModel),
    _languagesList: types.array(types.model({ name: types.string, id: types.string })),
  })
  .actions(self => {
    const COUNTRY_URL = 'Countries'
    const ENERGY_RESOURCE_TYPE_URL = 'EnergyResourceTypes'
    const MEASUREMENT_UNITS_URL = 'MeasurementUnits'
    const SUPPLIERS_URL = 'Suppliers'
    const LANGUAGES_URL = 'Languages'

    const setCountryList = countries => {
      applySnapshot(self._countryList, countries)
    }
    const setEnergyResourceTypeList = resourceTypes => {
      applySnapshot(self._energyResourceTypeList, resourceTypes)
    }
    const setMeasurementUnitsList = measurementUnits => {
      applySnapshot(self._measurementUnitsList, measurementUnits)
    }
    const setSuppliersList = suppliers => {
      applySnapshot(self._suppliersList, suppliers)
    }
    const setLanguagesList = languages => {
      applySnapshot(self._languagesList, languages)
    }

    const getCountryList = (language = null) => {
      const getCountryListRequest = fromPromise(apiV1.get(`${COUNTRY_URL}`, { params: { culture: language } }))
      when(() => {
        getCountryListRequest.case({
          fulfilled: response => {
            setCountryList(response.data)
            return true
          },
        })
      })

      return getCountryListRequest
    }

    const getEnergyResourceTypeList = language => {
      const getEnergyTypeListRequest = fromPromise(apiV1.get(`${ENERGY_RESOURCE_TYPE_URL}`, { params: { culture: language } }))
      when(() => {
        getEnergyTypeListRequest.case({
          fulfilled: response => {
            setEnergyResourceTypeList(response.data)
            return true
          },
        })
      })

      return getEnergyTypeListRequest
    }

    const getMeasurementUnitsList = (language = null) => {
      const request = fromPromise(apiV1.get(`${MEASUREMENT_UNITS_URL}`, { params: { culture: language } }))
      when(() => {
        request.case({
          fulfilled: response => {
            setMeasurementUnitsList(response.data)
            return true
          },
        })
      })

      return request
    }

    const getSuppliersList = () => {
      const request = fromPromise(apiV1.get(`${SUPPLIERS_URL}`))
      when(() => {
        request.case({
          fulfilled: response => {
            setSuppliersList(response.data)
            return true
          },
        })
      })

      return request
    }
    const getLanguagesList = () => {
      const request = fromPromise(apiV1.get(`${LANGUAGES_URL}`))
      when(() => {
        request.case({
          fulfilled: response => {
            setLanguagesList(response.data)
            return true
          },
        })
      })

      return request
    }

    return {
      setCountryList,
      getCountryList,
      getEnergyResourceTypeList,
      setEnergyResourceTypeList,
      getMeasurementUnitsList,
      getSuppliersList,
      getLanguagesList,
    }
  })
  .views(self => ({
    get countriesList() {
      return getSnapshot(self._countryList)
    },
    get energyResourceTypeList() {
      return getSnapshot(self._energyResourceTypeList)
    },
    get measurementUnitsList() {
      return getSnapshot(self._measurementUnitsList)
    },
    get suppliersList() {
      return getSnapshot(self._suppliersList)
    },
    get languagesList() {
      return getSnapshot(self._languagesList)
    },
  }))

export default CommonStore
