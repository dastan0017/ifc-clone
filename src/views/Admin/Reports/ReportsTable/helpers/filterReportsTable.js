import { YesNoEnum, ZeroNonzeroEnum } from 'enums'
import moment from 'moment'

export const filterReportsTable = (params, initData) => {
  let newData = initData

  const filterClientName = () => {
    if (params.clientName != '') {
      newData = newData.filter(el => el.clientName.toLowerCase().includes(params.clientName.toLowerCase()))
    }
  }
  const filterClientPhone = () => {
    if (params.clientPhone != '') {
      newData = newData.filter(el => el.clientPhone.toLowerCase().includes(params.clientPhone.toLowerCase()))
    }
  }
  const filterOffices = () => {
    if (params.officeId !== -1) {
      newData = initData.filter(el => el.office.id === params.officeId)
    }
  }
  // const filterBranches = () => {
  //   if (params.branchId !== -1) {
  //     newData = newData.filter(el => el.branchId === params.branchId)
  //   }
  // }
  const filterLoanAmout = () => {
    newData = newData.filter(el => {
      if (params.loanAmountTo === 0 && params.loanAmountFrom !== 0) {
        return params.loanAmountFrom <= el.loanAmount
      } else if (params.loanAmountTo !== 0) {
        return params.loanAmountFrom <= el.loanAmount && params.loanAmountTo >= el.loanAmount
      }
      return true
    })
  }
  const filterImprovements = () => {
    if (params.improvementId !== -1) {
      newData = newData.filter(el => el.improvementId === params.improvementId)
    }
  }
  const filterWorksSavingAmount = () => {
    if (params.worksSavingAmount !== ZeroNonzeroEnum.NOT_SPECIFIED) {
      newData = newData.filter(el => (params.worksSavingAmount === ZeroNonzeroEnum.ZERO ? el.worksSavingAmount === 0 : 0 < el.worksSavingAmount))
    }
  }
  const filterEnergyEfficiency = () => {
    if (params.energyEfficient !== YesNoEnum.NOT_SPECIFIED) {
      const isTrue = params.energyEfficient === YesNoEnum.YES ? true : false
      newData = newData.filter(el => isTrue === el.isEnergyEfficient)
    }
  }
  const filterWorksOnTheirOwn = () => {
    if (params.worksOnTheirOwn !== YesNoEnum.NOT_SPECIFIED) {
      const isTrue = params.worksOnTheirOwn === YesNoEnum.YES ? true : false
      newData = newData.filter(el => isTrue === el.isWorksOnTheirOwnConfirmed)
    }
  }
  const filterCoalSavingAmount = () => {
    if (params.coalSavingAmount !== ZeroNonzeroEnum.NOT_SPECIFIED) {
      newData = newData.filter(el => (params.coalSavingAmount === ZeroNonzeroEnum.ZERO ? el.coalSavingAmount === 0 : 0 < el.coalSavingAmount))
    }
  }
  const filterCoalSavingVolume = () => {
    if (params.coalSavingVolume !== ZeroNonzeroEnum.NOT_SPECIFIED) {
      newData = newData.filter(el => (params.coalSavingVolume === ZeroNonzeroEnum.ZERO ? el.coalSavingVolume === 0 : 0 < el.coalSavingVolume))
    }
  }
  const filterMaterialSavingAmount = () => {
    if (params.materialSavingAmount !== ZeroNonzeroEnum.NOT_SPECIFIED) {
      newData = newData.filter(el =>
        params.materialSavingAmount === ZeroNonzeroEnum.ZERO ? el.materialsSavingAmount === 0 : 0 < el.materialsSavingAmount,
      )
    }
  }
  const filterLoanOfficerName = () => {
    if (params.loanOfficerName != '') {
      newData = newData.filter(el => el.loanOfficerName.toLowerCase().includes(params.loanOfficerName.toLowerCase()))
    }
  }
  const filterDateFrom = () => {
    if (params.dateFrom) {
      newData = newData.filter(el => {
        const isAfter = moment(moment(el.dateTime).format('YYYY-MM-DD')).isAfter(params.dateFrom, 'day')
        return isAfter
      })
    }
  }
  const filterDateTo = () => {
    if (params.dateTo) {
      newData = newData.filter(el => {
        const isBefore = moment(moment(el.dateTime).format('YYYY-MM-DD')).isBefore(params.dateTo, 'day')
        return isBefore
      })
    }
  }
  const filterImprovementAddress = () => {
    if (params.improvementAddress != '') {
      newData = newData.filter(el => el.improvementAddress?.toLowerCase().includes(params.improvementAddress?.toLowerCase()))
    }
  }
  const filterCreditIssuency = () => {
    if (params.creditIssued !== YesNoEnum.NOT_SPECIFIED) {
      const isTrue = params.creditIssued === YesNoEnum.YES ? true : false
      newData = newData.filter(el => isTrue === el.isCreditIssued)
    }
  }

  filterClientName()
  filterClientPhone()
  filterOffices()
  // filterBranches()
  filterLoanAmout()
  filterImprovements()
  filterWorksSavingAmount()
  filterEnergyEfficiency()
  filterWorksOnTheirOwn()
  filterCoalSavingAmount()
  filterCoalSavingVolume()
  filterMaterialSavingAmount()
  filterLoanOfficerName()
  filterDateFrom()
  filterDateTo()
  filterImprovementAddress()
  filterCreditIssuency()

  return newData
}
