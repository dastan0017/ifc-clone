import { sendNotification } from 'components/Toast'

export const sendErrorNotifications = (defaultErrorMessage, errors) => {
  if (!errors) return sendNotification(defaultErrorMessage, 'error')
  Object.entries(errors).forEach(([errorKey, errorMessage]) => {
    sendNotification(errorKey ? errorMessage : defaultErrorMessage, 'error')
  })
}

//For work with Local Storage
export const getLocalStorage = key => JSON.parse(localStorage.getItem(key) || '[]')

export const setLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data))

export const handleError = (error, defaultErrorMessage) => {
  const errors = error.response?.data.errors
  if (error?.response?.status !== 401) {
    sendErrorNotifications(defaultErrorMessage, errors)
  }
}

export const getFormData = object => {
  const formData = new FormData()
  Object.keys(object).forEach(key => {
    if (Array.isArray(object[key])) {
      object[key].forEach(item => formData.append(key, item))
    } else {
      formData.append(key, object[key])
    }
  })
  return formData
}

// This Function works only for publications:

export const getFormDataPublications = object => {
  const formData = new FormData()
  Object.keys(object).forEach(key => {
    if (Array.isArray(object[key])) {
      if (key === 'files') {
        object[key].forEach((item, index) => {
          formData.append(`${key}[${index}].file`, item.file)
          formData.append(`${key}[${index}].description`, item.description)
        })
      } else {
        object[key].forEach(item => formData.append(key, item))
      }
    } else if (key === 'mainFile') {
      formData.append('mainFile.file', object[key]?.file)
      formData.append('mainFile.description', object[key]?.description)
    } else {
      formData.append(key, object[key])
    }
  })
  return formData
}
