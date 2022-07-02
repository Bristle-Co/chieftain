import { TopBarStateContext } from "../../components/context.js";
import { TopBarButtons } from "../../components/TopBar/TopBar.js";
import { useContext } from "react";

const ProductionTicket = () => {
  const [topBarState, setTopBarState] = useContext(TopBarStateContext);
  setTopBarState({
    pageName: "訂購單",
    buttons: [TopBarButtons.ADD],
  });
  return <h3>production ticket</h3>;
};

export default ProductionTicket;
