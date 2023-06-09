import styles from "../styles/apkcard.module.css";
import Link from "next/link";
import { useEffect } from "react";

function Apkcard() {
      
let apkDatum;

  useEffect(() => {

function getAPK() {

    let getItem = localStorage.getItem("kenteken");
    let data = JSON.parse(getItem);

  const apiAPK =
    "https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=" + data.kenteken;

  fetch(apiAPK)
    .then((response) => response.json())
    .then((jsondata) => {
    
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

      console.log(apkDatum);
      const remainingDays = daysRemaining(jsondata[0].vervaldatum_apk);
      document.querySelector(".apkdagen").innerHTML = remainingDays;

      if (remainingDays < 0) {
        document.querySelector(".apkverloopt").innerHTML =
          "De APK is verlopen van jouw auto! Je kan nu niet meer de weg op. Je mag alleen naar een garage rijden om een APK keuring te doen. Maak direct een afspraak.";
      } else {
        document.querySelector(".apkdagen2").innerHTML = remainingDays;
      }

      if (remainingDays < 60) {
        document.querySelector(".apkcontent").classList.add("displaynone");
        document.querySelector(".apkverloopt").classList.remove("displaynone");
        document.querySelector(".apklink").classList.remove("displaynone");
        document.querySelector(".apkgeldig").classList.add("ongeldigapk");
      } else {
        localStorage.removeItem("apkafspraak");
      }

      let getApkAfspraak = localStorage.getItem("apkafspraak");
      let apkAfspraakData = JSON.parse(getApkAfspraak);

      if (apkAfspraakData === null) {
        console.log("geen apk afspraak");
      } else {
        console.log(apkAfspraakData);
        console.log("wel apk afsrpaak");
        document
          .querySelector(".apkcardcontainer")
          .classList.add("displaynone");
        document
          .querySelector(".apkafspraakcontainer")
          .classList.remove("displaynone");

        document.querySelector(".apkafspraaknaam").innerHTML =
          apkAfspraakData.garagenaam;

        let datum = new Date(apkAfspraakData.datum);
        let dag = datum.getDate().toString().padStart(2, "0");
        let maand = (datum.getMonth() + 1).toString().padStart(2, "0");
        let jaar = datum.getFullYear();

        let datumInDagMaandJaarFormaat = dag + "-" + maand + "-" + jaar;

        document.querySelector(".apkafspraakdatum").innerHTML =
          datumInDagMaandJaarFormaat.datum + " " + apkAfspraakData.tijd;
        document.querySelector(".apkafspraakadres").innerHTML =
          apkAfspraakData.adres + "<br/>" + apkAfspraakData.postcode_plaats;
      }
    })
    .catch((error) => console.error(error));
}

getAPK();

  }, []);

  function apkAnnuleren(){
    localStorage.removeItem("apkafspraak");
    location.reload();
  }

  return (
    <>
      <div className={styles.apkcard + " " + "apkgeldig apkcardcontainer"}>
        <div>
          <h2>APK</h2>
          <p className='apkcontent'>
            De APK van jouw auto verloopt pas over{" "}
            <span className='apkdagen'></span> dagen.
          </p>

          <p className='displaynone apkverloopt'>
            De APK van jouw auto verloopt binnen{" "}
            <span className='apkdagen2'></span> dagen. Maak direct een afspraak
            zodat je weer veilig over de weg kan rijden.
          </p>
          <Link className='apklink displaynone' href='/apk'>
            Afspraak inplannen
          </Link>
        </div>
      </div>

      <div className={styles.apkafspraak + " apkafspraakcontainer displaynone"}>
        <div>
          <h2>APK Afspraak</h2>

          <p>
            <span className='apkafspraaknaam'></span>
          </p>
          <p>Datum en tijd:</p>
          <p>
            <span className='apkafspraakdatum'></span>
          </p>
          <p>Adres:</p>
          <p>
            <span className='apkafspraakadres'></span>
          </p>

          <p>Deze afspraak herrinering verdwijnt automatisch als de APK keuring is goedgekeurd door de RDW.</p>

          <button onClick={apkAnnuleren}>Afspraak annuleren</button>
        </div>
      </div>

      <div className={styles.pechhulp}>
        <div>
          <h2>Pechhulp</h2>
          <p>
            Start jouw auto niet meer of ben je misschien tegen een paaltje aan
            gereden? Schakel direct hulp in!
          </p>
          <Link href='/pechhulp'>Hulp inschakelen</Link>
        </div>
      </div>
    </>
  );
}

export default Apkcard;
