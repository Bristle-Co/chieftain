import React, { useState } from "react";
import styles from "./ProductEntryDropDown.module.css";
import { IoIosArrowForward } from "react-icons/io";

const ProductEntryDropDown = (props) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.Container}>
      <div
        className={styles.ModelContainer}
        onClick={() => setIsActive(!isActive)}
      >
        {props.data.model}
        <IoIosArrowForward
          className={isActive ? styles.ArrowActivated : styles.Arrow}
        />
      </div>
      {isActive ? (
        <div className={styles.ProductEntryFieldContainer}>
          <ul className={styles.ProductEntryFieldList}>
            <li>
              數量 : <div>{props.data.quantity}</div>
            </li>
            <li>
              單價 : <div>{props.data.price}</div>
            </li>
            <li>
              對應工單號碼 :{" "}
              <div>
                {props.data.productTicket_id == null
                  ? "尚未開立工單"
                  : props.data.productTicket_id}
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductEntryDropDown;
