export const filterWorkPricesTable = (params, initData) => {
  let newData = initData

  const filterCurrencyType = () => {
    if (params.currencyId !== -1) {
      newData = initData.filter(el => el.currency.id === params.currencyId)
    }
  }

  const filterPriceRegion = () => {
    if (params.priceRegionId !== -1) {
      newData = newData.filter(el => el.priceRegion.id === params.priceRegionId)
    }
  }

  filterCurrencyType()
  filterPriceRegion()

  return newData
}
