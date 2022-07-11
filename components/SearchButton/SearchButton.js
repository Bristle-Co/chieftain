import React from "react";
import styles from "./SearchButton.module.css";
import { IoIosSearch } from "react-icons/io";

const SearchButton = () => {
  return (
    <button className={styles.SearchButton} type="submit">
      <IoIosSearch className={styles.SearchIcon} />
    </button>
  );
};

export default SearchButton;
