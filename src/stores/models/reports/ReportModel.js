import { types } from 'mobx-state-tree'
import { DictionaryModel } from '../common'

export const ReportModel = types.model('ReportModel', {
  id: types.number,
  clientName: types.string,
  loanAmount: types.number,
  isCreditIssued: types.boolean,
  isWorksOnTheirOwnConfirmed: types.boolean,
  clientPhone: types.string,
  worksSavingAmount: types.number,
  coalSavingAmount: types.number,
  coalSavingVolume: types.number,
  loanOfficerName: types.string,
  dateTime: types.string,
  office: types.maybeNull(DictionaryModel),
  improvement: types.maybeNull(DictionaryModel),
  isEnergyEfficient: types.boolean,
  materialsSavingAmount: types.number,
  improvementAddress: types.maybeNull(types.string),
})
