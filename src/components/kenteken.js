import styles from "../styles/kenteken.module.css";
import { useEffect } from "react";

function Kenteken() {
  function firstButton() {
    document.querySelector(".container1").classList.add("displaynone");
    document.querySelector(".container2").classList.remove("displaynone");

    document.querySelector(".kentekenheaderh1").innerHTML =
      "Wat is jouw kenteken?";
  }

  async function secondButton() {
    if (document.querySelector(".kentekeninput").value.length === 6) {
      const kenteken =
        "https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=" +
        document.querySelector(".kentekeninput").value.toUpperCase();

      const kentekenbrandstof =
        "https://opendata.rdw.nl/resource/8ys7-d773.json?kenteken=" +
        document.querySelector(".kentekeninput").value.toUpperCase();

      console.log(kenteken + kentekenbrandstof);

      const response = await fetch(kenteken);
      const jsondata = await response.json();

      const responsebrandstof = await fetch(kentekenbrandstof);
      const jsondatabrandstof = await responsebrandstof.json();

      console.log(jsondata[0]);

      try {
        const kentekendata = [
          {
            kenteken: jsondata[0].kenteken,
            handelsbenaming: jsondata[0].handelsbenaming,
            merk: jsondata[0].merk,
            apk: jsondata[0].vervaldatum_apk,
            brandstof: jsondatabrandstof[0].brandstof_omschrijving,
          },
        ];

        console.log(kentekendata[0]);

        document.querySelector(".container2").classList.add("displaynone");
        document.querySelector(".container3").classList.remove("displaynone");

        document.querySelector(".merknaam").innerHTML = kentekendata[0].merk;
        document.querySelector(".handelsnaam").innerHTML =
          kentekendata[0].handelsbenaming;
        document.querySelector(".kentekendata").innerHTML =
          kentekendata[0].kenteken;
      } catch (e) {
        console.log("error weer");
      }
    } else {
      console.log("Error state: Voer een geldige kenteken in");
    }
  }

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
              <input
                type='text'
                maxLength={6}
                className='kentekeninput'
              ></input>
            </div>
          </section>
        </div>
        <button onClick={secondButton} className={styles.button}>
          Kenteken zoeken
        </button>
      </div>

      <div className={styles.container3 + " " + "container3 displaynone"}>
        <div>
          <p>MERK IMG</p>
          <h2 className='merknaam'></h2>
          <h3 className='handelsnaam'></h3>
          <section>
            <p className='kentekendata'></p>
          </section>
          <p>Als dit de juiste auto is, klik dan op de onderstaande knop.</p>
        </div>
      </div>
    </div>
  );
}

export default Kenteken;
