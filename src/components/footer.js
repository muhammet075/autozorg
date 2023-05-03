import styles from "../styles/footer.module.css";
import Link from "next/link";
import Image from "next/image";
import SettingsIco from "../assets/icons/settings.svg";
import HomeIco from "../assets/icons/home.svg";
import PechhulpIco from "../assets/icons/pechhulp.svg";
import CalendarIco from "../assets/icons/calendar.svg";

function Footer() {

  return (
    <footer className={styles.footer}>
      <Link href='/pechhulp'>
        <div>
          <Image src={PechhulpIco} alt='Pechhulp Icoon' />
          <p>Pechhulp</p>
        </div>
      </Link>

      <Link href='/dashboard'>
        <div>
          <Image src={HomeIco} alt='Home Icoon' />
          <p>Home</p>
        </div>
      </Link>

      <Link href='/afspraken'>
        <div>
          <Image src={CalendarIco} alt='Afspraken Icoon' />
          <p>Afspraken</p>
        </div>
      </Link>

      <Link href='/instellingen'>
        <div>
          <Image src={SettingsIco} alt='Instellingen Icoon' />
          <p>Instellingen</p>
        </div>
      </Link>
    </footer>
  );
}

export default Footer;
