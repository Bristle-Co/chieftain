import { TopBarStateContext } from "../../../components/context.js";
import { useContext } from "react";
import { IoIosReturnLeft } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";

const orderTopBarState = {
  pageName: "新增訂購單",
  buttons: [
    {
      name: "返回",
      callback: () => {
        window.history.back();
      },
      icon: <IoIosReturnLeft />,
    },
    {
      name: "確定",
      callback: {},
      icon: <IoCheckmark />,
    },
  ],
};

const AddOrder = () => {
  const [topBarState, setTopBarState] = useContext(TopBarStateContext);
  setTopBarState(orderTopBarState);

  return <h3>add order</h3>;
};

export default AddOrder;
