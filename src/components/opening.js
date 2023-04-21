import styles from "../styles/opening.module.css";
import Image from "next/image";
import Logo from "../assets/img/logo-text.svg";

function Opening() {
  return (
    <div className={styles.opening}>
      <Image src={Logo} alt='Logo van AutoZorg' priority />

      <div className={styles.spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Opening;
