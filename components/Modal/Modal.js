import React from "react";
import styles from "./Modal.module.css";

const ClickMuncher = ({ children }) => {
  return <div onClick={(e) => e.stopPropagation()}>{children}</div>;
};

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className={styles.OverLay} onClick={onClose}>
      <ClickMuncher>
        <div className={styles.Window} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </ClickMuncher>
    </div>
  );
};

export default Modal;
