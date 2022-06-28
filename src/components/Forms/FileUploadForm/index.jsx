import { useEffect, useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Button } from 'react-bootstrap'
import { AddButton } from 'components'
import { ExcelFileIcon, RightIcon, FalseIcon } from 'icons'
import { useIntl } from 'react-intl'
import * as styles from './FileUpload.module.scss'

export const FileUploadForm = ({ onSubmit }) => {
  const drop = useRef(null)
  const intl = useIntl()

  const [isDragging, setIsDragging] = useState(false)
  const [isDropped, setIsDroppped] = useState(false)
  const [isError, setIsError] = useState(false)
  const [file, setFile] = useState()

  const checkType = type => {
    const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    return allowedTypes.some(item => item === type)
  }
  const handleDragOver = e => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    setIsDroppped(false)
    setIsError(false)
  }
  const handleFileUpload = e => {
    setIsDragging(false)
    setIsDroppped(true)
    if (checkType(e.target.files?.[0]?.type)) {
      setIsError(false)
      setFile(e.target.files)
    } else {
      setIsError(true)
    }
  }

  const handleDrop = useCallback(e => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    setIsDroppped(true)

    const { files } = e.dataTransfer
    if (checkType(files?.[0].type)) {
      setFile(files)
    } else {
      setIsError(true)
    }
  }, [])

  const handleDragOut = () => {
    setIsDragging(false)
    setIsDroppped(false)
    setIsError(false)
  }

  useEffect(() => {
    drop.current.addEventListener('dragover', handleDragOver)
    drop.current.addEventListener('dragleave', handleDragOut)
    drop.current.addEventListener('drop', handleDrop)

    return () => {
      try {
        drop.current.removeEventListener('dragover', handleDragOver)
        drop.current.removeEventListener('dragleave', handleDragOut)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        drop.current.removeEventListener('drop', handleDrop)
      } catch (err) {
        console.log(err)
      }
    }
  }, [handleDrop])

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(file)
  }

  return (
    <form onSubmit={handleSubmit} className="form form_container">
      <Row className={`${styles.upload_area} ${isDragging ? styles.is_dragging : ''}`} ref={drop}>
        <Row className={`${styles.file_bar} ${isDragging ? styles.shaking_animation : ''}`}>
          <div>{isDropped ? isError ? <FalseIcon /> : <RightIcon /> : <ExcelFileIcon />}</div>
        </Row>
        <Col className={styles.info_bar}>
          <h3>{intl.formatMessage({ id: 'global.drag_and_drop_file' })}</h3>
          <Row className={styles.file_container}>
            <input
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              className={styles.file}
              onChange={handleFileUpload}
            />
            <AddButton onClick={() => {}} btnText={intl.formatMessage({ id: 'global.open_catalog' })} />
          </Row>
          <p>{intl.formatMessage({ id: 'supported_excel_formats' })}</p>
        </Col>
      </Row>
      <Button type="submit" className="btn-primary modal_btn">
        {intl.formatMessage({ id: 'global.save' })}
      </Button>
    </form>
  )
}
FileUploadForm.propTypes = {
  onSubmit: PropTypes.func,
}

export default FileUploadForm
