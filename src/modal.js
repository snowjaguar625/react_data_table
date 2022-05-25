import React from "react";
import Modal from "react-modal";
import Button from "@material-ui/core/Button"

import "./modal.css";

export default ({ isOpen, onRequestClose, data }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Modal"
    className={{
      base: "modal-base",
      afterOpen: "modal-base_after-open",
      beforeClose: "modal-base_before-close"
    }}
    overlayClassName={{
      base: "overlay-base",
      afterOpen: "overlay-base_after-open",
      beforeClose: "overlay-base_before-close"
    }}
    shouldCloseOnOverlayClick={true}
    closeTimeoutMS={2000}
  >
    <h1>Bid DATA</h1>
    <hr></hr>
    <p>carTitle: {data.carTitle}</p>
    <p>amount: {data.amount}</p>
    <br></br>

    <Button variant="contained" color="primary" onClick={onRequestClose}>Close</Button>
  </Modal>
);
