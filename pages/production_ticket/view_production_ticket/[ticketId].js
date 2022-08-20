import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal/Modal.js";
import styles from "./view_production_ticket.module.css";
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
import {
  getProductionTicketByIdRequest,
  deleteProductionTicketByIdRequest,
} from "../../../components/AxiosRequestUtils.js";
import Link from "next/link.js";
import { useRouter } from "next/router";
import {
  setProductionTicket,
  setProductionTicketRequest,
} from "../../../components/redux/productionTicket.js";

export async function getServerSideProps(context) {
  const { ticketId } = context.query;
  let productionTicket;

  try {
    const result = await axios(getProductionTicketByIdRequest(ticketId));
    productionTicket = result.data.data[0];
  } catch (error) {
    console.log(error.response.data);
    console.log("fetch production ticket from server side failed");

    return {
      props: {
        data: {
          ticketId: 0,
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
        },
      },
    };
  }
  console.log("fetch production ticket from server side success");
  console.log(productionTicket);

  return {
    props: {
      data: productionTicket,
    },
  };
}

const ViewProductionTicket = (props) => {
  const dispatch = useDispatch();
  const { productionTicket } = useSelector((state) => state.productionTicket);
  const router = useRouter();

  // for the production ticket fields
  const [isEditing, setIsEditing] = useState(false);

  const [ticketId, setTicketId] = useState(props.data.ticketId);
  const [customerId, setCustomerId] = useState(props.data.customerId);
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
  const [twinedBy, setTwinedBy] = useState(props.data.twinedBy);
  const [doneTrimmingAt, setDoneTrimmingAt] = useState(
    props.data.doneTrimmingAt
  );
  const [trimmedBy, setTrimmedBy] = useState(props.data.trimmedBy);
  const [packagedBy, setPackagedBy] = useState(props.data.packagedBy);
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
      setTicketId(ticket.ticketId);
      setCustomerId(ticket.customerId);
      setProductName(ticket.productName);
      setBristleType(ticket.bristleType);
      setModel(ticket.model);
      setInnerTubeType(ticket.innerTubeType);
      setBristleDiameter(ticket.bristleDiameter);
      setQuantity(ticket.quantity);
      setAlumTubeType(ticket.alumTubeType);
      setAlumRimType(ticket.alumRimType);
      setModelNote(ticket.modelNote);
      setDonePreparingAt(ticket.donePreparingAt);
      setPreparedBy(ticket.preparedBy);
      setTwinedBy(ticket.twinedBy);
      setDoneTrimmingAt(ticket.doneTrimmingAt);
      setTrimmedBy(ticket.trimmedBy);
      setPackagedBy(ticket.packagedBy);
      setProductionNote1(ticket.productionNote1);
      setProductionNote2(ticket.productionNote2);
      setProductionNote3(ticket.productionNote3);
      setProductionNote4(ticket.productionNote4);
      setProductionNote5(ticket.productionNote5);
      setProductionNote6(ticket.productionNote6);

      setIsEditing(true);
      return;
    }
    // TODO validate fields
    const updatedProductionTicket = {
      ticketId: ticketId,
      customerId: "千得4",
      dueDate: "2022-03-04",
      productName: "尼龍刷倫",
      bristleType: "目數4",
      model: '5-5/8"*705/620*2"',
      innerTubeType: "內管4",
      bristleDiameter: 20.4,
      quantity: 3,
      alumTubeType: '4"*601mm',
      alumRimType: "45號",
      modelNote: "model備註4",
      donePreparingAt: null,
      preparedBy: null,
      doneTwiningAt: null,
      twinedBy: null,
      doneTrimmingAt: null,
      trimmedBy: null,
      donePackagingAt: null,
      packagedBy: null,
      issuedAt: "2022-08-08 21:26",
      productionNote1: "備註1",
      productionNote2: "備註2",
      productionNote3: "備註3",
      productionNote4: "備註4",
      productionNote5: "備註5",
      productionNote6: "備註6",
    };

    dispatch(
      updateOrder({
        commonFieldSlice: { order: updatedOrder },
      })
    );
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
          <TopBarButton onClick={() => handleEditing()} isRound={true}>
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
            {isEditing ? (
              <li>
                <label for="cars">Choose a car:</label>

                <select name="cars" id="cars">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </li>
            ) : (
              <li key="orderId">
                <span>訂購單號碼 :</span>
              </li>
            )}
          </ul>
          <ul className={styles.RightExtraInfoList}>
            <li key="ticketId">
              <span>工單號碼 :</span>
              <input
                value={productionTicket.ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                type="text"
              />
            </li>
          </ul>
        </div>
        <div className={styles.GridContainer}></div>
      </div>
    </IconContext.Provider>
  );
};

export default ViewProductionTicket;
