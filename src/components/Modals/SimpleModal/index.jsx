import { Modal, Button, Row } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import PropTypes from 'prop-types'
import '../Modals.scss'

export const SimpleModal = ({ data, isOpen, hideModal, onSubmit, ModalForm, modalName, headerTitle }) => {
  const intl = useIntl()
  const title = () => {
    switch (data.action) {
      case 'edit':
        return intl.formatMessage({ id: `edit.${modalName}` })
      case 'delete':
        return intl.formatMessage({ id: `delete.${modalName}` })
      default:
        return intl.formatMessage({ id: `add.${modalName}` })
    }
  }

  return (
    <Modal centered show={isOpen} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{headerTitle ? headerTitle : title()}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {data.action !== 'delete' ? (
          <ModalForm data={data} onSubmit={formData => onSubmit({ ...formData, id: data?.id })} />
        ) : (
          <Row className="delete_buttons">
            <p>
              {intl.formatMessage({ id: 'delete.message' })}
              <strong>{intl.formatMessage({ id: 'delete.message2' })}</strong>
            </p>
            <Row>
              <Button className="btn-primary" onClick={() => onSubmit({ id: data?.id })}>
                {intl.formatMessage({ id: 'global.delete' })}
              </Button>
              <Button className="btn-secondary" onClick={hideModal}>
                {intl.formatMessage({ id: 'global.cancel' })}
              </Button>
            </Row>
          </Row>
        )}
      </Modal.Body>
    </Modal>
  )
}
SimpleModal.propTypes = {
  data: PropTypes.object,
  isOpen: PropTypes.bool,
  hideModal: PropTypes.func,
  onSubmit: PropTypes.func,
  ModalForm: PropTypes.func,
  modalName: PropTypes.string,
  headerTitle: PropTypes.string,
}
export default SimpleModal
