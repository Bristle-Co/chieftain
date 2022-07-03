import { TopBarStateContext } from "../../components/context.js";
import { useContext } from "react";
import { IoAdd } from "react-icons/io5";
import Link from "next/link";

const orderTopBarState = {
  pageName: "訂購單",
  buttons: [
    {
      name: "新增訂購單",
      callback: null,
      icon: (
        <Link href="/order/add_order">
          <IoAdd />
        </Link>
      ),
    },
  ],
};
const Order = () => {
  const [topBarState, setTopBarState] = useContext(TopBarStateContext);
  setTopBarState(orderTopBarState);
  return <h3>order</h3>;
};
export default Order;
