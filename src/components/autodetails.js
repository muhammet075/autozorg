import styles from "../styles/autodetails.module.css";
import { useEffect } from "react";
import Image from "next/image";

function Autodetails() {
  useEffect(() => {
    let getItem = localStorage.getItem("kenteken");
    let data = JSON.parse(getItem);

    console.log(data);

    document.querySelector(".autoimg").src =
      "/carlogos/" + data.merk.toLowerCase().replace(/ /g, "_") + ".png";

    document.querySelector(".kentekenplaat").innerHTML = data.kenteken;
    document.querySelector(".merk").innerHTML = data.merk;
    document.querySelector(".handelsbenaming").innerHTML =
      " " + data.handelsbenaming;
    document.querySelector(".kilometerstand").innerHTML = data.kilometerstand;
    document.querySelector(".brandstof").innerHTML = data.brandstof;
    document.querySelector(".motortype").innerHTML = parseFloat(
      (data.cilinderinhoud / 1000).toFixed(1)
    );
    document.querySelector(".bouwjaar").innerHTML =
      data.datum_eerste_toelating.substring(0, 4);

    document.querySelector(".laatsteonderhoud").innerHTML =
      data.laatst_onderhouds_datum;
  }, []);

  return (
    <div className={styles.autodetails}>
      <div>
        <section>
          <img className='autoimg' />
          <h1>Jouw auto</h1>
        </section>
        <section>
          <h2>
            <span className='merk'></span>
            <span className='handelsbenaming'></span>
          </h2>
          <p className='kentekenstyle kentekenplaat'></p>
        </section>
        <section>
          <ul>
            <li>
              Kilometerstand: <span className='kilometerstand'></span>
            </li>
            <li>
              Motor type: <span className='motortype'></span>
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
