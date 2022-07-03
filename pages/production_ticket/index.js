import { TopBarStateContext } from "../../components/context.js";
import { useContext } from "react";

const ProductionTicket = () => {
  const [topBarState, setTopBarState] = useContext(TopBarStateContext);
  setTopBarState({});
  return <h3>production ticket</h3>;
};

export default ProductionTicket;
