import styles from "./TopBarButton.module.css";

// should pass an image icon as children
const TopBarButton = (props) => {
  return (
    <div
      {...props}
      onClick={props.onClick}
      className={props.isRound ? styles.Container_Round : styles.Container}
    >
      {props.children}
    </div>
  );
};

export default TopBarButton;
