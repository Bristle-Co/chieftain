import { TopBarStateContext } from "../../components/context.js";
import { useContext } from "react";
import { IoAdd } from "react-icons/io5";
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

const CustomerDetail = () => {
  const [topBarState, setTopBarState] = useContext(TopBarStateContext);
  setTopBarState({});
  setTopBarState(customerDetailTopBarState);

  return (
    <h3>
      customer
      detaileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    </h3>
  );
};

export default CustomerDetail;
