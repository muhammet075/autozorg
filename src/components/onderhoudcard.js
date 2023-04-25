import styles from "../styles/onderhoudcard.module.css";
import Link from "next/link";
import { useEffect } from "react";

function Onderhoudcard() {
  function addDot(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  useEffect(() => {
    let getItem = localStorage.getItem("kenteken");
    let data = JSON.parse(getItem);

    document.querySelector(".onderhoudh2").innerHTML =
      data.eerst_volgende_onderhoud;

    document.querySelector(".kmstand").innerHTML =
      addDot(data.onderhoud_bij_aantal_km) + " KM";

    const kilometerstand = Number(data.kilometerstand);
    const onderhoudkm = Number(data.onderhoud_bij_aantal_km);

    console.log(data);

    if (kilometerstand === onderhoudkm) {
      document.querySelector(".onderhoudscard").classList.add("onderhoudnodig");
      document
        .querySelector(".onderhoudscard")
        .classList.remove("onderhoudgeldig");

      document.querySelector(".onderhoudscontent").innerHTML =
        "Maak direct een onderhoudsbeurt afspraak.";

      document.querySelector(".kmstand").classList.add("displaynone");
      document.querySelector(".afspraakbtn").innerHTML = "Afspraak inplannen";
    }
  }, []);

  return (
    <>
      <div
        className={
          styles.onderhoudcard + " " + "onderhoudscard onderhoudgeldig"
        }
      >
        <div>
          <h2 className='onderhoudh2'></h2>
          <p className='onderhoudscontent'>
            Staat of is de kilometerstand voor bij de:
          </p>
          <p className={styles.kmstand + " kmstand"}></p>
          <Link href='/onderhoud' className='afspraakbtn'>
            Ja
          </Link>
        </div>
      </div>
    </>
  );
}

export default Onderhoudcard;
