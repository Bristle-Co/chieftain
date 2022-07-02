import React, { useState } from "react";
import TopBar from "./TopBar/TopBar.js";
import { TopBarStateContext } from "./context";

const Layout = ({ children }) => {
  const [topBarState, setTopBarState] = useState({
    pageName: "",
    buttons: [],
  });

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
