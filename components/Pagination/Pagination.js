import styles from "./Pagination.module.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import TopBarButton from "../TopBar/TopBarButton/TopBarButton.js";
import { IconContext } from "react-icons";
import React, { useState } from "react";

const Pagination = (props) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const onPageSumbit = (event) => {
    event.preventDefault();
    // must set props.pageIndex before submitting
    // API call relies pageIndex in the parent level
    if (props.proposedPageIndex == "") {
      alert("頁數不能空白哦");
      return;
    }
    props.onSubmit(props.proposedPageIndex);
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
              value={props.proposedPageIndex}
              onfocus={() => setIsInputFocused(true)}
              onChange={(event) =>
                props.setProposedPageIndex(event.target.value)
              }
              //   onBlur={(event) => {
              //     setPageIndex(props.proposedPageIndex);
              //   }}
            />
          </div>
          <input type="submit" hidden />
        </form>

        <TopBarButton onClick={() => props.next()}>
          <IoIosArrowForward className={styles.Button} />
        </TopBarButton>
      </div>
    </IconContext.Provider>
  );
};

export default Pagination;
