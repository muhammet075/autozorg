import styles from "../styles/kenteken.module.css";
import Image from "next/image";
import deleteIco from "../assets/icons/delete.png";
import backIco from "../assets/icons/back.svg";
import { useEffect } from "react";

function Kenteken() {
  useEffect(() => {

    document.querySelector("footer").classList.add("displaynone");
    document.querySelector("#__next").classList.add("fullheight");

    let getItem = localStorage.getItem("kenteken");
    let data = JSON.parse(getItem);
    if (data != null) {
      window.location = "/dashboard";
    }  
    document.querySelector("body").classList.add("disablescrolling");

  }, []);

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
          cilinderinhoud: jsondata[0].cilinderinhoud,
          datum_eerste_toelating: jsondata[0].datum_eerste_toelating,
          wa_verzekerd: jsondata[0].wam_verzekerd,
          apk_datum: jsondata[0].vervaldatum_apk,
          brandstof: jsondatabrandstof[0].brandstof_omschrijving,
        };

        document.querySelector(".container2").classList.add("displaynone");
        document.querySelector(".container3").classList.remove("displaynone");

        document.querySelector(".merklogo").src =
          "/carlogos/" +
          kentekendata.merk.toLowerCase().replace(/ /g, "_") +
          ".png";

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

  function formatNumber(){
    let input = document.querySelector("#huidigeKilometerstand");
    let kmStand = input.value.replace(/[^\d]/g, ""); // verwijder alle niet-numerieke tekens uit de invoer
    if (kmStand.length > 3) {
      kmStand = kmStand.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // voeg een punt toe na elke groep van drie cijfers, beginnend bij de meest linkse groep van cijfers
    }
    input.value = kmStand; // plaats de geformatteerde kilometerstand terug in het invoerveld
  }


  function formatNumber2() {
    let input = document.querySelector("#kmstandonderhoud");
    let kmStand = input.value.replace(/[^\d]/g, ""); // verwijder alle niet-numerieke tekens uit de invoer
    if (kmStand.length > 3) {
      kmStand = kmStand.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // voeg een punt toe na elke groep van drie cijfers, beginnend bij de meest linkse groep van cijfers
    }
    input.value = kmStand; // plaats de geformatteerde kilometerstand terug in het invoerveld
  }


  function fourthButton() {
    if (document.querySelector(".huidigeKilometerstand").value === "") {
      document
        .querySelector(".huidigekmsection")
        .classList.add("huidigekmsectionerror");
    } else {
      document.querySelector(".container4").classList.add("displaynone");
      document.querySelector(".container5").classList.remove("displaynone");

      let kmStandVoorlopig = document.querySelector(".huidigeKilometerstand").value
      kmStandVoorlopig = Number(kmStandVoorlopig.replace(/\./g, ""));
      let kmstand = kmStandVoorlopig;

      console.log("kmStandVoorlopig", kmstand);

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

      let kmStandVoorlopig = document.querySelector(".huidigeKilometerstand").value
      kmStandVoorlopig = Number(kmStandVoorlopig.replace(/\./g, ""));
      let kmstand = kmStandVoorlopig;

    if (kmstand < 15000){
    kentekendata["onderhoud_bij_aantal_km"] = 15000;
    kentekendata["eerst_volgende_onderhoud"] = "Kleine onderhoudsbeurt";
    } else {
    kentekendata["onderhoud_bij_aantal_km"] = kmstand;
    kentekendata["eerst_volgende_onderhoud"] = "Grote onderhoudsbeurt";
    }
  }

  function onderhoudOnbekendButton() {
    kentekendata["laatst_onderhouds_datum"] = "Onbekend";

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


      let kmStandVoorlopig = document.querySelector(".huidigeKilometerstand").value;
      kmStandVoorlopig = Number(kmStandVoorlopig.replace(/\./g, ""));
      let kmstandonderhoud = kmStandVoorlopig;

      let kmStandVoorlopig2 = document.querySelector(".kmstandonderhoud").value;
      kmStandVoorlopig2 = Number(kmStandVoorlopig2.replace(/\./g, ""));
      let huidigeKilometerstand = kmStandVoorlopig2;


      if (huidigeKilometerstand > kmstandonderhoud) {
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

        laatsteSoortOnderhoud = document.querySelector(
          'input[name="onderhoudsradio"]:checked'
        ).value;
      }
    }
  }

  function onderhoudBekendAfronden() {
    let kmStandVoorlopig2 = document.querySelector(".kmstandonderhoud").value;
    kmStandVoorlopig2 = Number(kmStandVoorlopig2.replace(/\./g, ""));
    let laatsteKmStand = kmStandVoorlopig2;

    if (document.querySelector(".onderhoudsdatum").value === "") {
      console.log("error");

      document
        .querySelector(".datumcontainerinner")
        .classList.add("errorstate");
    } else {
      laatsteSoortOnderhoudDatum =
        document.querySelector(".onderhoudsdatum").value;

      kentekendata["laatst_onderhouds_datum"] =
        document.querySelector(".onderhoudsdatum").value;

      console.log(
        laatsteSoortOnderhoudDatum + laatsteKmStand + laatsteSoortOnderhoud
      );

      let kmStandVoorlopig = document.querySelector(".huidigeKilometerstand").value;
      kmStandVoorlopig = Number(kmStandVoorlopig.replace(/\./g, ""));
      let kmstand = kmStandVoorlopig;

      if (laatsteSoortOnderhoud === "kleinebeurt") {
        kentekendata["eerst_volgende_onderhoud"] = "Grote onderhoudsbeurt";
      } else {
        kentekendata["eerst_volgende_onderhoud"] = "Kleine onderhoudsbeurt";
      }

      const tussenOnderhoud = 15000;

      const verschilKm = Number(kmstand) - Number(laatsteKmStand);

      if (verschilKm < tussenOnderhoud) {
        console.log("minder dan 20000");

        kentekendata["onderhoud_bij_aantal_km"] =
          laatsteKmStand + tussenOnderhoud;

        // kentekendata["onderhoud_nu_nodig"] = "nee";
      } else {
        console.log("meer dan 20000");

        kentekendata["onderhoud_bij_aantal_km"] = Number(kmstand);
        // kentekendata["onderhoud_nu_nodig"] = "ja";
      }

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

    document.querySelector(".huidigeKilometerstand").value = "";
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

  function cleanInput(event) {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[-_=.,;:'\/\\[\]{}\s]/g, "");
    event.target.value = sanitizedValue;
  }

  function firstInfo(){
    alert("Vul de kenteken plaat in van jouw eigen auto. De gegevens zullen worden opgevraagd bij de RDW en aan de hand van jouw auto bereken we wanneer jouw auto onderhoud nodig heeft en ook wanneer de APK-beurt geregld moet worden.")
  }

  function secondInfo(){
    alert("De huidige kilometerstand kan je zien op je snelheidsmeter van je auto.")
  }

  function thirdInfo(){
    alert("De laatst uitgevoerde onderhoud staat in jouw onderhoudsboekje. Als je geen onderhoudsboekje hebt en geen papieren hebt van de laatst uitgevoerde onderhoud door de vorige eigenaar dan klik je op 'NEE'.")
  }

  function fourthInfo() {
    alert("De laatst uitgevoerde onderhoud staat in jouw onderhoudsboekje. Als je geen onderhoudsboekje hebt en geen papieren hebt van de laatst uitgevoerde onderhoud door de vorige eigenaar dan klik je op 'NEE'.");
  }

  function fivthInfo() {
    alert("Er zijn twee soorten onderhoudsbeurten, een grote en een kleine. In het onderhoudsboekje staat of de laatst uitgevoerde onderhoudsbeurt een kleine of een grote is geweest.");
  }

  function sixtInfo(){
    alert("De datum van de laatst uitevoerde onderhoud staat ook in het onderhoudsboekje.")
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
          <button onClick={firstInfo} className="questionbutton">?</button>
          <p>Vul jouw kentekenplaat hieronder in.</p>
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
                onChange={cleanInput}
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
          <button onClick={secondInfo} className="questionbutton">?</button>
          <p>Wat is de huidige kilometerstand?</p>
          <section className='huidigekmsection'>
            <input
              type='text'
              placeholder='Bijv: 125.000'
              className='huidigeKilometerstand graytextinput'
              maxlength='8'
              id='huidigeKilometerstand'
              // pattern='[0-9]*'
              onInput={formatNumber}
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
          <button onClick={thirdInfo} className="questionbutton">?</button>
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
          <button onClick={fourthInfo} className="questionbutton">?</button>
          <p>Wat was de kilometerstand van de laatste onderhoudsbeurt?</p>
          <section className='kmstandonderhoudsection'>
            <input
              type='text'
              className='kmstandonderhoud graytextinput'
              id='kmstandonderhoud'
              maxlength='8'
              placeholder='Bijv: 80.000'
              onClick={removeKmstandOnderhoudError}
              onInput={formatNumber2}
            ></input>
            <label for='kmstandonderhoud'>KM</label>
          </section>

          <br />

          <button onClick={fivthInfo} className="questionbutton">?</button>
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
          <button onClick={sixtInfo} className="questionbutton">?</button>
          <p>Wat was de datum van de laatst uitgevoerd beurt?</p>
          <input
            type='date'
            placeholder='Voer een datum in'
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
            reparaties voorkomen.
          </p>

          <p>
            Na jouw onderhoudsbeurt is deze app overzichtelijker en gereed voor
            gebruik!
          </p>

          <p>
            Als jouw huidige kilometerstand onder de 15.000 km is dan hoef jij
            je nog geen zorgen te maken. De eerst volgende onderhoudsbeurt vindt
            dan plaatst als de kilometerstand bij de 15.000 km is.
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
