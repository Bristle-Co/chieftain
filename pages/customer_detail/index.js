import { TopBarStateContext } from "../../components/context.js";
import { useContext } from "react";
import { IoAdd } from "react-icons/io5";
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
    <>
      <h3>customer</h3>
      <p>{JSON.stringify(props.data[1])}</p>
    </>
  );
};

export default CustomerDetail;
