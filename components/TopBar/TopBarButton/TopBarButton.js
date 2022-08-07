import styles from "./TopBarButton.module.css";

// should pass an image icon as children
const TopBarButton = (props) => {
  return (
    <button
      {...props}
      onClick={props.onClick}
      className={props.isRound ? styles.Container_Round : styles.Container}
    >
      {props.children}
    </button>
  );
};

export default TopBarButton;
