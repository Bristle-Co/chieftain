import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrder, updateOrder } from "../../../components/redux/order.js";
import styles from "./view_order.module.css";
import Modal from "../../../components/Modal/Modal.js";
import TopBarButton from "../../../components/TopBar/TopBarButton/TopBarButton.js";
import {
  IoPencil,
  IoCheckmarkDoneOutline,
  IoTrashOutline,
  IoReturnUpBack,
  IoAdd,
  IoCloseOutline,
  IoCopyOutline,
} from "react-icons/io5";
import { IconContext } from "react-icons";
import ProductEntryDropDown from "../../../components/ProductEntryDropDown/ProductEntryDropDown.js";
import {
  getOrderByIdRequest,
  deleteOrderRequest,
} from "../../../utils/AxiosRequestUtils.js";
import Link from "next/link.js";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { orderId } = context.query;
  let order;

  try {
    const result = await axios(getOrderByIdRequest(orderId));
    order = result.data.data[0];
  } catch (error) {
    console.log(error.response.data);
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
              productEntryId: "錯誤",
              model: "錯誤",
              quantity: 0,
              price: 0,
              productTicket_id: "錯誤",
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

const ViewOrder = (props) => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);
  const router = useRouter();
  // for the order fields
  const [isEditing, setIsEditing] = useState(false);
  const [orderId, setOrderId] = useState(props.data.orderId);
  // this order is always the same as what's in the backend database
  // and this is the order that is displayed
  const [customerOrderId, setCustomerOrderId] = useState(
    props.data.customerOrderId
  );
  const [customerId, setCustomerId] = useState(props.data.customerId);
  const [dueDate, setDueDate] = useState(props.data.dueDate);
  const [note, setNote] = useState(props.data.note);
  const [deliveredAt, setDeliveredAt] = useState(props.data.deliveredAt);
  const [issuedAt, setIssuedAt] = useState(props.data.issuedAt);

  // for the fields in Modal when adding product entry
  const [isAddingProductEntry, setIsAddingProductEntry] = useState(false);
  const [model, setModel] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [productTicketId, setProductTicketId] = useState("");

  const handleDeleting = () => {
    axios(deleteOrderRequest(orderId))
      .then((result) => {
        alert("刪除訂購單成功！");
        console.log("delete order success");
        console.log(result.data.data);
        router.replace("/order");
      })
      .catch((error) => {
        alert("刪除訂購單失敗 聯絡鞍！");
        console.log("delete order failed");
        console.log(error.response.data);
      });
  };
  const handleEditing = () => {
    if (!isEditing) {
      // sync the order in redux with the fields in useState
      setOrderId(order.orderId);
      setCustomerOrderId(order.customerOrderId);
      setCustomerId(order.customerId);
      setDueDate(order.dueDate);
      setNote(order.note);
      setDeliveredAt(order.deliveredAt);
      setIssuedAt(order.issuedAt);
      setIsEditing(true);
      return;
    }
    // TODO validate fields
    const updatedOrder = {
      orderId: orderId,
      customerOrderId: customerOrderId,
      customerId: customerId,
      dueDate: dueDate,
      note: note,
      deliveredAt: deliveredAt === null ? null : deliveredAt.replace("T", " "),
      issuedAt: issuedAt,
      // this productEntries field will get override once dispatched to redux thunk
      // thus no need to initiate it
      productEntries: [],
    };

    dispatch(
      updateOrder({
        commonFieldSlice: { order: updatedOrder },
      })
    );

    setIsEditing(false);
  };

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
      dispatch(
        updateOrder({
          addedNewProductEntrySlice: {
            productEntry: newProductEntry,
          },
        })
      );
      setIsAddingProductEntry(false);
    }
  };
  useEffect(() => {
    dispatch(setOrder(props.data));
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
              <form onSubmit={() => handleAddNewProductEntry()}>
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
                <button type="sumbit" className={styles.ConfirmBTN}>
                  確定
                </button>
              </form>
            </ul>
          </div>
        </Modal>
        <div key="test" className="TopButtonContainer">
          <TopBarButton onClick={() => window.history.back()}>
            <IoReturnUpBack />
          </TopBarButton>
          <Link href={"/order/add_order?orderId=" + order.orderId}>
            <TopBarButton>
              <IoCopyOutline />
            </TopBarButton>
          </Link>
          <TopBarButton
            onClick={() => {
              handleDeleting();
            }}
          >
            <IoTrashOutline />
          </TopBarButton>
        </div>
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
                    onChange={(e) => setCustomerOrderId(e.target.value)}
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
                    onChange={(e) => setCustomerId(e.target.value)}
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
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                ) : (
                  <div>{order.dueDate}</div>
                )}
              </div>
            </li>
            <li>
              <span>實際交貨時間 :</span>
              <div className={styles.DataBlockContainer}>
                {isEditing ? (
                  <input
                    type="datetime-local"
                    value={deliveredAt}
                    onChange={(e) => setDeliveredAt(e.target.value)}
                  />
                ) : (
                  <div>
                    {order.deliveredAt == null ? "尚未交貨" : order.deliveredAt}
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
          <TopBarButton onClick={() => handleEditing()} isRound={true}>
            {isEditing ? <IoCheckmarkDoneOutline /> : <IoPencil />}
          </TopBarButton>
        </div>
        <div className={styles.ProductEntriesContainer}>
          <div className={styles.ProductEntriesTitle}>訂單規格：</div>
          <ul className={styles.ProductEntriesList}>
            {order.productEntries.map((item, index) => {
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

export default ViewOrder;
