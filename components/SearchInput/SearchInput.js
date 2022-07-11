import React from "react";
import styles from "./SearchInput.module.css";

const SearchInput = (props) => {
  return <input {...props} className={styles.Input} />;
};

export default SearchInput;
