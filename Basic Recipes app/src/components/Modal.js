import React from "react";
import classes from "./Modal.module.css";

function Modal(props) {
  return (
    <div className={classes.modal}>
      <div className={classes.flex}>
        <p>Are you sure?</p>
        <div>
          <button onClick={props.handleModal}>Yes</button>
          <button onClick={props.handleCloseModal}>No</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
