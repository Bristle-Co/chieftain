import React, { useEffect, useState } from "react";
import styles from "./ProductEntryDropDown.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  setCachedProductEntries,
  setCachedProductEntryByIndex,
} from "../redux/order.js";

const ProductEntryDropDown = ({ index, isEditing, data }) => {
  const dispatch = useDispatch();
  const { cachedProductEntries } = useSelector(
    (state) => state.cachedProductEntries
  );
  const [isActive, setIsActive] = useState(false);
  const [model, setModel] = useState(data.model);
  const [quantity, setQuantity] = useState(data.quantity);
  const [price, setPrice] = useState(data.price);
  const [productTicketId, setProductTicketId] = useState(data.productTicket_id);

  const isEqualProductEntry = (org, updated) => {
    if (
      org.model !== updated.model ||
      org.productEntryId !== updated.productEntryId ||
      org.quantity !== updated.quantity ||
      org.price !== updated.price ||
      org.productTicket_id !== updated.productTicket_id
    ) {
      return false;
    }
    return true;
  };
  const cacheProductEntry = (model, quantity, price, productTicketId) => {
    // each productEntry gets synced when input loses focus
    const updatedProductEntry = {
      productEntryId: data.productEntryId,
      model: model,
      quantity: quantity,
      price: price,
      productTicketId: productTicketId,
    };

    if (!isEqualProductEntry(data, updatedProductEntry)) {
      dispatch(
        setCachedProductEntryByIndex({
          index: index,
          productEntry: updatedProductEntry,
        })
      );
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
            onBlur={(e) =>
              cacheProductEntry(
                e.target.value,
                quantity,
                price,
                productTicketId
              )
            }
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
                    onBlur={(e) =>
                      cacheProductEntry(
                        model,
                        e.target.value,
                        price,
                        productTicketId
                      )
                    }
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
                    onBlur={(e) =>
                      cacheProductEntry(
                        model,
                        quantity,
                        e.target.value,
                        productTicketId
                      )
                    }
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
                    onBlur={(e) =>
                      cacheProductEntry(model, quantity, price, e.target.value)
                    }
                  />
                ) : (
                  <div>
                    {data.productTicket_id == null
                      ? "尚未開立工單"
                      : data.productTicket_id}
                  </div>
                )}
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
