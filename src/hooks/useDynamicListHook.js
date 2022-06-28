export const useDynamicList = setDynamicList => {
  return {
    addToList: (key, value) => {
      setDynamicList(prev => new Map([...prev, [key, value]]))
    },

    deleteFromList: key => {
      setDynamicList(prev => {
        const newList = new Map(prev)
        newList.delete(key)
        return newList
      })
    },

    addAllItemsToList: items => {
      const newList = [Array(items.length).fill(null)]
      for (let i = 0; i < items.length; i++) {
        newList[i] = [i, items[i]] // [key, value]
      }
      setDynamicList(new Map(newList))
    },

    clearList: () => {
      setDynamicList(prev => new Map(prev.clear()))
    },
  }
}
