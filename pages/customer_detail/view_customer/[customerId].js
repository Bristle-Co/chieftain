import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styles from "./view_customer.module.css";

const view_customer = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customers);

  const router = useRouter();
  const { customerId, storeIndex } = router.query;
  const customer = customers[storeIndex] == null ? {};
  console.log(customer);

  return (
    <div className={styles.Container}>
      <div className={styles.labelContainer}>
        <div>客戶代號 : </div>
        <div>公司名稱 : </div>
        <div>聯絡人 : </div>
        <div>聯絡電話 : </div>
        <div>聯絡人手機 : </div>
        <div>傳真號碼 : </div>
        <div>郵遞區號 : </div>
        <div>地址 : </div>
        <div>統一編號 : </div>
        <div>收件人 : </div>
        <div>備註 : </div>
      </div>
      <div className={styles.DataContainer}>
        <div>{customer.customerId}</div>
        <div>{customer.name}</div>
        <div>{customer.contactName}</div>
        <div>{customer.contactNumber}</div>
        <div>{customer.contactMobileNumber}</div>
        <div>{customer.faxNumber}</div>
        <div>{customer.postalCode}</div>
        <div>{customer.address}</div>
        <div>{customer.taxId}</div>

        <div>{customer.receiver}</div>
        <div>{customer.note}</div>
      </div>
    </div>
  );
};

export default view_customer;
