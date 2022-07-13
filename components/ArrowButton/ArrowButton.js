import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./ArrowButton.module.css";

const ArrowButton = (props) => {
  return (
    <button {...props} className={styles.ArrowButton}>
      <IoIosArrowForward className={styles.ArrowIcon} />
    </button>
  );
};

export default ArrowButton;
