import React from "react";
import styles from "./SelectDropDown.module.css";

const SelectDropDown = (props) => {
  return (
    <select name="unAssignedProductEntries" className={styles.Select}>
      {props.options == undefined ? (
        <></>
      ) : (
        props.options.map((item) => <option value={item}>{item}</option>)
      )}
    </select>
  );
};

export default SelectDropDown;
