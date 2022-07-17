import { TopBarStateContext } from "../../../components/context.js";
import { useContext } from "react";
import { IoIosReturnLeft } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";

const orderTopBarState = {
  pageName: "新增訂購單",
  buttons: []
};

const AddOrder = () => {
  const [topBarState, setTopBarState] = useContext(TopBarStateContext);
  setTopBarState(orderTopBarState);

  return <h3>add order</h3>;
};

export default AddOrder;
