import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./view_production_ticket.module.css";
import TopBarButton from "../../../components/TopBar/TopBarButton/TopBarButton.js";
import {
  IoPencil,
  IoCheckmarkDoneOutline,
  IoTrashOutline,
  IoReturnUpBack,
  IoCopyOutline,
} from "react-icons/io5";
import { IconContext } from "react-icons";
import {
  getProductionTicketByIdRequest,
  deleteProductionTicketByIdRequest,
  getAllUsersRequest,
} from "../../../utils/AxiosRequestUtils.js";
import Link from "next/link.js";
import { useRouter } from "next/router";
import {
  updateProductionTicket,
  setProductionTicket,
} from "../../../components/redux/productionTicket.js";
import {
  dateTimeNullCheckAndInsertT,
  dateTimeNullCheckAndRemoveT,
} from "../../../utils/UtilFunctions.js";

export async function getServerSideProps(context) {
  const { ticketId } = context.query;
  let productionTicket;
  let users;
  const response = { props: {} };

  try {
    const result = await axios(getProductionTicketByIdRequest(ticketId));
    productionTicket = result.data.data[0];
  } catch (error) {
    console.log(error.response.data);
    console.log("fetch production ticket from server side failed");

    response.props.data = {
      ticketId: 0,
      orderId: 0,
      productEntryId: "錯誤",
      customerId: "錯誤",
      dueDate: null,
      productName: "錯誤",
      bristleType: "錯誤",
      model: "錯誤",
      innerTubeType: "錯誤",
      bristleDiameter: 0,
      quantity: 0,
      alumTubeType: "錯誤",
      alumRimType: "錯誤",
      modelNote: "錯誤",
      donePreparingAt: null,
      preparedBy: "錯誤",
      doneTwiningAt: null,
      twinedBy: "錯誤",
      doneTrimmingAt: null,
      trimmedBy: "錯誤",
      donePackagingAt: null,
      packagedBy: "錯誤",
      issuedAt: null,
      productionNote1: "錯誤",
      productionNote2: "錯誤",
      productionNote3: "錯誤",
      productionNote4: "錯誤",
      productionNote5: "錯誤",
      productionNote6: "錯誤",
    };
  }

  try {
    const result = await axios(getAllUsersRequest());
    users = result.data.data;
  } catch (error) {
    console.log(error.response.data);
    console.log("fetch users from server side failed");
  }
  console.log("all server side requests success");
  console.log(productionTicket);
  console.log(users);

  return {
    props: {
      data: productionTicket,
      users: users,
    },
  };
}
const userUuidToName = (userArray, uuid) => {
  let name = undefined;
  userArray.map((user) => {
    if (user.userId === uuid) {
      name = user.name;
    }
  });

  if (name === undefined) {
    return "錯誤";
  }

  return name;
};

const ViewProductionTicket = (props) => {
  const usersDropDownOptions = [
    {
      userId: null,
      name: "未完成",
    },
    ...props.users,
  ];
  const dispatch = useDispatch();
  const { productionTicket } = useSelector((state) => state.productionTicket);
  const router = useRouter();

  // for the production ticket fields
  const [isEditing, setIsEditing] = useState(false);

  const [ticketId, setTicketId] = useState(props.data.ticketId);
  const [orderId, setOrderId] = useState(props.data.orderId);
  const [productEntryId, setProductEntryId] = useState(
    props.data.productEntryId
  );
  const [customerId, setCustomerId] = useState(props.data.customerId);
  const [dueDate, setDueDate] = useState(props.data.dueDate);
  const [productName, setProductName] = useState(props.data.productName);
  const [bristleType, setBristleType] = useState(props.data.bristleType);
  const [model, setModel] = useState(props.data.model);
  const [innerTubeType, setInnerTubeType] = useState(props.data.innerTubeType);
  const [bristleDiameter, setBristleDiameter] = useState(
    props.data.bristleDiameter
  );
  const [quantity, setQuantity] = useState(props.data.quantity);
  const [alumTubeType, setAlumTubeType] = useState(props.data.alumTubeType);
  const [alumRimType, setAlumRimType] = useState(props.data.alumRimType);
  const [modelNote, setModelNote] = useState(props.data.modelNote);
  const [donePreparingAt, setDonePreparingAt] = useState(
    props.data.donePreparingAt
  );
  const [preparedBy, setPreparedBy] = useState(props.data.preparedBy);
  const [doneTwiningAt, setDoneTwiningAt] = useState(props.data.doneTwiningAt);
  const [twinedBy, setTwinedBy] = useState(props.data.twinedBy);
  const [doneTrimmingAt, setDoneTrimmingAt] = useState(
    props.data.doneTrimmingAt
  );
  const [trimmedBy, setTrimmedBy] = useState(props.data.trimmedBy);
  const [donePackagingAt, setDonePackagingAt] = useState(
    props.data.doneTrimmingAt
  );
  const [packagedBy, setPackagedBy] = useState(props.data.packagedBy);
  const [issuedAt, setIssuedAt] = useState(props.data.issuedAt);
  const [productionNote1, setProductionNote1] = useState(
    props.data.productionNote1
  );
  const [productionNote2, setProductionNote2] = useState(
    props.data.productionNote2
  );
  const [productionNote3, setProductionNote3] = useState(
    props.data.productionNote3
  );
  const [productionNote4, setProductionNote4] = useState(
    props.data.productionNote4
  );
  const [productionNote5, setProductionNote5] = useState(
    props.data.productionNote5
  );
  const [productionNote6, setProductionNote6] = useState(
    props.data.productionNote6
  );

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
      // Values in useState variables are only used when input is showing,
      // thus we need to sync the useState variables with redux state when input is about to show
      setTicketId(productionTicket.ticketId);
      setOrderId(productionTicket.orderId);
      setProductEntryId(productionTicket.productEntryId);
      setCustomerId(productionTicket.customerId);
      setDueDate(productionTicket.dueDate);
      setProductName(productionTicket.productName);
      setBristleType(productionTicket.bristleType);
      setModel(productionTicket.model);
      setInnerTubeType(productionTicket.innerTubeType);
      setBristleDiameter(productionTicket.bristleDiameter);
      setQuantity(productionTicket.quantity);
      setAlumTubeType(productionTicket.alumTubeType);
      setAlumRimType(productionTicket.alumRimType);
      setModelNote(productionTicket.modelNote);
      setPreparedBy(productionTicket.preparedBy);
      setDonePreparingAt(productionTicket.donePreparingAt);
      setTwinedBy(productionTicket.twinedBy);
      setDoneTwiningAt(productionTicket.doneTwiningAt);
      setTrimmedBy(productionTicket.trimmedBy);
      setDoneTrimmingAt(productionTicket.doneTrimmingAt);
      setPackagedBy(productionTicket.packagedBy);
      setDonePackagingAt(productionTicket.donePackagingAt);
      setProductionNote1(productionTicket.productionNote1);
      setProductionNote2(productionTicket.productionNote2);
      setProductionNote3(productionTicket.productionNote3);
      setProductionNote4(productionTicket.productionNote4);
      setProductionNote5(productionTicket.productionNote5);
      setProductionNote6(productionTicket.productionNote6);

      setIsEditing(true);
      return;
    }
    // TODO validate fields
    const updatedProductionTicket = {
      ticketId: ticketId,
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
      donePreparingAt: dateTimeNullCheckAndRemoveT(donePreparingAt),
      preparedBy: preparedBy,
      doneTwiningAt: dateTimeNullCheckAndRemoveT(doneTwiningAt),
      twinedBy: twinedBy,
      doneTrimmingAt: dateTimeNullCheckAndRemoveT(doneTrimmingAt),
      trimmedBy: trimmedBy,
      donePackagingAt: dateTimeNullCheckAndRemoveT(donePackagingAt),
      packagedBy: packagedBy,
      issuedAt: dateTimeNullCheckAndRemoveT(issuedAt),
      productionNote1: productionNote1,
      productionNote2: productionNote2,
      productionNote3: productionNote3,
      productionNote4: productionNote4,
      productionNote5: productionNote5,
      productionNote6: productionNote6,
    };

    dispatch(updateProductionTicket(updatedProductionTicket));
    setIsEditing(false);
  };

  useEffect(() => {
    dispatch(setProductionTicket(props.data));
  }, []);
  return (
    <IconContext.Provider
      value={{ color: "var(--brown)", height: "100%", width: "100%" }}
    >
      <div className={styles.Container}>
        <div key="test" className="TopButtonContainer">
          <TopBarButton onClick={() => window.history.back()}>
            <IoReturnUpBack />
          </TopBarButton>
          <Link
            href={
              "/production_ticket/add_production_ticket?ticketId=" +
              productionTicket.ticketId
            }
          >
            <TopBarButton>
              <IoCopyOutline />
            </TopBarButton>
          </Link>
          <TopBarButton onClick={() => handleEditing()} isRound={false}>
            {isEditing ? <IoCheckmarkDoneOutline /> : <IoPencil />}
          </TopBarButton>

          <TopBarButton
            onClick={() => {
              handleDeleting();
            }}
          >
            <IoTrashOutline />
          </TopBarButton>
        </div>
        <div className={styles.ExtraInfoContainer}>
          <ul className={styles.LeftExtraInfoList}>
            <li>
              <span>客戶名稱 :</span>
              {/* cusomterId should not be editable since it is already defined when order is issued */}
              <div className={styles.DataBlockContainer}>
                <span>{productionTicket.customerId}</span>
              </div>
            </li>
            <li>
              <span>工單交貨日期 :</span>
              <div className={styles.DataBlockContainer}>
                {isEditing ? (
                  <input
                    value={dueDate}
                    type="date"
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                ) : (
                  <span>{productionTicket.dueDate}</span>
                )}
              </div>
            </li>
          </ul>
          <ul className={styles.RightExtraInfoList}>
            <li>
              <label for="orderId">訂購單號碼 :</label>
              <div className={styles.DataBlockContainer}>
                <select
                  onSubmit={() => {}}
                  name="unAssignedProductEntries"
                  id="unAssignedProductEntries"
                >
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
            </li>
            <li key="ticketId">
              <span>工單號碼 :</span>

              <div className={styles.DataBlockContainer}>
                <span>{"BR " + productionTicket.ticketId}</span>
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
            {isEditing ? (
              <input
                className={styles.GridInput}
                value={bristleType}
                onChange={(e) => setBristleType(e.target.value)}
              />
            ) : (
              <> {productionTicket.bristleType}</>
            )}
          </div>
          <div>
            {isEditing ? (
              <input
                className={styles.GridInput}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            ) : (
              <> {productionTicket.model}</>
            )}
          </div>
          <div>
            {isEditing ? (
              <input
                className={styles.GridInput}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            ) : (
              <> {productionTicket.quantity}</>
            )}
          </div>
          <div>
            {isEditing ? (
              <input
                className={styles.GridInput}
                value={innerTubeType}
                onChange={(e) => setInnerTubeType(e.target.value)}
              />
            ) : (
              <> {productionTicket.innerTubeType}</>
            )}
          </div>
          <div>
            {isEditing ? (
              <input
                className={styles.GridInput}
                value={bristleDiameter}
                onChange={(e) => setBristleDiameter(e.target.value)}
              />
            ) : (
              <> {productionTicket.bristleDiameter}</>
            )}
          </div>
          <div>
            {isEditing ? (
              <input
                className={styles.GridInput}
                value={modelNote}
                onChange={(e) => setModelNote(e.target.value)}
              />
            ) : (
              <> {productionTicket.modelNote}</>
            )}
          </div>
          <div>
            {" "}
            {isEditing ? (
              <input
                className={styles.GridInput}
                value={alumTubeType}
                onChange={(e) => setAlumTubeType(e.target.value)}
              />
            ) : (
              <> {productionTicket.alumTubeType}</>
            )}
          </div>
          <div>/</div>
          <div>
            {isEditing ? (
              <input
                className={styles.GridInput}
                value={alumRimType}
                onChange={(e) => setAlumRimType(e.target.value)}
              />
            ) : (
              <> {productionTicket.alumRimType}</>
            )}
          </div>
          <div>備註1</div>
          <div>
            {isEditing ? (
              <input
                className={styles.GridInput}
                value={productionNote1}
                onChange={(e) => setProductionNote1(e.target.value)}
              />
            ) : (
              <> {productionTicket.productionNote1}</>
            )}
          </div>
          <div>備註2</div>
          <div>
            {isEditing ? (
              <input
                className={styles.GridInput}
                value={productionNote2}
                onChange={(e) => setProductionNote2(e.target.value)}
              />
            ) : (
              <> {productionTicket.productionNote2}</>
            )}
          </div>
          <div>備註3</div>
          <div>
            {isEditing ? (
              <input
                className={styles.GridInput}
                value={productionNote3}
                onChange={(e) => setProductionNote3(e.target.value)}
              />
            ) : (
              <> {productionTicket.productionNote3}</>
            )}
          </div>
          <div>備註4</div>
          <div>
            {isEditing ? (
              <input
                className={styles.GridInput}
                value={productionNote4}
                onChange={(e) => setProductionNote4(e.target.value)}
              />
            ) : (
              <> {productionTicket.productionNote4}</>
            )}
          </div>
          <div>備註5</div>
          <div>
            {isEditing ? (
              <input
                className={styles.GridInput}
                value={productionNote5}
                onChange={(e) => setProductionNote5(e.target.value)}
              />
            ) : (
              <> {productionTicket.productionNote5}</>
            )}
          </div>
          <div>備註6</div>
          <div>
            {isEditing ? (
              <input
                className={styles.GridInput}
                value={productionNote6}
                onChange={(e) => setProductionNote6(e.target.value)}
              />
            ) : (
              <> {productionTicket.productionNote6}</>
            )}
          </div>
        </div>

        <div className={styles.progressRecordListContainer}>
          <div className={styles.progressRecord}>
            <div>備料</div>
            <div className={styles.progressRecordAssigneeContainer}>
              {isEditing ? (
                <select
                  name="users"
                  onChange={(event) => {
                    setPreparedBy(
                      usersDropDownOptions[parseInt(event.target.value)].userId
                    );
                  }}
                >
                  {usersDropDownOptions.map((user, index) => {
                    if (user.userId == productionTicket.preparedBy) {
                      // if this progress is not done yet, preparedBy == null
                      // which should coorsponds to the "未完成" option
                      return (
                        <option value={index} selected>
                          {user.name}
                        </option>
                      );
                    } else {
                      return <option value={index}>{user.name}</option>;
                    }
                  })}
                </select>
              ) : (
                <>
                  {userUuidToName(
                    usersDropDownOptions,
                    productionTicket.preparedBy
                  )}
                </>
              )}
            </div>
            <div className={styles.progressRecordTimeContainer}>
              {isEditing ? (
                <input
                  type="datetime-local"
                  value={dateTimeNullCheckAndInsertT(donePreparingAt)}
                  onChange={(event) => {
                    setDonePreparingAt(event.target.value);
                  }}
                />
              ) : (
                <>{productionTicket.donePreparingAt}</>
              )}
            </div>
          </div>
          <div className={styles.progressRecord}>
            <div>纏繞</div>
            <div className={styles.progressRecordAssigneeContainer}>
              {isEditing ? (
                <select
                  name="users"
                  onChange={(event) => {
                    setTwinedBy(
                      usersDropDownOptions[parseInt(event.target.value)].userId
                    );
                  }}
                >
                  {usersDropDownOptions.map((user, index) => {
                    if (user.userId == productionTicket.twinedBy) {
                      return (
                        <option value={index} selected>
                          {user.name}
                        </option>
                      );
                    } else {
                      return <option value={index}>{user.name}</option>;
                    }
                  })}
                </select>
              ) : (
                <>
                  {userUuidToName(
                    usersDropDownOptions,
                    productionTicket.twinedBy
                  )}
                </>
              )}
            </div>
            <div className={styles.progressRecordTimeContainer}>
              {isEditing ? (
                <input
                  type="datetime-local"
                  value={dateTimeNullCheckAndInsertT(doneTwiningAt)}
                  onChange={(event) => {
                    setDoneTwiningAt(event.target.value);
                  }}
                />
              ) : (
                <>{productionTicket.doneTwiningAt}</>
              )}
            </div>
          </div>
          <div className={styles.progressRecord}>
            <div>修剪</div>
            <div className={styles.progressRecordAssigneeContainer}>
              {isEditing ? (
                <select
                  name="users"
                  onChange={(event) => {
                    setTrimmedBy(
                      usersDropDownOptions[parseInt(event.target.value)].userId
                    );
                  }}
                >
                  {usersDropDownOptions.map((user, index) => {
                    if (user.userId == productionTicket.trimmedBy) {
                      return (
                        <option value={index} selected>
                          {user.name}
                        </option>
                      );
                    } else {
                      return <option value={index}>{user.name}</option>;
                    }
                  })}
                </select>
              ) : (
                <>
                  {userUuidToName(
                    usersDropDownOptions,
                    productionTicket.trimmedBy
                  )}
                </>
              )}
            </div>
            <div className={styles.progressRecordTimeContainer}>
              {isEditing ? (
                <input
                  type="datetime-local"
                  value={dateTimeNullCheckAndInsertT(doneTrimmingAt)}
                  onChange={(event) => {
                    setDoneTrimmingAt(event.target.value);
                  }}
                />
              ) : (
                <>{productionTicket.doneTrimmingAt}</>
              )}
            </div>
          </div>
          <div className={styles.progressRecord}>
            <div>打包</div>
            <div className={styles.progressRecordAssigneeContainer}>
              {isEditing ? (
                <select
                  name="users"
                  onChange={(event) => {
                    setPackagedBy(
                      usersDropDownOptions[parseInt(event.target.value)].userId
                    );
                  }}
                >
                  {usersDropDownOptions.map((user, index) => {
                    if (user.userId == productionTicket.packagedBy) {
                      return (
                        <option value={index} selected>
                          {user.name}
                        </option>
                      );
                    } else {
                      return <option value={index}>{user.name}</option>;
                    }
                  })}
                </select>
              ) : (
                <>
                  {userUuidToName(
                    usersDropDownOptions,
                    productionTicket.packagedBy
                  )}
                </>
              )}
            </div>
            <div className={styles.progressRecordTimeContainer}>
              {isEditing ? (
                <input
                  type="datetime-local"
                  value={dateTimeNullCheckAndInsertT(donePackagingAt)}
                  onChange={(event) => {
                    setDonePackagingAt(event.target.value);
                  }}
                />
              ) : (
                <>{productionTicket.donePackagingAt}</>
              )}
            </div>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default ViewProductionTicket;
