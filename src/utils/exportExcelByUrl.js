export const exportExcelByUrl = url => {
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'excelFile.xlsx')
  link.setAttribute('target', '_self')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
