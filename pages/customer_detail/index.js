import { TopBarStateContext } from "../../components/context.js";
import { useContext } from "react";
import { IoAdd } from "react-icons/io5";
import SearchButton from "../../components/SearchButton/SearchButton.js";
import ArrowButton from "../../components/ArrowButton/ArrowButton";
import styles from "./customer_detail.module.css";
import DataTableStyles from "../../styles/DataTable.module.css";
import axios from "axios";
import Link from "next/link";

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
  } catch (error) {}
  console.log("actual data");
  console.log(customers);

  return {
    props: {
      data: customers,
    },
  };
}

const CustomerDetail = (props) => {
  const [topBarState, setTopBarState] = useContext(TopBarStateContext);
  setTopBarState({});
  setTopBarState(customerDetailTopBarState);

  return (
    <div className={styles.Container}>
      {/* form is only allowed to wrap entire table */}
      <form className={styles.SearchForm}>
        <table className={DataTableStyles.DataTable}>
          <thead>
            <tr>
              {/* set the column width here inline by percentage
              all other child elements should have width:100% to fill all available space in a cell*/}
              <th style={{ width: "10%" }}>
                <input type="text" placeholder=" 類似即可" />
              </th>
              <th style={{ width: "20%" }}>
                <input type="text" placeholder=" 類似即可" />
              </th>
              <th style={{ width: "10%" }}>
                <input type="text" placeholder=" 類似即可" />
              </th>
              <th style={{ width: "10%" }}>
                <input type="text" placeholder=" 類似即可" />
              </th>
              <th style={{ width: "50%" }}>
                <div>
                  <input type="text" placeholder=" 類似即可" />
                  <SearchButton type="submit" />
                </div>
              </th>
            </tr>

            <tr>
              <th className={styles.CustomerIdTitle}>客戶代號</th>
              <th className={styles.NameTitle}>客戶名稱</th>
              <th className={styles.ContactNameTitle}>聯絡人</th>
              <th className={styles.ContactNumberTitle}>公司聯絡電話</th>
              <th className={styles.AddressTitle}>地址</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((customer) => (
              <tr>
                <td>{customer.customerId}</td>
                <td>{customer.name}</td>
                <td>{customer.contactName}</td>
                <td>{customer.contactNumber}</td>
                <td>
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
