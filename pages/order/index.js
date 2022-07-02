import { TopBarStateContext } from "../../components/context.js";
import { TopBarButtons } from "../../components/TopBar/TopBar.js";
import { useContext } from "react";
const Order = () => {
  const [topBarState, setTopBarState] = useContext(TopBarStateContext);
  setTopBarState({
    pageName: "訂購單",
    buttons: [
      TopBarButtons.ADD,
      TopBarButtons.EDIT,
      TopBarButtons.BACK,
      TopBarButtons.DELETE,
    ],
  });
  return <h3>order</h3>;
};
export default Order;
