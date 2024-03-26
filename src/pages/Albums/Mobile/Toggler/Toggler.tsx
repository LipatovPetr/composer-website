import styles from "./Toggler.module.css";
import piecesSrc from "../../../../assets/images/pieces-f20w6.svg";
import workSrc from "../../../../assets/images/work-f20w6.svg";
// import cn from "classnames";

function Toggler() {
  return (
    <div className={styles.togglerContainer}>
      <div className={styles.toggler}>
        {/* <p className={cn(styles.text, styles.text__left)}>PIECES</p> */}
        <img className={styles.pieces} src={piecesSrc} alt="pieces-link" />

        <div className={styles.divider} />

        <img className={styles.work} src={workSrc} alt="work-link" />

        {/* <p className={styles.text}>WORK</p> */}
      </div>
    </div>
  );
}

export default Toggler;
