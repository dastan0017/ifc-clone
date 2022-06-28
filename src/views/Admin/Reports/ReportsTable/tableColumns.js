import { ToggleSwitch } from 'components'
import { useIntl } from 'react-intl'

export const ReportsTableColumns = (openModal, updateReport) => {
  const intl = useIntl()
  return [
    {
      dataField: 'clientName',
      text: intl.formatMessage({ id: 'reports.client_name' }),
    },
    {
      dataField: 'clientPhone',
      text: intl.formatMessage({ id: 'reports.client_phone' }),
    },
    {
      dataField: 'office',
      text: intl.formatMessage({ id: 'reports.office' }),
      formatter: (office, row) => <div>{office.name}</div>,
    },
    {
      dataField: 'loanAmount',
      text: intl.formatMessage({ id: 'reports.loan_amount' }),
      classes: 'text_end',
    },
    {
      dataField: 'improvement',
      text: intl.formatMessage({ id: 'reports.improvement' }),
      formatter: improvement => <div>{improvement.name}</div>,
    },
    {
      dataField: 'worksSavingAmount',
      text: intl.formatMessage({ id: 'reports.works_saving_amount' }),
      classes: 'text_end',
    },
    {
      dataField: 'isEnergyEfficient',
      text: intl.formatMessage({ id: 'reports.energy_efficient' }),
      formatter: (cell, row) => (cell ? intl.formatMessage({ id: 'global.yes' }) : intl.formatMessage({ id: 'global.no' })),
    },
    {
      dataField: 'coalSavingAmount',
      text: intl.formatMessage({ id: 'reports.coal_saving_amount' }),
      classes: 'text_end',
    },
    {
      dataField: 'coalSavingVolume',
      text: intl.formatMessage({ id: 'reports.coal_saving_volume' }),
      classes: 'text_end',
    },
    {
      dataField: 'materialsSavingAmount',
      text: intl.formatMessage({ id: 'reports.material_saving_amount' }),
      classes: 'text_end',
    },
    {
      dataField: 'loanOfficerName',
      text: intl.formatMessage({ id: 'reports.loan_officer_name' }),
    },
    {
      dataField: 'dateTime',
      text: intl.formatMessage({ id: 'reports.date' }),
      formatter: (cell, row) => cell?.slice(0, 10),
    },
    {
      dataField: 'improvementAddress',
      text: intl.formatMessage({ id: 'reports.improvement_location_address' }),
    },
    {
      dataField: 'isCreditIssued',
      text: intl.formatMessage({ id: 'reports.credit_issued' }),
      classes: 'editable_cell',
      formatter: (cell, row) => {
        return (
          <ToggleSwitch
            defaultValue={cell}
            onToggle={newValue => {
              updateReport({ id: row.id, isCreditIssued: newValue, isWorksOnTheirOwnConfirmed: row.isWorksOnTheirOwnConfirmed })
            }}
          />
        )
      },
    },
    {
      dataField: 'isWorksOnTheirOwnConfirmed',
      text: intl.formatMessage({ id: 'reports.works_on_their_own' }),
      classes: 'editable_cell',
      editable: false,
      formatter: (cell, row) => {
        return (
          <ToggleSwitch
            defaultValue={cell}
            onToggle={newValue => {
              updateReport({ id: row.id, isCreditIssued: row.isCreditIssued, isWorksOnTheirOwnConfirmed: newValue })
            }}
          />
        )
      },
    },
  ]
}
