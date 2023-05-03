import { useEffect } from "react";
import styles from "../styles/footer.module.css";
import Link from "next/link";
import Image from "next/image";
import SettingsIco from "../assets/icons/settings.svg";
import HomeIco from "../assets/icons/home.svg";
import PechhulpIco from "../assets/icons/pechhulp.svg";
import CalendarIco from "../assets/icons/calendar.svg";

function Footer() {

  useEffect(() => {
  
const service = localStorage.getItem("serviceafspraak");
const apk = localStorage.getItem("apkafspraak");
const onderhoud = localStorage.getItem("onderhoudafspraak");

if (service && apk && onderhoud) {
  console.log("Er zijn afspraken gemaakt voor service, APK en onderhoud.");
  document.querySelector(".aantalafspraken").classList.remove("displaynone");
  document.querySelector(".aantalafspraken").innerHTML = "3";
} else if (service && apk) {
  console.log("Er zijn afspraken gemaakt voor service en APK.");
  document.querySelector(".aantalafspraken").classList.remove("displaynone");
  document.querySelector(".aantalafspraken").innerHTML = "2";
} else if (service && onderhoud) {
  console.log("Er zijn afspraken gemaakt voor service en onderhoud.");
  document.querySelector(".aantalafspraken").classList.remove("displaynone");
  document.querySelector(".aantalafspraken").innerHTML = "2";
} else if (apk && onderhoud) {
  console.log("Er zijn afspraken gemaakt voor APK en onderhoud.");
  document.querySelector(".aantalafspraken").classList.remove("displaynone");
  document.querySelector(".aantalafspraken").innerHTML = "2";
} else if (service) {
  console.log("Er is een afspraak gemaakt voor alleen service.");
  document.querySelector(".aantalafspraken").classList.remove("displaynone");
  document.querySelector(".aantalafspraken").innerHTML = "1";
} else if (apk) {
  console.log("Er is een afspraak gemaakt voor alleen APK.");
  document.querySelector(".aantalafspraken").classList.remove("displaynone");
  document.querySelector(".aantalafspraken").innerHTML = "1";
} else if (onderhoud) {
  console.log("Er is een afspraak gemaakt voor alleen onderhoud.");
  document.querySelector(".aantalafspraken").classList.remove("displaynone");
  document.querySelector(".aantalafspraken").innerHTML = "1";
} else {
  console.log("Er zijn geen afspraken gevonden.");
  document.querySelector(".aantalafspraken").innerHTML = "0";
  document.querySelector(".aantalafspraken").classList.add("displaynone")
}
  
  }, []);

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
          <span className='aantalafspraken'></span>
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
