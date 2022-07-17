import styles from "./Pagination.module.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import TopBarButton from "../TopBar/TopBarButton/TopBarButton.js";
import { IconContext } from "react-icons";
import React, { useState } from "react";

const Pagination = (props) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [propsedPageIndex, setPropsedPageIndex] = useState(0);
  const onPageSumbit = (event) => {
    event.preventDefault();
    console.log(props.pageIndex);
    console.log(propsedPageIndex);
    // must set props.pageIndex before submitting
    // API call relies pageIndex in the parent level

    props.onSubmit(parseInt(propsedPageIndex));
  };

  return (
    <IconContext.Provider
      value={{ color: "#957B5F", height: "100%", width: "100%" }}
    >
      <div style={props.style} className={styles.Container}>
        <TopBarButton onClick={() => props.previous()}>
          <IoIosArrowBack className={styles.Button} />
        </TopBarButton>

        <form onSubmit={onPageSumbit}>
          <div className={styles.InputContainer}>
            <input
              type="number"
              value={isInputFocused ? propsedPageIndex : props.pageIndex}
              onFocus={() => {
                setPropsedPageIndex(props.pageIndex);
                setIsInputFocused(true);
              }}
              onChange={(event) => setPropsedPageIndex(event.target.value)}
              onBlur={() => {
                setPropsedPageIndex(props.pageIndex);
                setIsInputFocused(false);
              }}
            />
          </div>

          <input type="submit" hidden />
        </form>

        <TopBarButton
          onClick={() => {
            console.log(props.pageIndex);
            console.log(propsedPageIndex);
            props.next();
          }}
        >
          <IoIosArrowForward className={styles.Button} />
        </TopBarButton>
      </div>
    </IconContext.Provider>
  );
};

export default Pagination;
