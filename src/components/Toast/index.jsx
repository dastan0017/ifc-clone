import styles from './Style.module.scss'
import { toast } from 'react-toastify'
import { SuccessIcon, WarnIcon, ErrorIcon, InfoIcon } from '../../icons'
import PropTypes from 'prop-types'
import 'react-toastify/dist/ReactToastify.css'

const Toast = props => {
  return (
    <div className={styles.toastContainer}>
      <div className={styles.iconWrapper}>
        {props.type === 'success' ? <SuccessIcon /> : props.type === 'error' ? <ErrorIcon /> : props.type === 'warn' ? <WarnIcon /> : <InfoIcon />}
      </div>
      <p className={styles.message}>{props.message}</p>
      <div className={styles.closeButton}></div>
    </div>
  )
}

Toast.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
}
//Добавить цвета
// Add icon for closing
export const sendNotification = (message, type) => {
  return toast(<Toast message={message} type={type} />, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

export default Toast
