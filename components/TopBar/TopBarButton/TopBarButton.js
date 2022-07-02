import styles from "./TopBarButton.module.css";

// should pass an image icon as children
const TopBarButton = ({ children }) => {
  return <div className={styles.Container}>{children}</div>;
};

export default TopBarButton;
