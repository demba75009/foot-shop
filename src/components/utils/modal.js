import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteArticleModal({ show, onHide, onDelete,id }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation de suppression</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Êtes-vous sûr de vouloir supprimer cet article ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Annuler
        </Button>
        <Button variant="danger" onClick={() =>onDelete(id)}>
          Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteArticleModal;
