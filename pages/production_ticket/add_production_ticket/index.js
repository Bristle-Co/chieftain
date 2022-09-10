import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./add_production_ticket.module.css";
import TopBarButton from "../../../components/TopBar/TopBarButton/TopBarButton.js";
import { IoCheckmarkDoneOutline, IoReturnUpBack } from "react-icons/io5";
import { IconContext } from "react-icons";
import {
  getAllUsersRequest,
  getUnAssignedProductEntryRequest,
} from "../../../utils/AxiosRequestUtils.js";
import { createProductionTicket } from "../../../components/redux/productionTicket.js";
import { dateTimeNullCheckAndInsertT } from "../../../utils/UtilFunctions.js";
import Modal from "../../../components/Modal/Modal.js";

export async function getServerSideProps(context) {
  let users;
  let unAssignedProductEntries;
  let canCreateProductionTicket;

  try {
    const result = await axios(getAllUsersRequest());
    users = result.data.data;
  } catch (error) {
    users = [];
    console.log(error.response.data);
    console.log("fetch users from server side failed");
  }

  try {
    const result = await axios(getUnAssignedProductEntryRequest());
    unAssignedProductEntries = result.data.data;
  } catch (error) {
    unAssignedProductEntries = [];
    console.log(error.response.data);
    console.log("fetch unassigned product entries from server side failed");
  }

  console.log("all server side requests finished");
  console.log("All available users");
  console.log(users);
  console.log("All unassigned product entries");
  console.log(unAssignedProductEntries);
  canCreateProductionTicket = unAssignedProductEntries.length === 0;
  if (canCreateProductionTicket) {
    unAssignedProductEntries = [
      {
        productEntryId: "無資料",
        model: "無資料",
        quantity: 0,
        price: 0,
        productTicketId: 0,
        orderId: 0,
      },
    ];
  }
  return {
    props: {
      users: users,
      canCreateProductEntry: canCreateProductionTicket,
      unAssignedProductEntries: unAssignedProductEntries,
    },
  };
}
const AddTicket = (props) => {
  const usersDropDownOptions = [
    {
      userId: null,
      name: "未完成",
    },
    ...props.users,
  ];
  const dispatch = useDispatch();

  // for the production ticket fields
  const [orderId, setOrderId] = useState(
    props.unAssignedProductEntries[0].orderId
  );
  const [productEntryId, setProductEntryId] = useState(
    props.unAssignedProductEntries[0].productEntryId
  );
  const [customerId, setCustomerId] = useState(
    props.unAssignedProductEntries[0].customerId
  );
  const [dueDate, setDueDate] = useState("");
  const [productName, setProductName] = useState("");
  const [bristleType, setBristleType] = useState("");
  const [model, setModel] = useState(props.unAssignedProductEntries[0].model);
  const [innerTubeType, setInnerTubeType] = useState("");
  const [bristleDiameter, setBristleDiameter] = useState(null);
  const [quantity, setQuantity] = useState(
    props.unAssignedProductEntries[0].quantity
  );
  const [alumTubeType, setAlumTubeType] = useState("");
  const [alumRimType, setAlumRimType] = useState("");
  const [modelNote, setModelNote] = useState("");
  const [donePreparingAt, setDonePreparingAt] = useState("");
  const [preparedBy, setPreparedBy] = useState("");
  const [doneTwiningAt, setDoneTwiningAt] = useState("");
  const [twinedBy, setTwinedBy] = useState("");
  const [doneTrimmingAt, setDoneTrimmingAt] = useState("");
  const [trimmedBy, setTrimmedBy] = useState("");
  const [donePackagingAt, setDonePackagingAt] = useState("");
  const [packagedBy, setPackagedBy] = useState("");
  const [issuedAt, setIssuedAt] = useState("");
  const [productionNote1, setProductionNote1] = useState("");
  const [productionNote2, setProductionNote2] = useState("");
  const [productionNote3, setProductionNote3] = useState("");
  const [productionNote4, setProductionNote4] = useState("");
  const [productionNote5, setProductionNote5] = useState("");
  const [productionNote6, setProductionNote6] = useState("");

  const handleProductEntryChange = (index) => {
    console.log(index);
    const selectedProductEntry = props.unAssignedProductEntries[index];
    console.log("now prouct entry");
    console.log(selectedProductEntry);
    setProductEntryId(selectedProductEntry.productEntryId);
    setModel(selectedProductEntry.model);
    setOrderId(selectedProductEntry.orderId);
    setCustomerId(selectedProductEntry.customerId);
    setQuantity(selectedProductEntry.quantity);
  };

  const postNewProductionTicket = () => {
    const newProductionTicket = {
      ticketId: null,
      orderId: orderId,
      productEntryId: productEntryId,
      customerId: customerId,
      dueDate: dueDate === null ? null : dueDate,
      productName: productName,
      bristleType: bristleType,
      model: model,
      innerTubeType: innerTubeType,
      bristleDiameter: parseFloat(bristleDiameter),
      quantity: parseInt(quantity),
      alumTubeType: alumTubeType,
      alumRimType: alumRimType,
      modelNote: modelNote,
      donePreparingAt: donePreparingAt,
      preparedBy: preparedBy,
      doneTwiningAt: doneTwiningAt,
      twinedBy: twinedBy,
      doneTrimmingAt: doneTrimmingAt,
      trimmedBy: trimmedBy,
      donePackagingAt: donePackagingAt,
      packagedBy: packagedBy,
      issuedAt: issuedAt,
      productionNote1: productionNote1,
      productionNote2: productionNote2,
      productionNote3: productionNote3,
      productionNote4: productionNote4,
      productionNote5: productionNote5,
      productionNote6: productionNote6,
    };

    dispatch(createProductionTicket(newProductionTicket));
  };

  return (
    <IconContext.Provider
      value={{ color: "var(--brown)", height: "100%", width: "100%" }}
    >
      <div className={styles.Container}>
        <div className="TopButtonContainer">
          <TopBarButton onClick={() => window.history.back()}>
            <IoReturnUpBack />
          </TopBarButton>

          <TopBarButton
            onClick={() => {
              postNewProductionTicket();
            }}
          >
            <IoCheckmarkDoneOutline />
          </TopBarButton>
        </div>

        <Modal isOpen={props.canCreateProductEntry}>
          <div className={styles.missingUnAssignedProductEntriesDialog}>
            沒有需要開立的製造工單, 請先開訂購單
            <div
              className={styles.goToAddOrderBTN}
              onClick={() => {
                window.location.replace("/order");
              }}
            >
              前往
            </div>
          </div>
        </Modal>

        <div className={styles.ExtraInfoContainer}>
          <ul className={styles.LeftExtraInfoList}>
            <li>
              <span>客戶名稱 :</span>
              {/* cusomterId should not be editable since it is already defined when order is issued */}
              <div className={styles.DataBlockContainer}>
                <span>{customerId}</span>
              </div>
            </li>
            <li>
              <span>工單交貨日期 :</span>
              <div className={styles.DataBlockContainer}>
                <input
                  value={dueDate}
                  type="date"
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </li>
          </ul>
          <ul className={styles.RightExtraInfoList}>
            <li>
              <label for="orderId">訂購單號碼 :</label>
              <div className={styles.DataBlockContainer}>
                <select
                  onSubmit={() => {}}
                  name="availableProductEntries"
                  id="availableProductEntries"
                  onChange={(event) =>
                    handleProductEntryChange(event.target.value)
                  }
                >
                  {props.unAssignedProductEntries.map((item, index) => {
                    if (index === 0) {
                      return (
                        <option value={index} selected>
                          {"訂單號碼: " +
                            item.orderId +
                            " 客戶代號: " +
                            item.customerId +
                            " 規格: " +
                            item.model +
                            " 數量: " +
                            item.quantity}
                        </option>
                      );
                    } else {
                      return (
                        <option value={index}>
                          {"訂單號碼: " +
                            item.orderId +
                            " 客戶代號: " +
                            item.customerId +
                            " 規格: " +
                            item.model +
                            " 數量: " +
                            item.quantity}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
            </li>
            <li key="ticketId">
              <span>工單號碼 :</span>

              <div className={styles.DataBlockContainer}>
                <span>{"BR 下個編號"}</span>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.GridContainer}>
          <div>目數</div>
          <div>規格(外徑*總長度/有效長度*內徑)</div>
          <div>數量</div>
          <div>內管</div>
          <div>刷毛</div>
          <div>備註</div>
          <div>
            <input
              className={styles.GridInput}
              value={bristleType}
              onChange={(e) => setBristleType(e.target.value)}
            />
          </div>
          <div>
            <input
              className={styles.GridInput}
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <div>
            <input
              className={styles.GridInput}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
            />
          </div>
          <div>
            <input
              className={styles.GridInput}
              value={innerTubeType}
              onChange={(e) => setInnerTubeType(e.target.value)}
            />
          </div>
          <div>
            <input
              className={styles.GridInput}
              value={bristleDiameter}
              onChange={(e) => setBristleDiameter(e.target.value)}
              type="number"
              step="0.1"
            />
          </div>
          <div>
            <input
              className={styles.GridInput}
              value={modelNote}
              onChange={(e) => setModelNote(e.target.value)}
            />
          </div>
          <div>
            <input
              className={styles.GridInput}
              value={alumTubeType}
              onChange={(e) => setAlumTubeType(e.target.value)}
            />
          </div>
          <div>/</div>
          <div>
            <input
              className={styles.GridInput}
              value={alumRimType}
              onChange={(e) => setAlumRimType(e.target.value)}
            />
          </div>
          <div>備註1</div>
          <div>
            <input
              className={styles.GridInput}
              value={productionNote1}
              onChange={(e) => setProductionNote1(e.target.value)}
            />
          </div>
          <div>備註2</div>
          <div>
            <input
              className={styles.GridInput}
              value={productionNote2}
              onChange={(e) => setProductionNote2(e.target.value)}
            />
          </div>
          <div>備註3</div>
          <div>
            <input
              className={styles.GridInput}
              value={productionNote3}
              onChange={(e) => setProductionNote3(e.target.value)}
            />
          </div>
          <div>備註4</div>
          <div>
            <input
              className={styles.GridInput}
              value={productionNote4}
              onChange={(e) => setProductionNote4(e.target.value)}
            />
          </div>
          <div>備註5</div>
          <div>
            <input
              className={styles.GridInput}
              value={productionNote5}
              onChange={(e) => setProductionNote5(e.target.value)}
            />
          </div>
          <div>備註6</div>
          <div>
            <input
              className={styles.GridInput}
              value={productionNote6}
              onChange={(e) => setProductionNote6(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.progressRecordListContainer}>
          <div className={styles.progressRecord}>
            <div>備料</div>
            <div className={styles.progressRecordAssigneeContainer}>
              <select
                name="users"
                onChange={(event) => {
                  setPreparedBy(
                    usersDropDownOptions[parseInt(event.target.value)].userId
                  );
                }}
              >
                {usersDropDownOptions.map((user, index) => {
                  return <option value={index}>{user.name}</option>;
                })}
              </select>
            </div>
            <div className={styles.progressRecordTimeContainer}>
              <input
                type="datetime-local"
                value={dateTimeNullCheckAndInsertT(donePreparingAt)}
                onChange={(event) => {
                  setDonePreparingAt(event.target.value);
                }}
              />
            </div>
          </div>
          <div className={styles.progressRecord}>
            <div>纏繞</div>
            <div className={styles.progressRecordAssigneeContainer}>
              <select
                name="users"
                onChange={(event) => {
                  setTwinedBy(
                    usersDropDownOptions[parseInt(event.target.value)].userId
                  );
                }}
              >
                {usersDropDownOptions.map((user, index) => {
                  return <option value={index}>{user.name}</option>;
                })}
              </select>
            </div>
            <div className={styles.progressRecordTimeContainer}>
              <input
                type="datetime-local"
                value={dateTimeNullCheckAndInsertT(doneTwiningAt)}
                onChange={(event) => {
                  setDoneTwiningAt(event.target.value);
                }}
              />
            </div>
          </div>
          <div className={styles.progressRecord}>
            <div>修剪</div>
            <div className={styles.progressRecordAssigneeContainer}>
              <select
                name="users"
                onChange={(event) => {
                  setTrimmedBy(
                    usersDropDownOptions[parseInt(event.target.value)].userId
                  );
                }}
              >
                {usersDropDownOptions.map((user, index) => {
                  return <option value={index}>{user.name}</option>;
                })}
              </select>
            </div>
            <div className={styles.progressRecordTimeContainer}>
              <input
                type="datetime-local"
                value={dateTimeNullCheckAndInsertT(doneTrimmingAt)}
                onChange={(event) => {
                  setDoneTrimmingAt(event.target.value);
                }}
              />
            </div>
          </div>
          <div className={styles.progressRecord}>
            <div>打包</div>
            <div className={styles.progressRecordAssigneeContainer}>
              <select
                name="users"
                onChange={(event) => {
                  setPackagedBy(
                    usersDropDownOptions[parseInt(event.target.value)].userId
                  );
                }}
              >
                {usersDropDownOptions.map((user, index) => {
                  return <option value={index}>{user.name}</option>;
                })}
              </select>
            </div>
            <div className={styles.progressRecordTimeContainer}>
              <input
                type="datetime-local"
                value={dateTimeNullCheckAndInsertT(donePackagingAt)}
                onChange={(event) => {
                  setDonePackagingAt(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default AddTicket;
