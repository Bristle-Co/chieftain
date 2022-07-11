import { TopBarStateContext } from "../../components/context.js";
import { useContext } from "react";
import { IoAdd } from "react-icons/io5";
import SearchInput from "../../components/SearchInput/SearchInput.js";
import SearchButton from "../../components/SearchButton/SearchButton.js";
import styles from "./customer_detail.module.css";
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
      <form className={styles.SearchForm}>
        <SearchInput type="text" placeholder="類似即可" />
        <SearchInput type="text" placeholder="類似即可" />
        <SearchInput type="text" placeholder="類似即可" />
        <SearchInput type="text" placeholder="類似即可" />
        <SearchInput type="text" placeholder="類似即可" />
        <SearchButton type="submit" />
      </form>
      <table>
        <thead>
          <tr>
            <th>客戶代號</th>
            <th>客戶名稱</th>
            <th>聯絡人</th>
            <th>公司聯絡電話</th>
            <th>地址</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((customer) => (
            <tr>
              <td>{customer.customerId}</td>
              <td>{customer.name}</td>
              <td>{customer.contactName}</td>
              <td>{customer.contactNumber}</td>
              <td>{customer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerDetail;
