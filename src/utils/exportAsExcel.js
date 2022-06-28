export const exportAsExcel = async (exportReportsList, headers, tableBody) => {
  // exportReportsList: Function of "reportsStore" that makes request to Backend
  const data = {
    headers,
    data: tableBody,
  }
  await exportReportsList(data).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'template.xlsx')
    link.setAttribute('target', '_self')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })
}
