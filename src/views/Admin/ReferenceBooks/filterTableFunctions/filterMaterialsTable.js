export const filterMaterialsTable = (params, initData) => {
  let newData = initData

  const filterMaterialType = () => {
    if (params.materialTypeId !== -1) {
      newData = initData.filter(el => el.materialType.id === params.materialTypeId)
    }
  }

  const filterMeasurementUnit = () => {
    if (params.measurementUnitId !== -1) {
      newData = newData.filter(el => el.measurementUnit.id === params.measurementUnitId)
    }
  }

  filterMaterialType()
  filterMeasurementUnit()

  return newData
}
