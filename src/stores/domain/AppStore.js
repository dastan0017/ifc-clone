import { types } from 'mobx-state-tree'

const AppStore = types
  .model('AppStore')
  .props({
    _currentLanguage: types.optional(types.union(types.literal('ru'), types.literal('en'), types.literal('kg')), 'ru'),
  })
  .actions(self => {
    const setLanguage = language => {
      self._currentLanguage = language
    }

    return {
      setLanguage,
    }
  })
  .views(self => ({
    get currentLanguage() {
      return self._currentLanguage
    },
  }))

export default AppStore
