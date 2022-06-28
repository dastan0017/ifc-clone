import { MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'

export const useStore = storeName => {
  return useContext(MobXProviderContext)[storeName]
}
