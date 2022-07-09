import React, { useContext, useState } from "react";
import Logo from "../../public/Bristle_logo_with_name.jpg";
import styles from "./TopBar.module.css";
import Image from "next/image";
import Link from "next/link";
import SideMenuNavigation from "./Navigation.js";
import TopBarButton from "./TopBarButton/TopBarButton.js";
import { IoMenuOutline } from "react-icons/io5";
import { TopBarStateContext } from "../context.js";
import { IconContext } from "react-icons";

const TopBar = () => {
  const [sideMenuState, setSideMenuState] = useState(false);

  const [topBarState, setTopBarState] = useContext(TopBarStateContext);
  return (
    <>
      <div className={styles.TopBarContainer}>
        <IconContext.Provider
          value={{ color: "#957B5F", height: "100%", width: "100%" }}
        >
          <TopBarButton onClick={() => setSideMenuState(!sideMenuState)}>
            <IoMenuOutline />
          </TopBarButton>
          <Image
            layout="fixed"
            height="40px"
            width="190px"
            className="selectDisable"
            src={Logo}
          ></Image>
          {topBarState.pageName}
          <div className={styles.RightButtonContainer}>
            {topBarState.buttons.map((buttonJson) => (
              <TopBarButton
                onClick={
                  buttonJson.callback != null ? buttonJson.callback : null
                }
              >
                {buttonJson.icon}
              </TopBarButton>
            ))}
          </div>
        </IconContext.Provider>
      </div>
      <nav className={sideMenuState ? styles.SideMenuActive : styles.SideMenu}>
        <ul className={styles.SideMenuList}>
          {SideMenuNavigation.map((item, index) => {
            return (
              <li key={index}>
                <Link href={item.path}>
                  <div
                    onClick={() => setSideMenuState(!sideMenuState)}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <span>{item.title}</span>
                    <div className={styles.Dividor} />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className={sideMenuState ? styles.MenuShieldActive : styles.MenuShield}
        onClick={() => setSideMenuState(!sideMenuState)}
      >
        testing andy
      </div>
    </>
  );
};

export default TopBar;
