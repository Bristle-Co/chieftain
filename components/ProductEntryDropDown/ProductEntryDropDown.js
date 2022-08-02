import React, { useState } from "react";
import styles from "./ProductEntryDropDown.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { updateOrder } from "../redux/order.js";
import { IoPencil, IoCheckmarkDoneOutline } from "react-icons/io5";
import TopBarButton from "../TopBar/TopBarButton/TopBarButton.js";

const ProductEntryDropDown = ({ index, data }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [model, setModel] = useState(data.model);
  const [quantity, setQuantity] = useState(data.quantity);
  const [price, setPrice] = useState(data.price);
  const [productTicketId, setProductTicketId] = useState(data.productTicketId);

  const handleEditing = () => {
    if (isEditing) {
      const updatedProductEntry = {
        productEntryId: data.productEntryId,
        model: model,
        quantity: quantity,
        price: price,
        productTicketId: productTicketId,
      };
      dispatch(
        updateOrder({
          prodctEntrySlice: { productEntry: updatedProductEntry, index: index },
          commonFieldSlice: null,
        })
      );

      setIsEditing(false);
    } else {
      // sync the current value in redux store with useState variables for inputs
      setModel(data.model);
      setQuantity(data.quantity);
      setPrice(data.price);
      setProductTicketId(data.productTicketId);
      setIsEditing(true);
    }
  };

  return (
    <div className={styles.Container}>
      <div
        className={styles.ModelContainer}
        onClick={() => setIsActive(!isActive)}
      >
        {isEditing ? (
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            onClick={(event) => {
              event.stopPropagation();
            }}
          />
        ) : (
          <div> {data.model}</div>
        )}
        <IoIosArrowForward
          className={isActive ? styles.ArrowActivated : styles.Arrow}
        />
      </div>
      {isActive ? (
        <div className={styles.ProductEntryFieldContainer}>
          <ul className={styles.ProductEntryFieldList}>
            <li>
              數量 :{" "}
              <div>
                {isEditing ? (
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                ) : (
                  <div>{data.quantity}</div>
                )}
              </div>
            </li>
            <li>
              單價 :{" "}
              <div>
                {isEditing ? (
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                ) : (
                  <div>{data.price}</div>
                )}
              </div>
            </li>
            <li>
              對應工單號碼 :{" "}
              <div>
                {isEditing ? (
                  <input
                    value={productTicketId}
                    onChange={(e) => setProductTicketId(e.target.value)}
                  />
                ) : (
                  <div>
                    {data.productTicketId == null
                      ? "尚未開立工單"
                      : data.productTicketId}
                  </div>
                )}
              </div>
            </li>
          </ul>
          <TopBarButton onClick={() => handleEditing()}>
            {isEditing ? <IoCheckmarkDoneOutline /> : <IoPencil />}
          </TopBarButton>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductEntryDropDown;
