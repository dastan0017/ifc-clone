import { applySnapshot, getSnapshot, types } from 'mobx-state-tree'
import { fromPromise, FULFILLED } from 'mobx-utils'
import { ReportModel } from 'stores/models'
import { apiV1 } from '../../utils'
import { when } from 'mobx'

const ReportsStore = types
  .model('ReportsStore')
  .props({
    _data: types.optional(types.array(ReportModel), []),
    _isPending: types.optional(types.boolean, false),
    _improvementsList: types.optional(types.array(types.model({ id: types.number, name: types.string })), []),
  })
  .actions(self => {
    const API_IMPROVEMENTS_URL = '/Improvements'
    const REPORTS_URL = '/Reports'

    const setReportsList = reportsList => {
      applySnapshot(self._data, reportsList)
    }

    const setImprovementsList = imrovementsList => {
      applySnapshot(self._improvementsList, imrovementsList)
    }

    const getReportsList = (iid = null, oid = null, cid = null) => {
      const getReportsRequest = fromPromise(apiV1.get(REPORTS_URL, { params: { iid, oid, cid } }))
      // iid = improvement id
      // oid = office id
      // cid = currency id
      when(() => {
        getReportsRequest.case({
          fulfilled: response => {
            setReportsList(response.data)
            return true
          },
        })
      })
      return getReportsRequest
    }

    const exportReportsAsExcel = (culture = 'en-US', fileType = 'excel') => {
      const request = fromPromise(apiV1.get(`${REPORTS_URL}/Export`, { params: { culture, type: fileType } }))
      return request
    }

    const getImprovementsList = (culture = null) => {
      const getImprovementsRequest = fromPromise(apiV1.get(`${API_IMPROVEMENTS_URL}`, { params: { culture } }))
      when(() => {
        getImprovementsRequest.case({
          fulfilled: response => {
            setImprovementsList(response.data)
            return true
          },
        })
      })
      return getImprovementsRequest
    }

    const updateReportsList = updatedList => {
      const updateReportsRequest = fromPromise(apiV1.put('/report/list', updatedList))
      when(() => {
        updateReportsRequest.case({
          fulfilled: response => {
            getReportsList()
            return true
          },
        })
      })
      return updateReportsRequest
    }

    const deleteReportsList = reportIds => {
      const deleteReportsRequest = fromPromise(
        apiV1.delete(`${REPORTS_URL}/RemoveRange`, {
          data: reportIds,
        }),
      )
      when(() => {
        deleteReportsRequest.case({
          fulfilled: response => {
            getReportsList()
            return true
          },
        })
      })
      return deleteReportsRequest
    }

    return {
      getReportsList,
      setReportsList,
      exportReportsAsExcel,
      getImprovementsList,
      updateReportsList,
      deleteReportsList,
    }
  })
  .views(self => ({
    get reportsList() {
      return getSnapshot(self._data)
    },
    get improvementsList() {
      return getSnapshot(self._improvementsList)
    },
    get isPending() {
      return self._isPending
    },
  }))

export default ReportsStore
