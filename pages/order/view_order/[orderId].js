import axios from "axios";
import React, { useState, useTransition } from "react";
import styles from "./view_order.module.css";
import TopBarButton from "../../../components/TopBar/TopBarButton/TopBarButton.js";
import {
  IoPencil,
  IoCheckmarkDoneOutline,
  IoTrashOutline,
  IoReturnUpBack,
} from "react-icons/io5";
import { IconContext } from "react-icons";
import ProductEntryDropDown from "../../../components/ProductEntryDropDown/ProductEntryDropDown.js";

export async function getServerSideProps(context) {
  const { orderId } = context.query;
  let order;

  try {
    const result = await axios(getOrderByIdRequest(orderId));
    order = result.data.data[0];
  } catch (error) {
    console.log(error.response);
    console.log("fetch order from server side failed");

    return {
      props: {
        data: {
          orderId: 0,
          customerOrderId: "錯誤",
          customerId: "錯誤",
          dueDate: "錯誤",
          note: "錯誤",
          deliveredAt: "錯誤",
          issuedAt: "錯誤",
          productEntries: [
            {
              productEntryId: "無資料",
              model: "無資料",
              quantity: 0,
              price: 0,
              productTicket_id: "無資料",
            },
          ],
        },
      },
    };
  }
  console.log("fetch order from server side success");
  console.log(order);

  return {
    props: {
      data: order,
    },
  };
}

const getOrderByIdRequest = (orderId) => ({
  method: "GET",
  url: "/order",
  baseURL: process.env.backendServerBaseURI,
  params: {
    orderId: orderId,
    pageIndex: 0,
    pageSize: process.env.globalPageSize,
  },
});

const ViewOrder = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [orderId, setOrderId] = useState(props.data.orderId);
  const [order, setOrder] = useState(props.data);
  const [customerOrderId, setCustomerOrderId] = useState(
    props.data.customerOrderId
  );
  const [customerId, setCustomerId] = useState(props.data.customerId);
  const [dueDate, setDueDate] = useState(props.data.dueDate);
  const [note, setNote] = useState(props.data.note);
  const [deliveredAt, setDeliveredAt] = useState(props.data.deliveredAt);
  const [issuedAt, setIssuedAt] = useState(props.data.issuedAt);
  const [productEntries, setProductEntries] = useState(
    props.data.productEntries
  );

  const handleEditing = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    // TODO validate fields
    udpateCustomer();
  };

  const udpateCustomer = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles.Container}>
      <IconContext.Provider
        value={{ color: "var(--brown)", height: "100%", width: "100%" }}
      >
        <div key="test" className="TopButtonContainer">
          <TopBarButton onClick={() => window.history.back()}>
            <IoReturnUpBack />
          </TopBarButton>
          <TopBarButton onClick={() => handleEditing()}>
            {isEditing ? <IoCheckmarkDoneOutline /> : <IoPencil />}
          </TopBarButton>
          <TopBarButton
            onClick={() => {
              deleteCustomerAndGoToMainPage();
            }}
          >
            <IoTrashOutline />
          </TopBarButton>
        </div>
      </IconContext.Provider>
      <div className={styles.BasicFieldsContainer}>
        <ul className={styles.BasicFieldsList}>
          <li>
            <span>訂單代號 :</span>
            <div className={styles.DataBlockContainer}>
              <div>{order.orderId}</div>
            </div>
          </li>
          <li>
            <span>客戶訂單代號 :</span>
            <div className={styles.DataBlockContainer}>
              {isEditing ? (
                <input
                  value={customerOrderId}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <div>{order.customerOrderId}</div>
              )}
            </div>
          </li>
          <li>
            <span>客戶代號 :</span>
            <div className={styles.DataBlockContainer}>
              {isEditing ? (
                <input
                  value={customerId}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <div>{order.customerId}</div>
              )}
            </div>
          </li>
          <li>
            <span>預計交貨日期 :</span>
            <div className={styles.DataBlockContainer}>
              {isEditing ? (
                <input
                  value={dueDate}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <div>{order.dueDate}</div>
              )}
            </div>
          </li>
          <li>
            <span>實際交貨日期 :</span>
            <div className={styles.DataBlockContainer}>
              {isEditing ? (
                <input
                  type="date"
                  value={deliveredAt}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <div>
                  {order.deliveredAt == null ? "尚未交貨" : deliveredAt}
                </div>
              )}
            </div>
          </li>
          <li>
            <span>開立時間 :</span>
            <div className={styles.DataBlockContainer}>
              <div>{order.issuedAt}</div>
            </div>
          </li>
          <li>
            <span>備註 :</span>
            <div className={styles.DataBlockContainer}>
              {isEditing ? (
                <textarea
                  defaultValue={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              ) : (
                <div>{order.note}</div>
              )}
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.ProductEntriesContainer}>
        <div className={styles.ProductEntriesTitle}>訂單規格：</div>
        {productEntries.map((item) => {
          return <ProductEntryDropDown data={item} />;
        })}
      </div>
    </div>
  );
};

export default ViewOrder;
