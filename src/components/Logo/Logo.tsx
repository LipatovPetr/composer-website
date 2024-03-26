import s from "./Logo.module.css";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className={s.titleContainer}>
      <div className={s.name}>Liza Tikhonova</div>
      <div className={s.job}>composer</div>
    </Link>
  );
}
