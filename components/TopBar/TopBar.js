import React, { useContext, useState } from "react";
import Logo from "../../public/Bristle_logo_with_name.jpg";
import styles from "./TopBar.module.css";
import Image from "next/image";
import Link from "next/link";
import SideMenuNavigation from "../Navigation.js";
import TopBarButton from "./TopBarButton/TopBarButton.js";
import { IoMenuOutline } from "react-icons/io5";
import { TopBarStateContext } from "../context.js";
import { IconContext } from "react-icons";

const TopBar = () => {
  const [isSideMenuActive, setIsSideMenuActive] = useState(false);

  const [topBarState, setTopBarState] = useContext(TopBarStateContext);
  const toggleSideMenu = () => {
    setIsSideMenuActive(!isSideMenuActive);
  };
  return (
    <>
      <div className={styles.TopBarContainer}>
        <IconContext.Provider
          value={{ color: "#957B5F", height: "100%", width: "100%" }}
        >
          <TopBarButton onClick={toggleSideMenu}>
            <IoMenuOutline />
          </TopBarButton>
          <Image
            layout="fixed"
            height="40px"
            width="190px"
            className="selectDisable"
            src={Logo}
          ></Image>
          <span className={styles.PageTitle}>{topBarState.pageName}</span>
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
      <nav
        className={isSideMenuActive ? styles.SideMenuActive : styles.SideMenu}
      >
        <ul className={styles.SideMenuList}>
          {SideMenuNavigation.map((item, index) => {
            return (
              <li key={index}>
                <Link href={item.path}>
                  <div
                    onClick={toggleSideMenu}
                    className = {styles.NavigationItemContainer}
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
    </>
  );
};

export default TopBar;
