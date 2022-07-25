import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./add_customer.module.css";
import axios from "axios";
import { IconContext } from "react-icons";
import TopBarButton from "../../../components/TopBar/TopBarButton/TopBarButton.js";
import { IoCheckmarkDoneOutline, IoReturnUpBack } from "react-icons/io5";
import { setCustomers } from "../../../components/redux/customers.js";

const AddCustomer = () => {
  const dispatch = useDispatch();
  const { customerRequest } = useSelector((state) => state.customerRequest);

  // useState variable for customer fields
  const [customerId, setCustomerId] = useState("");
  const [name, setName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactMobileNumber, setContactMobileNumber] = useState("");
  const [faxNumber, setFaxNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [taxId, setTaxId] = useState("");
  const [receiver, setReceiver] = useState("");
  const [note, setNote] = useState("");

  const postCustomerAndGoBackToMainPage = () => {
    // TODO validate fields

    axios({
      method: "POST",
      url: "/customer_detail",
      baseURL: process.env.backendServerBaseURI,
      data: {
        customerId: customerId,
        name: name,
        contactName: contactName,
        contactNumber: contactNumber,
        contactMobileNumber: contactMobileNumber,
        faxNumber: faxNumber,
        postalCode: postalCode,
        address: address,
        taxId: taxId,
        receiver: receiver,
        note: note,
      },
    })
      .then((result) => {
        console.log("post customer success");
        console.log(result);

        updateReduxStoreCustomersListAndGoBackToMainPage();
      })
      .catch((error) => {
        console.log("post customer failed");
        console.log(error);
        alert("新增客戶失敗! 聯絡鞍");
      });
  };
  const updateReduxStoreCustomersListAndGoBackToMainPage = () => {
    axios(customerRequest)
      .then((result) => {
        dispatch(setCustomers(result.data.data));
        console.log(
          "getCustomers by existing request from client side success. result: "
        );
        console.log(result.data.data);
        alert("新增客戶成功!");
        window.history.back();
      })
      .catch((error) => {
        console.log(
          "getCustomers by existing request from client side failed. error: "
        );
        console.log(error);
      });
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
          <TopBarButton onClick={() => postCustomerAndGoBackToMainPage()}>
            <IoCheckmarkDoneOutline />
          </TopBarButton>
        </div>
      </IconContext.Provider>
      <div className={styles.DataContainer}>
        <div>
          <span>客戶代號</span>:
          <input
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
        </div>
        <div>
          <span>公司名稱</span>:
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <span>聯絡人</span>:
          <input
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>
        <div>
          <span>聯絡電話</span>:
          <input
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>
        <div>
          <span>聯絡人手機</span>:
          <input
            value={contactMobileNumber}
            onChange={(e) => setContactMobileNumber(e.target.value)}
          />
        </div>
        <div>
          <span>傳真號碼</span>:
          <input
            value={faxNumber}
            onChange={(e) => setFaxNumber(e.target.value)}
          />
        </div>
        <div>
          <span>郵遞區號</span>:
          <input
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div>
          <span>地址</span>:
          <input value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <span>統一編號</span>:
          <input value={taxId} onChange={(e) => setTaxId(e.target.value)} />
        </div>
        <div>
          <span>收件人</span>:
          <input
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
        </div>
        <div>
          <span>備註</span>:
          <textarea
            defaultValue={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
