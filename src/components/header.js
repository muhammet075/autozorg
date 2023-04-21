import styles from "../styles/header.module.css";
import Image from "next/image";
import Logo from "../assets/img/logo.svg";
import Link from "next/link";

function Header() {
  return (
    <header className={styles.header}>
      <div>
        <Link href='/'>
          <Image src={Logo} alt='Logo of Tickety' priority />
        </Link>
      </div>
    </header>
  );
}

export default Header;
