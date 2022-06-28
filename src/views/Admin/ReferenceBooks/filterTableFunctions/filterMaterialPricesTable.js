export const filterMaterialPricesTable = (params, initData) => {
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

  const filterSupplier = () => {
    if (params.supplierId !== -1) {
      newData = newData.filter(el => el.supplier.id === params.supplierId)
    }
  }

  filterCurrencyType()
  filterPriceRegion()
  filterSupplier()

  return newData
}
