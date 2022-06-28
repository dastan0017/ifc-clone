export const filterWorksTable = (params, initData) => {
  let newData = initData

  const filterWorksType = () => {
    if (params.workTypeId !== -1) {
      newData = initData.filter(el => el.workType.id === params.workTypeId)
    }
  }

  const filterMeasurementUnit = () => {
    if (params.measurementUnitId !== -1) {
      newData = newData.filter(el => el.measurementUnit.id === params.measurementUnitId)
    }
  }

  filterWorksType()
  filterMeasurementUnit()

  return newData
}
