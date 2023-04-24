import styles from "../styles/apk.module.css";
import Link from "next/link";
import { useEffect } from "react";

function Apk() {
  useEffect(() => {
    let getItem = localStorage.getItem("kenteken");
    let data = JSON.parse(getItem);

    console.log(data.apk_datum);

    function daysRemaining(dateString) {
      const year = dateString.slice(0, 4);
      const month = dateString.slice(4, 6);
      const day = dateString.slice(6, 8);
      const targetDate = new Date(`${year}-${month}-${day}`).getTime();
      const now = new Date().getTime();
      const distance = targetDate - now;
      const days = Math.ceil(distance / (1000 * 60 * 60 * 24));
      return days;
    }

    // Voorbeeldgebruik:
    const remainingDays = daysRemaining(data.apk_datum);
    console.log(`${remainingDays} dagen over`);
    document.querySelector(".apkdagen").innerHTML = remainingDays;
    document.querySelector(".apkdagen2").innerHTML = remainingDays;

    if (remainingDays < 30) {
      document.querySelector(".apkcontent").classList.add("displaynone");
      document.querySelector(".apkverloopt").classList.remove("displaynone");
      document.querySelector(".apklink").classList.remove("displaynone");
      document.querySelector(".apkgeldig").classList.add("ongeldigapk");
    }
  }, []);

  return (
    <div className={styles.apk + " " + "apkgeldig"}>
      <div>
        <h2>APK</h2>
        <p className='apkcontent'>
          De APK van jouw auto verloopt pas over{" "}
          <span className='apkdagen'></span> dagen.
        </p>

        <p className='displaynone apkverloopt'>
          De APK van jouw auto verloopt binnen{" "}
          <span className='apkdagen2'></span> dagen. Maak direct een afspraak!
        </p>
        <Link className='apklink displaynone' href='/apk'>
          Afspraak inplannen
        </Link>
      </div>
    </div>
  );
}

export default Apk;
