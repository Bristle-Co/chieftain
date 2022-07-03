import React, { useState } from "react";
import TopBar from "./TopBar/TopBar.js";
import { TopBarStateContext } from "./context";

const Layout = ({ children }) => {
  const [topBarState, setTopBarState] = useState({
    pageName: "",
    buttons: [],
  });

  // template
  // topBarState = {
  //   pageName: "訂購單",
  //   buttons: [
  //     {
  //       name: "check",
  //       path: "/order",
  //       callback: {},
  //       icon: <someIcon></someIcon>,
  //     },{
  //       name: "add",
  //       path: "/order/something",
  //       callback: {},
  //       icon: <someIcon></someIcon>,
  //     }
  //   ],
  // };

  return (
    <div>
      <TopBarStateContext.Provider value={[topBarState, setTopBarState]}>
        <TopBar />
        {children}
      </TopBarStateContext.Provider>
    </div>
  );
};

export default Layout;
