import { applySnapshot, getSnapshot, types } from 'mobx-state-tree'
import { fromPromise, FULFILLED } from 'mobx-utils'
import { AdminModel } from 'stores/models'
import { apiV1 } from '../../utils'
import { when } from 'mobx'

const AdminsStore = types
  .model('AdminsStore')
  .props({
    _data: types.optional(types.array(AdminModel), []),
    _isPending: types.optional(types.boolean, false),
  })
  .actions(self => {
    const API_URL = '/Admins'
    let firstRequest = true

    const setAdminsList = adminsList => {
      applySnapshot(self._data, adminsList)
    }

    const getAdminsList = (bankId = null) => {
      const getAdminsRequest = fromPromise(apiV1.get(`${API_URL}`, { bankId }))
      when(() => {
        getAdminsRequest.case({
          fulfilled: response => {
            setAdminsList(response.data)
            return true
          },
        })
      })
      firstRequest = false
      return getAdminsRequest
    }

    const getAdminInfo = () => {
      const request = fromPromise(apiV1.get(`${API_URL}/AboutMe`))
      return request
    }

    const editAdmin = async adminData => {
      const editAdminRequest = fromPromise(apiV1.put(`${API_URL}`, adminData))
      return editAdminRequest
    }

    const addNewAdmin = async adminData => {
      const addNewAdminRequest = fromPromise(apiV1.post(`${API_URL}`, adminData))
      return addNewAdminRequest
    }

    const deleteAdmin = async id => {
      const deleteAdminRequest = fromPromise(apiV1.delete(`${API_URL}/${id}`, { params: { id } }))
      return deleteAdminRequest
    }

    return {
      getAdminsList,
      setAdminsList,
      addNewAdmin,
      editAdmin,
      deleteAdmin,
      getAdminInfo,
    }
  })
  .views(self => ({
    get adminsList() {
      return getSnapshot(self._data)
    },
    get isPending() {
      return self._isPending
    },
  }))

export default AdminsStore
