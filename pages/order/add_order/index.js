import { TopBarStateContext } from "../../../components/context.js";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal/Modal.js";
import styles from "./add_order.module.css";
import axios from "axios";
import TopBarButton from "../../../components/TopBar/TopBarButton/TopBarButton.js";
import {
  IoCheckmarkDoneOutline,
  IoReturnUpBack,
  IoAdd,
  IoCloseOutline,
} from "react-icons/io5";
import { IconContext } from "react-icons";
import ProductEntryDropDown from "../../../components/ProductEntryDropDown/ProductEntryDropDown.js";

import { useRouter } from "next/router";

const orderTopBarState = {
  pageName: "新增訂購單",
  buttons: [],
};

const AddOrder = () => {
  const router = useRouter();
  const { copying } = router.query;
  const dispatch = useDispatch();
  const cachedOrdr = useSelector((state) => state.order.order);

  const [topBarState, setTopBarState] = useContext(TopBarStateContext);

  const [orderId, setOrderId] = useState(copying ? cachedOrdr.orderId : "");
  const [customerOrderId, setCustomerOrderId] = useState(
    copying ? cachedOrdr.customerOrderId : ""
  );
  const [customerId, setCustomerId] = useState(
    copying ? cachedOrdr.customerId : ""
  );
  const [dueDate, setDueDate] = useState(copying ? cachedOrdr.dueDate : "");
  const [note, setNote] = useState(copying ? cachedOrdr.note : "");
  const [deliveredAt, setDeliveredAt] = useState(
    copying ? cachedOrdr.deliveredAt.replace(" ", "T") : ""
  );
  const [issuedAt, setIssuedAt] = useState(copying ? cachedOrdr.issuedAt : "");
  const [productEntries, setProductEntries] = useState(
    copying ? cachedOrdr.productEntries : []
  );

  // for the fields in Modal when adding product entry
  const [isAddingProductEntry, setIsAddingProductEntry] = useState(false);
  const [model, setModel] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [productTicketId, setProductTicketId] = useState("");

  const handleAddNewProductEntry = () => {
    if (!isAddingProductEntry) {
      setModel("");
      setQuantity("");
      setPrice("");
      setProductTicketId("");
      setIsAddingProductEntry(true);
    } else {
      // TODO validate fieds
      const newProductEntry = {
        productEntryId: null,
        model: model,
        quantity: quantity,
        price: price,
        productTicketId: productTicketId,
      };
      const newProductEntryArray = [...productEntries, newProductEntry];
      setProductEntries(newProductEntryArray);
      setIsAddingProductEntry(false);
    }
  };

  const PostNewOrder = () => {};
  useEffect(() => {
    setTopBarState(orderTopBarState);
  }, []);
  return (
    <IconContext.Provider
      value={{ color: "var(--brown)", height: "100%", width: "100%" }}
    >
      <div className={styles.Container}>
        <Modal isOpen={isAddingProductEntry}>
          <div className={styles.ModalContainer}>
            <TopBarButton
              id={styles.ModalCloseBTN}
              onClick={() => setIsAddingProductEntry(false)}
              isRound={true}
            >
              <IoCloseOutline />
            </TopBarButton>
            新增品項
            <ul>
              <li key="model">
                <span>規格 :</span>
                <input
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  type="text"
                />
              </li>
              <li key="quantity">
                <span>數量 :</span>
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                />
              </li>
              <li key="price">
                <span>單價 :</span>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                />
              </li>
              <li key="productTicketId">
                <span>對應工單號碼 :</span>
                <input
                  value={productTicketId}
                  onChange={(e) => setProductTicketId(e.target.value)}
                  type="text"
                />
              </li>
              <div
                className={styles.ConfirmBTN}
                onClick={() => handleAddNewProductEntry()}
              >
                確定
              </div>
            </ul>
          </div>
        </Modal>
        <div key="test" className="TopButtonContainer">
          <TopBarButton onClick={() => window.history.back()}>
            <IoReturnUpBack />
          </TopBarButton>
          <TopBarButton
            onClick={() => {
              PostNewOrder();
            }}
          >
            <IoCheckmarkDoneOutline />
          </TopBarButton>
        </div>
        <div className={styles.BasicFieldsContainer}>
          <ul className={styles.BasicFieldsList}>
            <li>
              <span>訂單代號 :</span>
              <div className={styles.DataBlockContainer}>
                <div>TODO 下一個編號</div>
              </div>
            </li>
            <li>
              <span>客戶訂單代號 :</span>
              <div className={styles.DataBlockContainer}>
                <input
                  value={customerOrderId}
                  onChange={(e) => setCustomerOrderId(e.target.value)}
                />
              </div>
            </li>
            <li>
              <span>客戶代號 :</span>
              <div className={styles.DataBlockContainer}>
                <input
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                />
              </div>
            </li>
            <li>
              <span>預計交貨日期 :</span>
              <div className={styles.DataBlockContainer}>
                <input
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </li>
            <li>
              <span>實際交貨時間 :</span>
              <div className={styles.DataBlockContainer}>
                <input
                  type="datetime-local"
                  value={deliveredAt}
                  onChange={(e) => setDeliveredAt(e.target.value)}
                />
              </div>
            </li>
            <li>
              <span>開立時間 :</span>
              <div className={styles.DataBlockContainer}>
                <div>現在</div>
              </div>
            </li>
            <li>
              <span>備註 :</span>
              <div className={styles.DataBlockContainer}>
                <textarea
                  defaultValue={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.ProductEntriesContainer}>
          <div className={styles.ProductEntriesTitle}>訂單規格：</div>
          <ul className={styles.ProductEntriesList}>
            {productEntries.map((item, index) => {
              return (
                <li key={index}>
                  <ProductEntryDropDown key={index} index={index} data={item} />
                </li>
              );
            })}
            <li>
              <div
                className={styles.AddProductEntryBTN}
                onClick={() => handleAddNewProductEntry()}
              >
                <IoAdd />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default AddOrder;
