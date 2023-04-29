import styles from "../styles/header.module.css";
import Image from "next/image";
import Logo from "../assets/img/logo.svg";
import SettingsIco from "../assets/icons/settings.svg";
import Link from "next/link";
import { useEffect } from "react";

function Header() {
    useEffect(() => {
      let getItem = localStorage.getItem("kenteken");
      let data = JSON.parse(getItem);
      console.log("header", data)
      if (data === null) {
        document.querySelector(".settingsbtn").classList.add("displaynone");
      }
    }, []);

  return (
    <header className={styles.header}>
      <div>
        <Link href='/dashboard'>
          <Image src={Logo} alt='Logo van AutoZorg' priority />
        </Link>

        <Link href="/instellingen" className={styles.settingsbtn + " settingsbtn"}><Image src={SettingsIco} alt="Instelling icoon"/></Link>
      </div>
    </header>
  );
}

export default Header;
