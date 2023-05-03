import styles from "../styles/autodetails.module.css";
import { useEffect } from "react";
import Image from "next/image";

function Autodetails() {
  function addDot(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  useEffect(() => {
    let getItem = localStorage.getItem("kenteken");
    let data = JSON.parse(getItem);

    document.querySelector(".autoimg").src = "/carlogos/" + data.merk.toLowerCase().replace(/ /g, "_") + ".png";

    document.querySelector(".kentekenplaat").innerHTML = data.kenteken;
    document.querySelector(".merk").innerHTML = data.merk;
    document.querySelector(".handelsbenaming").innerHTML = " " + data.handelsbenaming;
    document.querySelector(".kilometerstand").innerHTML = addDot(data.kilometerstand);
    document.querySelector(".brandstof").innerHTML = data.brandstof;

    let motorGrootte = data.cilinderinhoud;
    let afgerondMotor =
      motorGrootte % 1000 === 0
        ? motorGrootte / 1000 + ".0"
        : (motorGrootte / 1000).toFixed(1);
    document.querySelector(".motortype").innerHTML = afgerondMotor;

    document.querySelector(".bouwjaar").innerHTML =
      data.datum_eerste_toelating.substring(0, 4);

    if (data.laatst_onderhouds_datum === "Onbekend") {
      document.querySelector(".laatsteonderhoud").innerHTML = "Onbekend";
    } else {
      let datum = new Date(data.laatst_onderhouds_datum);
      let dag = datum.getDate().toString().padStart(2, "0");
      let maand = (datum.getMonth() + 1).toString().padStart(2, "0");
      let jaar = datum.getFullYear();

      let datumInDagMaandJaarFormaat = dag + "-" + maand + "-" + jaar;

      document.querySelector(".laatsteonderhoud").innerHTML =
        datumInDagMaandJaarFormaat;
    }
  }, []);

  return (
    <div className={styles.autodetails}>
      <div>
        <section>
          <img className='autoimg' />
          <p className='kentekenstyle kentekenplaat'></p>
          <h1>Jouw auto</h1>
        </section>
        <section>
          <h2>
            <span className='merk'></span>
            <span className='handelsbenaming'></span>
          </h2>
        </section>
        <section>
          <ul>
            <li>
              Kilometerstand: <span className='kilometerstand'></span>
            </li>
            <li>
              Motorinhoud: <span className='motortype'></span>
            </li>
            <li>
              Brandstof: <span className='brandstof'></span>
            </li>
            <li>
              Bouwjaar: <span className='bouwjaar'></span>
            </li>
            <li>
              Datum laatste onderhoud:{" "}
              <span className='laatsteonderhoud'></span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Autodetails;
