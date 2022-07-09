import { TopBarStateContext } from "../../components/context.js";
import { useContext } from "react";
import { IoAdd } from "react-icons/io5";
import Link from "next/link";

const productionTicketTopBarState = {
  pageName: "製造工單",
  buttons: [
    {
      name: "新增製造工單",
      callback: null,
      icon: (
        <Link href="/production_ticket/add_ticket">
          <IoAdd />
        </Link>
      ),
    },
  ],
};

const ProductionTicket = () => {
  const [topBarState, setTopBarState] = useContext(TopBarStateContext);
  setTopBarState({});
  setTopBarState(productionTicketTopBarState);

  return <h3>production ticket</h3>;
};

export default ProductionTicket;
