import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ConfirmModal({
  show,
  title,
  body,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
  loading = false,
}) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      {title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      {body && <Modal.Body>{body}</Modal.Body>}
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? "Deleting..." : confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
