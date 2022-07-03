import React, { useContext } from "react";
import Logo from "../../public/Bristle_logo_with_name.jpg";
import styles from "./TopBar.module.css";
import Image from "next/image";
import TopBarButton from "./TopBarButton/TopBarButton.js";
import { IoMenuOutline } from "react-icons/io5";
// import MenuIcon from "@mui/icons-material/Menu";
// import AddIcon from "@mui/icons-material/Add";
// import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import CheckIcon from "@mui/icons-material/Check";

import { TopBarStateContext } from "../context.js";

// export const TopBarButtons = {
//   // This is a enum of buttons that are available to be placed in the right side of top bar
//   ADD: "ADD",
//   BACK: "BACK",
//   EDIT: "EDIT",
//   DELETE: "DELETE",
//   COPY: "COPY",
//   CHECK: "CheckIcon",
// };

// const constructButton = (buttonName) => {
//   switch (buttonName) {
//     case "ADD":
//       return <AddIcon />;
//     case "BACK":
//       return <KeyboardReturnIcon />;
//     case "EDIT":
//       return <EditIcon />;
//     case "DELETE":
//       return <DeleteIcon />;
//     case "COPY":
//       return <ContentCopyIcon />;
//     case "CHECK":
//       return <CheckIcon />;
//   }
// };

const TopBar = () => {
  const [topBarState, setTopBarState] = useContext(TopBarStateContext);
  return (
    <div className={styles.Container}>
      <TopBarButton>
        <IoMenuOutline />
      </TopBarButton>
      <Image layout="fixed" height="40px" width="190px" src={Logo}></Image>
      {topBarState.pageName}
      <div className={styles.RightButtonContainer}>
        {topBarState.buttons.map((buttonJson) => (
          <TopBarButton
            onClick={buttonJson.callback != null ? buttonJson.callback : null}
          >
            {buttonJson.icon}
          </TopBarButton>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
