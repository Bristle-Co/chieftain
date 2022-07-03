import styles from "./TopBarButton.module.css";

// should pass an image icon as children
const TopBarButton = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className={styles.Container}>
      {children}
    </div>
  );
};

export default TopBarButton;
