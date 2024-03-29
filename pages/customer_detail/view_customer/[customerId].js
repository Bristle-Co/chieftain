import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styles from "./view_customer.module.css";
import axios from "axios";
import { IconContext } from "react-icons";
import TopBarButton from "../../../components/TopBar/TopBarButton/TopBarButton.js";
import {
  IoPencil,
  IoCheckmarkDoneOutline,
  IoTrashOutline,
  IoReturnUpBack,
} from "react-icons/io5";
import { setCustomers } from "../../../components/redux/customers.js";

const isEqualCustomer = (customer1, customer2) => {
  let isEqual = true;
  Object.keys(customer1).forEach((key) => {
    if (customer1[key] != customer2[key]) {
      console.log("isdiferent");
      console.log(customer2[key]);
      isEqual = false;
    }
  });
  return isEqual;
};
const getCustomerByIdRequest = (givenCustomerId) => {
  return {
    method: "GET",
    url: "/customer_detail",
    baseURL: process.env.backendServerBaseURI,
    params: {
      customerId: givenCustomerId,
      pageIndex: 0,
      pageSize: process.env.globalPageSize,
    },
  };
};
export async function getServerSideProps(context) {
  const { customerId } = context.query;
  let customer;

  try {
    const result = await axios(getCustomerByIdRequest(customerId));
    customer = result.data.data[0];
  } catch (error) {
    console.log(error.response);
    console.log("fetch customer from server side failed");

    return {
      props: {
        data: {
          customerId: "錯誤",
          name: "錯誤",
          contactName: "錯誤",
          contactNumber: "錯誤",
          contactMobileNumber: "錯誤",
          faxNumber: "錯誤",
          postalCode: "錯誤",
          address: "錯誤",
          taxId: "錯誤",
          receiver: "錯誤",
          note: "錯誤",
        },
      },
    };
  }
  console.log("fetch customer from server side success");
  console.log(customer);

  return {
    props: {
      data: customer,
    },
  };
}
const view_customer = (props) => {
  const dispatch = useDispatch();
  const { customerRequest } = useSelector((state) => state.customerRequest);
  const [customer, setCustomer] = useState(props.data);

  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  // useState variable for customer fields
  const [customerId, setCustomerId] = useState(props.data.customerId);
  const [name, setName] = useState(props.data.name);
  const [contactName, setContactName] = useState(props.data.contactName);
  const [contactNumber, setContactNumber] = useState(props.data.contactNumber);
  const [contactMobileNumber, setContactMobileNumber] = useState(
    props.data.contactMobileNumber
  );
  const [faxNumber, setFaxNumber] = useState(props.data.faxNumber);
  const [postalCode, setPostalCode] = useState(props.data.postalCode);
  const [address, setAddress] = useState(props.data.address);
  const [taxId, setTaxId] = useState(props.data.taxId);
  const [receiver, setReceiver] = useState(props.data.receiver);
  const [note, setNote] = useState(props.data.note);

  const handleEditing = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    // TODO validate fields
    udpateCustomer();
  };

  const udpateCustomer = () => {
    // check if any data is changed
    const updatedCustomer = {
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
    };
    if (isEqualCustomer(customer, updatedCustomer)) {
      console.log("no fields changed, update request is not sent");
      setIsEditing(false);
      return;
    }
    axios({
      method: "PUT",
      url: "/customer_detail",
      baseURL: process.env.backendServerBaseURI,
      data: updatedCustomer,
    })
      .then((result) => {
        console.log("update success");
        console.log(result);

        axios(getCustomerByIdRequest(customerId))
          .then((result) => {
            console.log("get after update sucess");
            console.log(result);
            setCustomer(result.data.data[0]);
            setIsEditing(false);
            fetchCustomerWithCachedRequest();
          })
          .catch((error) => {
            console.log("get after update failed");
            console.log(error);
          });
      })
      .catch((error) => {
        console.log("update failed");
        console.log(error);
      });
  };

  const deleteCustomerAndGoToMainPage = () => {
    console.log("delete customer request with ID " + customerId + " sent");
    axios({
      method: "DELETE",
      url: "/customer_detail",
      baseURL: process.env.backendServerBaseURI,
      params: {
        customerId: customerId,
      },
    })
      .then((result) => {
        console.log("delete success");
        console.log(result);
        fetchCustomerWithCachedRequest();
        window.location.replace("/customer_detail");
      })
      .catch((error) => {
        console.log("delete failed");
        console.log(error);
      });
  };

  const fetchCustomerWithCachedRequest = () => {
    console.log("getCustomers request sent, request:");
    console.log(customerRequest);
    axios(customerRequest)
      .then((result) => {
        dispatch(setCustomers(result.data.data));
        console.log(
          "getCustomers by existing request from client side success. result: "
        );
        console.log(result.data.data);
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
        <div className="TopButtonContainer">
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
      <div className={styles.DataContainer}>
        <div>
          <span>客戶代號</span>:<span>{customer.customerId}</span>
        </div>
        <div>
          <span>公司名稱</span>:
          {isEditing ? (
            <input value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            <span>{customer.name}</span>
          )}
        </div>
        <div>
          <span>聯絡人</span>:
          {isEditing ? (
            <input
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
          ) : (
            <span>{customer.contactName}</span>
          )}
        </div>
        <div>
          <span>聯絡電話</span>:
          {isEditing ? (
            <input
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          ) : (
            <span>{customer.contactNumber}</span>
          )}
        </div>
        <div>
          <span>聯絡人手機</span>:
          {isEditing ? (
            <input
              value={contactMobileNumber}
              onChange={(e) => setContactMobileNumber(e.target.value)}
            />
          ) : (
            <span>{customer.contactMobileNumber}</span>
          )}
        </div>
        <div>
          <span>傳真號碼</span>:
          {isEditing ? (
            <input
              value={faxNumber}
              onChange={(e) => setFaxNumber(e.target.value)}
            />
          ) : (
            <span>{customer.faxNumber}</span>
          )}
        </div>
        <div>
          <span>郵遞區號</span>:
          {isEditing ? (
            <input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          ) : (
            <span>{customer.postalCode}</span>
          )}
        </div>
        <div>
          <span>地址</span>:
          {isEditing ? (
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          ) : (
            <span>{customer.address}</span>
          )}
        </div>
        <div>
          <span>統一編號</span>:
          {isEditing ? (
            <input value={taxId} onChange={(e) => setTaxId(e.target.value)} />
          ) : (
            <span>{customer.taxId}</span>
          )}
        </div>
        <div>
          <span>收件人</span>:
          {isEditing ? (
            <input
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />
          ) : (
            <span>{customer.receiver}</span>
          )}
        </div>
        <div>
          <span>備註</span>:
          {isEditing ? (
            <textarea
              defaultValue={note}
              onChange={(e) => setNote(e.target.value)}
            />
          ) : (
            <span>{customer.note}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default view_customer;
