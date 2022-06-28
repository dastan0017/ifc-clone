import AdminsStore from './AdminsStore'
import AppStore from './AppStore'
import AuthStore from './AuthStore'
import BanksStore from './BanksStore'
import ReportsStore from './ReportsStore'
import CommonStore from './CommonStore'
import ReferenceBooksStore from './ReferenceBooksStore'

const rootStore = {
  appStore: AppStore.create(),
  authStore: AuthStore.create(),
  adminsStore: AdminsStore.create(),
  banksStore: BanksStore.create(),
  reportsStore: ReportsStore.create(),
  commonStore: CommonStore.create(),
  referenceBooksStore: ReferenceBooksStore.create(),
}

export * from './AppStore'
export * from './AuthStore'
export * from './AdminsStore'
export * from './BanksStore'
export * from './ReportsStore'
export * from './CommonStore'
export * from './ReferenceBooksStore'

export { rootStore as stores, AppStore, AuthStore, AdminsStore, BanksStore, ReportsStore, CommonStore, ReferenceBooksStore }
