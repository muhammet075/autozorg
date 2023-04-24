import styles from "../styles/kenteken.module.css";
import Image from "next/image";
import deleteIco from "../assets/icons/delete.svg";
import backIco from "../assets/icons/back.svg";
import { useEffect } from "react";

function Kenteken() {
  let kentekendata;
  let laatsteKmStand;
  let laatsteSoortOnderhoud;
  let laatsteSoortOnderhoudDatum;

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
        kentekendata = {
          kenteken: jsondata[0].kenteken,
          handelsbenaming: jsondata[0].handelsbenaming,
          merk: jsondata[0].merk,
          apk_datum: jsondata[0].vervaldatum_apk,
          brandstof: jsondatabrandstof[0].brandstof_omschrijving,
        };

        // localStorage.setItem("kenteken", JSON.stringify(kentekendata[0]));

        // let getItem = localStorage.getItem("kenteken");
        // console.log(JSON.parse(getItem));

        document.querySelector(".container2").classList.add("displaynone");
        document.querySelector(".container3").classList.remove("displaynone");

        document.querySelector(".merklogo").src =
          "/carlogos/" + kentekendata.merk.toLowerCase() + ".png";

        document.querySelector(".merknaam").innerHTML = kentekendata.merk;
        document.querySelector(".handelsnaam").innerHTML =
          kentekendata.handelsbenaming;
        document.querySelector(".kentekendata").innerHTML =
          kentekendata.kenteken;
      } catch (e) {
        document
          .querySelector(".firstkentekeninput")
          .classList.add("kentekeninputerror");
      }
    } else {
      document
        .querySelector(".firstkentekeninput")
        .classList.add("kentekeninputerror");
    }
  }

  function thirdButton() {
    document.querySelector(".container3").classList.add("displaynone");
    document.querySelector(".container4").classList.remove("displaynone");

    document.querySelector(".kentekenheaderh1").innerHTML =
      kentekendata.kenteken;
    document.querySelector(".kentekenheaderh1").classList.add("kentekenstyle");

    console.log(kentekendata);

    document
      .querySelector(".huidigekmsection")
      .classList.remove("huidigekmsectionerror");
  }

  function fourthButton() {
    if (document.querySelector(".huidigeKilometerstand").value === "") {
      console.log("bos");

      document
        .querySelector(".huidigekmsection")
        .classList.add("huidigekmsectionerror");
    } else {
      document.querySelector(".container4").classList.add("displaynone");
      document.querySelector(".container5").classList.remove("displaynone");

      console.log(document.querySelector(".huidigeKilometerstand").value);

      let kmstand = document.querySelector(".huidigeKilometerstand").value;

      JSON.parse(kmstand);

      kentekendata["kilometerstand"] = kmstand;

      console.log(kentekendata);
    }
  }

  function laatsteOnderhoudOnbekend() {
    document.querySelector(".container5").classList.add("displaynone");
    document
      .querySelector(".onderhoudonbekend")
      .classList.remove("displaynone");

    let kmstand = document.querySelector(".huidigeKilometerstand").value;
    kentekendata["onderhoud_bij_aantal_km"] = kmstand;
    kentekendata["eerst_volgende_onderhoud"] = "Grote beurt";
  }

  function onderhoudOnbekendButton() {
    localStorage.setItem("kenteken", JSON.stringify(kentekendata));
    let getItem = localStorage.getItem("kenteken");

    console.log(JSON.parse(getItem));
    window.location = "/dashboard";
  }

  function laatsteOnderhoudBekend() {
    document.querySelector(".container5").classList.add("displaynone");
    document.querySelector(".onderhoudbekend").classList.remove("displaynone");
  }

  function onderhoudbekend() {
    if (
      document.querySelector(".kmstandonderhoud").value === "" &&
      document.querySelector('input[name="onderhoudsradio"]:checked') == null
    ) {
      console.log("allebei niet!");

      document
        .querySelector(".kmstandonderhoudsection")
        .classList.add("errorstate");
      document.querySelector(".radiossection").classList.add("errorstate");
    } else if (document.querySelector(".kmstandonderhoud").value === "") {
      console.log("alleen km stand leeg");

      document
        .querySelector(".kmstandonderhoudsection")
        .classList.add("errorstate");
    } else if (
      document.querySelector('input[name="onderhoudsradio"]:checked') == null
    ) {
      console.log("alleen radio niet aangevingt");

      document.querySelector(".radiossection").classList.add("errorstate");
    } else {
      if (
        document.querySelector(".kmstandonderhoud").value >
        document.querySelector(".huidigeKilometerstand").value
      ) {
        console.log(
          "laatste onderhoud km kan niet groter zijn dan huidige kmstand"
        );

        document
          .querySelector(".kmstandonderhoudsection")
          .classList.add("kmstandgrotererror");
      } else {
        document.querySelector(".onderhoudbekend").classList.add("displaynone");
        document
          .querySelector(".datumcontainer")
          .classList.remove("displaynone");

        laatsteKmStand = document.querySelector(".kmstandonderhoud").value;
        laatsteSoortOnderhoud = document.querySelector(
          'input[name="onderhoudsradio"]:checked'
        ).value;
      }
    }
  }

  function onderhoudBekendAfronden() {
    if (document.querySelector(".onderhoudsdatum").value === "") {
      console.log("error");

      document
        .querySelector(".datumcontainerinner")
        .classList.add("errorstate");
    } else {
      laatsteSoortOnderhoudDatum =
        document.querySelector(".onderhoudsdatum").value;

      console.log(
        laatsteSoortOnderhoudDatum + laatsteKmStand + laatsteSoortOnderhoud
      );

      let kmstand = document.querySelector(".huidigeKilometerstand").value;

      if (laatsteSoortOnderhoud === "kleinebeurt") {
        kentekendata["eerst_volgende_onderhoud"] = "grotebeurt";
      } else {
        kentekendata["eerst_volgende_onderhoud"] = "kleinebeurt";
      }

      const huidigeMinonderhoud = Number(kmstand) - Number(laatsteKmStand);
      const overHoeveelKm = huidigeMinonderhoud - 20000;

      kentekendata["onderhoud_bij_aantal_km"] = Number(kmstand) - overHoeveelKm;

      localStorage.setItem("kenteken", JSON.stringify(kentekendata));
      let getItem = localStorage.getItem("kenteken");

      console.log(JSON.parse(getItem));
      window.location = "/dashboard";
    }
  }

  function deleteKenteken() {
    document.querySelector(".container1").classList.add("displaynone");
    document.querySelector(".container3").classList.add("displaynone");
    document.querySelector(".container4").classList.add("displaynone");
    document.querySelector(".container5").classList.add("displaynone");
    document.querySelector(".container2").classList.remove("displaynone");

    document.querySelector(".kentekenheaderh1").innerHTML =
      "Wat is jouw kenteken?";
    document
      .querySelector(".kentekenheaderh1")
      .classList.remove("kentekenstyle");

    document.querySelector(".kentekeninput").value = "";
  }

  function firstBack() {
    document.querySelector(".container1").classList.remove("displaynone");
    document.querySelector(".container2").classList.add("displaynone");
  }

  function secondBack() {
    document.querySelector(".container2").classList.remove("displaynone");
    document.querySelector(".container3").classList.add("displaynone");
    document.querySelector(".kentekeninput").value = "";
  }

  function thirdBack() {
    document.querySelector(".container3").classList.remove("displaynone");
    document.querySelector(".container4").classList.add("displaynone");

    document.querySelector(".kentekenheaderh1").innerHTML =
      "Wat is jouw kenteken?";
    document
      .querySelector(".kentekenheaderh1")
      .classList.remove("kentekenstyle");
  }

  function fourthBack() {
    document.querySelector(".container4").classList.remove("displaynone");
    document.querySelector(".container5").classList.add("displaynone");
  }

  function fifthBack() {
    document.querySelector(".container5").classList.remove("displaynone");
    document.querySelector(".onderhoudbekend").classList.add("displaynone");
    document
      .querySelector(".kmstandonderhoudsection")
      .classList.remove("errorstate");
    document.querySelector(".radiossection").classList.remove("errorstate");
    document
      .querySelector(".kmstandonderhoudsection")
      .classList.remove("kmstandgrotererror");

    document.querySelector(".kmstandonderhoud").value = "";
  }

  function sixtBack() {
    document.querySelector(".onderhoudbekend").classList.remove("displaynone");
    document.querySelector(".datumcontainer").classList.add("displaynone");
    document
      .querySelector(".datumcontainerinner")
      .classList.remove("errorstate");
  }

  function seventhBack() {
    document.querySelector(".container5").classList.remove("displaynone");
    document.querySelector(".onderhoudonbekend").classList.add("displaynone");
  }

  function removeKentekeninputError() {
    document
      .querySelector(".firstkentekeninput")
      .classList.remove("kentekeninputerror");
  }

  function removeHuidigekmError() {
    document
      .querySelector(".huidigekmsection")
      .classList.remove("huidigekmsectionerror");
  }

  function removeKmstandOnderhoudError() {
    document
      .querySelector(".kmstandonderhoudsection")
      .classList.remove("errorstate");
    document.querySelector(".radiossection").classList.remove("errorstate");
    document
      .querySelector(".kmstandonderhoudsection")
      .classList.remove("kmstandgrotererror");
  }

  function removeDateError() {
    document
      .querySelector(".datumcontainerinner")
      .classList.remove("errorstate");
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
        <button className='backbutton' onClick={firstBack}>
          <Image src={backIco} alt='Terug icoon' />
        </button>
        <div>
          <section className='firstkentekeninput'>
            <div>
              <p>NL</p>
            </div>
            <div>
              <input
                type='text'
                maxLength={6}
                className='kentekeninput'
                onClick={removeKentekeninputError}
              ></input>
            </div>
          </section>
        </div>
        <button onClick={secondButton} className={styles.button}>
          Kenteken zoeken
        </button>
      </div>

      <div className={styles.container3 + " " + "container3 displaynone"}>
        <button className='backbutton' onClick={secondBack}>
          <Image src={backIco} alt='Terug icoon' />
        </button>
        <div>
          <img className='merklogo' alt='Logo van de automerk' />
          <h2 className='merknaam'></h2>
          <h3 className='handelsnaam'></h3>
          <section>
            <p className='kentekendata kentekenstyle'></p>
            <button onClick={deleteKenteken}>
              <Image src={deleteIco} />
            </button>
          </section>
          <p>
            Als dit jouw auto is, klik dan op de onderstaande knop om verder te
            gaan.
          </p>
        </div>
        <button onClick={thirdButton} className={styles.button}>
          Kenteken toevoegen
        </button>
      </div>

      <div className={styles.container4 + " " + "container4 displaynone"}>
        <button className='backbutton' onClick={thirdBack}>
          <Image src={backIco} alt='Terug icoon' />
        </button>
        <div>
          <p>Wat is de huidige kilometerstand?</p>
          <section className='huidigekmsection'>
            <input
              type='number'
              placeholder='Bijv: 125.000'
              className='huidigeKilometerstand graytextinput'
              maxlength='6'
              id='huidigeKilometerstand'
              onClick={removeHuidigekmError}
            ></input>
            <label for='huidigeKilometerstand'>KM</label>
          </section>
        </div>
        <button onClick={fourthButton} className={styles.button}>
          Volgende
        </button>
      </div>

      <div className={styles.container5 + " " + "container5 displaynone"}>
        <button className='backbutton' onClick={fourthBack}>
          <Image src={backIco} alt='Terug icoon' />
        </button>
        <div>
          <p>
            Weet je wanneer de laatst uitgevoerde onderhoudsbeurt is uitgevoerd?
          </p>
        </div>
        <section>
          <button
            onClick={laatsteOnderhoudBekend}
            className={styles.onderhoudknop}
          >
            Ja
          </button>
          <button
            onClick={laatsteOnderhoudOnbekend}
            className={styles.onderhoudknop}
          >
            Nee
          </button>
        </section>
      </div>

      <div
        className={styles.onderhoudbekend + " " + "onderhoudbekend displaynone"}
      >
        <button className='backbutton' onClick={fifthBack}>
          <Image src={backIco} alt='Terug icoon' />
        </button>
        <div>
          <p>Wat was de kilometerstand van de laatste onderhoudsbeurt?</p>
          <section className='kmstandonderhoudsection'>
            <input
              type='number'
              className='kmstandonderhoud graytextinput'
              id='kmstandonderhoud'
              maxlength='6'
              placeholder='Bijv: 80.000'
              onClick={removeKmstandOnderhoudError}
            ></input>
            <label for='kmstandonderhoud'>KM</label>
          </section>

          <br />

          <p>Was het een grote of kleine onderhoudsbeurt?</p>

          <section className='radiossection'>
            <span>
              <input
                type='radio'
                id='kleinebeurtradio'
                name='onderhoudsradio'
                value='kleinebeurt'
              />
              <label for='kleinebeurtradio'>Klein</label>
            </span>

            <span>
              <input
                type='radio'
                id='grotebeurtradio'
                name='onderhoudsradio'
                value='grotebeurt'
              />
              <label for='grotebeurtradio'>Groot</label>
            </span>
          </section>
        </div>
        <button onClick={onderhoudbekend} className={styles.button}>
          Volgende
        </button>
      </div>

      <div
        className={styles.datumcontainer + " " + "datumcontainer displaynone"}
      >
        <button className='backbutton' onClick={sixtBack}>
          <Image src={backIco} alt='Terug icoon' />
        </button>
        <div className='datumcontainerinner'>
          <p>Wat was de datum van de laatst uitgevoerd beurt?</p>
          <input
            type='date'
            className='onderhoudsdatum graytextinput'
            onClick={removeDateError}
          ></input>
          <br />
        </div>
        <button onClick={onderhoudBekendAfronden} className={styles.button}>
          Afronden
        </button>
      </div>

      <div
        className={
          styles.onderhoudonbekend + " " + "onderhoudonbekend displaynone"
        }
      >
        <button className='backbutton' onClick={seventhBack}>
          <Image src={backIco} alt='Terug icoon' />
        </button>
        <div>
          <p>
            Omdat je de laatst uitgevoerde onderhoudsbeurt niet weet adviseren
            wij jou nu om zo snel mogelijk een grote onderhoudsbeurt te laten
            uitvoeren, door een garage die je gemakkelijk kan vinden door deze
            app.
          </p>

          <p>
            Hierdoor voorkom jij schade en slijtage aan je motor en dat kan dure
            reparaties kosten.
          </p>

          <p>
            Na jouw onderhoudsbeurt is deze app overzichtelijker en gereed voor
            gebruik!
          </p>
        </div>
        <button onClick={onderhoudOnbekendButton} className={styles.button}>
          Afronden
        </button>
      </div>
    </div>
  );
}

export default Kenteken;
