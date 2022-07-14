import { TopBarStateContext } from "../../components/context.js";
import { useContext, useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import SearchButton from "../../components/SearchButton/SearchButton.js";
import ArrowButton from "../../components/ArrowButton/ArrowButton";
import styles from "./customer_detail.module.css";
import DataTableStyles from "../../styles/DataTable.module.css";
import axios from "axios";
import Link from "next/link";
import {
  setCustomers,
  clearCustomers,
} from "../../components/redux/customers.js";
import { useDispatch, useSelector } from "react-redux";

const customerDetailTopBarState = {
  pageName: "客戶明細",
  buttons: [
    {
      name: "新增客戶資料",
      callback: null,
      icon: (
        <Link href="/customer_detail/add_customer">
          <IoAdd />
        </Link>
      ),
    },
  ],
};

export async function getServerSideProps(context) {
  let customers;
  try {
    const result = await axios({
      method: "get",
      url: "/customer_detail/getCustomers",
      baseURL: process.env.backendServerBaseURI,
      params: {
        pageIndex: 0,
        pageSize: 20,
      },
    });
    customers = result.data.data;
  } catch (error) {
    console.log(error.response);
  }
  console.log("fetch customer from server side success");
  console.log(customers);

  return {
    props: {
      data: customers,
    },
  };
}

const CustomerDetail = (props) => {
  useEffect(() => {
    // only call this once in page reload, because getServerSideProps only gets called on page load
    dispatch(setCustomers(props.data));
  }, []);
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customers);
  const [topBarState, setTopBarState] = useContext(TopBarStateContext);
  setTopBarState(customerDetailTopBarState);

  // state variable for search input fields
  const [customerIdSearch, setCustomerIdSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [contactNameSearch, setContactNameSearch] = useState("");
  const [constactNumberSearch, setContactNumberSearch] = useState("");
  const [addressSearch, setAddressSearch] = useState("");

  // save initial data from getServerSideProps in redux store

  const fetchCustomerByFilter = (event) => {
    event.preventDefault();
    console.log("called");

    //TODO validate serach fields

    axios({
      method: "get",
      url: "/customer_detail/getCustomers",
      baseURL: process.env.backendServerBaseURI,
      params: {
        customerId: customerIdSearch === "" ? null : customerIdSearch,
        name: nameSearch === "" ? null : nameSearch,
        contactName: contactNameSearch === "" ? null : contactNameSearch,
        contactNumber:
          constactNumberSearch === "" ? null : constactNumberSearch,
        address: addressSearch === "" ? null : addressSearch,
        pageIndex: 0,
        pageSize: 20,
      },
    })
      .then((result) => {
        dispatch(setCustomers(result.data.data));
        console.log("fetch customer by filter from client side success");
        console.log(result.data.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.Container}>
      {/* form is only allowed to wrap entire table */}
      <form className={styles.SearchForm} onSubmit={fetchCustomerByFilter}>
        <table className={DataTableStyles.DataTable}>
          <thead>
            <tr>
              {/* set the column width here inline by percentage
              all other child elements should have width:100% to fill all available space in a cell*/}
              <th key="customerId" style={{ width: "10%" }}>
                <input
                  type="text"
                  placeholder=" 類似即可"
                  value={customerIdSearch}
                  onChange={(e) => setCustomerIdSearch(e.target.value)}
                />
              </th>
              <th key="name" style={{ width: "20%" }}>
                <input
                  type="text"
                  placeholder=" 類似即可"
                  value={nameSearch}
                  onChange={(e) => setNameSearch(e.target.value)}
                />
              </th>
              <th key="contactName" style={{ width: "10%" }}>
                <input
                  type="text"
                  placeholder=" 類似即可"
                  value={contactNameSearch}
                  onChange={(e) => setContactNameSearch(e.target.value)}
                />
              </th>
              <th key="contactNumber" style={{ width: "10%" }}>
                <input
                  type="text"
                  placeholder=" 類似即可"
                  value={constactNumberSearch}
                  onChange={(e) => setContactNumberSearch(e.target.value)}
                />
              </th>
              <th key="address" style={{ width: "50%" }}>
                <div>
                  <input
                    type="text"
                    placeholder=" 類似即可"
                    value={addressSearch}
                    onChange={(e) => setAddressSearch(e.target.value)}
                  />
                  <SearchButton type="submit" />
                </div>
              </th>
            </tr>

            <tr>
              <th key="customerId" className={styles.CustomerIdTitle}>
                客戶代號
              </th>
              <th key="name" className={styles.NameTitle}>
                客戶名稱
              </th>
              <th key="contactName" className={styles.ContactNameTitle}>
                聯絡人
              </th>
              <th key="contactNumber" className={styles.ContactNumberTitle}>
                公司聯絡電話
              </th>
              <th key="address" className={styles.AddressTitle}>
                地址
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr>
                <td key="customerId">{customer.customerId}</td>
                <td key="name">{customer.name}</td>
                <td key="contactName">{customer.contactName}</td>
                <td key="contactNumber">{customer.contactNumber}</td>
                <td key="address">
                  <div>
                    {customer.address}
                    <Link
                      href={
                        "/customer_detail/view_customer/" + customer.customerId
                      }
                    >
                      <ArrowButton type="button" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default CustomerDetail;
