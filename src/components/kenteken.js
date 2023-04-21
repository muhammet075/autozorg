import styles from "../styles/kenteken.module.css";
import { useEffect } from "react";

function Kenteken() {
  function firstButton() {
    document.querySelector(".container1").classList.add("displaynone");
    document.querySelector(".container2").classList.remove("displaynone");

    document.querySelector(".kentekenheaderh1").innerHTML =
      "Wat is het kenteken?";
  }

  function secondButton() {}

  return (
    <div>
      <div className={styles.kentekenheader}>
        <div>
          <h1 className='kentekenheaderh1'>
            fijn dat je gekozen hebt voor autozorg
          </h1>
        </div>
      </div>

      <div className={styles.container1 + " " + "container1"}>
        <div>
          <p>
            De app AutoZorg is ontworpen om bestuurders te helpen met weinig
            kennis en ervaring over auto onderhoud.
          </p>
          <p>
            We begrijpen dat het onderhouden van je auto best intimiderend kan
            zijn als je er weinig of geen ervaring mee hebt.
          </p>

          <p>
            Daarom hebben we een alles-in-één tool ontwikkeld om je te
            begeleiden en bijhouden van het onderhoud van je auto en je te
            informeren over de basisprincipes van auto-onderhoud.
          </p>

          <p>
            We willen je push berichten sturen om je te laten herinneren voor
            onderhoudsbeurten en APK keuringen.
          </p>
        </div>
        <button onClick={firstButton} className={styles.button}>
          Verder
        </button>
      </div>

      <div className={styles.container2 + " " + "container2 displaynone"}>
        <div>
          <section>
            <div>
              <p>NL</p>
            </div>
            <div>
              <input type='text' maxLength={6}></input>
            </div>
          </section>
        </div>
        <button onClick={secondButton} className={styles.button}>
          Kenteken zoeken
        </button>
      </div>
    </div>
  );
}

export default Kenteken;
