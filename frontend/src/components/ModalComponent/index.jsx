import { Modal } from "react-bootstrap";

const ModalComponent = ({ open, handleClose, children, size, title }) => {
  return (
    <Modal
      show={open}
      onHide={handleClose}
      animation={true}
      centered
      size={size || "xl"}
    >
      {title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
