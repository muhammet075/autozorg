import styles from "../styles/apkprogress.module.css";
import { useEffect } from "react";
import plaatsen from "../../public/plaatsen";
import Image from "next/image";
import locationIco from "../assets/icons/location.svg";
import backIco from "../assets/icons/back.svg";
import closeIco from "../assets/icons/close.svg";

function Apkprogress() {
  let plaatsnaam;
  let garageApi;
  let allAfspraakBtns;
  let volgnummer;
  let afspraakdata;

  useEffect(() => {
    let getItem = localStorage.getItem("kenteken");
    let data = JSON.parse(getItem);
    console.log(data);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
      const userLat = parseFloat(position.coords.latitude);
      const userLng = parseFloat(position.coords.longitude);

      function toRadians(degrees) {
        return (degrees * Math.PI) / 180;
      }

      function distance(lat1, lng1, lat2, lng2) {
        const earthRadius = 6371; // km
        const dLat = toRadians(lat2 - lat1);
        const dLng = toRadians(lng2 - lng1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c;
        return distance;
      }

      function findNearestCity(lat, lng, cities) {
        let minDist = Infinity;
        let closestCity = null;

        for (let i = 0; i < cities.length; i++) {
          const city = cities[i];
          const dist = distance(lat, lng, city.lat, city.lng);

          if (dist < minDist) {
            minDist = dist;
            closestCity = city;
          }
        }
        return closestCity;
      }
      const nearestCity = findNearestCity(userLat, userLng, plaatsen);
      console.log(nearestCity.city);

      document.querySelector(".plaatsnaam").innerHTML = nearestCity.city;
      plaatsnaam = nearestCity.city;
    }

    function setPlaceName() {
      garageApi =
        "https://opendata.rdw.nl/resource/5k74-3jha.json?$query=SELECT%0A%20%20%60volgnummer%60%2C%0A%20%20%60naam_bedrijf%60%2C%0A%20%20%60gevelnaam%60%2C%0A%20%20%60straat%60%2C%0A%20%20%60huisnummer%60%2C%0A%20%20%60huisnummer_toevoeging%60%2C%0A%20%20%60postcode_numeriek%60%2C%0A%20%20%60postcode_alfanumeriek%60%2C%0A%20%20%60plaats%60%2C%0A%20%20%60api_bedrijf_erkenningen%60%0ASEARCH%20%22" +
        plaatsnaam +
        "%22";

      try {
        if (document.querySelector(".plaatsnaam").innerHTML === "") {
        } else {
          document
            .querySelector(".zoekgaragebtn")
            .classList.remove("displaynone");
          document.querySelector(".spinner").classList.add("displaynone");
          document
            .querySelector(".locationcontainer")
            .classList.remove("displaynone");
        }
      } catch (e) {}
    }

    setInterval(setPlaceName, 500);
  }, []);

  async function zoekGarages() {
    document.querySelector(".onderhoudcontainer1").classList.add("displaynone");
    document
      .querySelector(".onderhoudcontainer2")
      .classList.remove("displaynone");

    const response = await fetch(garageApi);
    const jsondata = await response.json();

    console.log(garageApi);
    console.log(jsondata);

    let html = "";

    for (let i = 0; i < Math.min(jsondata.length, 50); i++) {
      html += ` 
            <section>
            <h3>${jsondata[i].gevelnaam}</h3>
            <p>Adres:</p>
            <p>${jsondata[i].straat} ${jsondata[i].huisnummer}</p>
            <p>${jsondata[i].postcode_numeriek} ${jsondata[i].postcode_alfanumeriek} ${jsondata[i].plaats}</p>

            <div>
            <a target="_blank" href="https://www.google.nl/maps/search/${jsondata[i].straat}+${jsondata[i].huisnummer}+${jsondata[i].postcode_numeriek}${jsondata[i].postcode_alfanumeriek}/">Maps</a>
            <button class="afspraakbtn" value="${jsondata[i].volgnummer}">Afspraak</button>
            </div>
            </section>
            `;

      html += "";
      document.querySelector(".garagecontainer").innerHTML = html;
      allAfspraakBtns = document.querySelectorAll(".afspraakbtn");

      console.log(allAfspraakBtns);

      for (let i = 0; i < allAfspraakBtns.length; i++) {
        allAfspraakBtns[i].addEventListener("click", () => {
          console.log(allAfspraakBtns[i].value);
          volgnummer = allAfspraakBtns[i].value;
          document
            .querySelector(".afspraakcontainer")
            .classList.remove("displaynone");
          document.querySelector("body").classList.add("noscroll");
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }
    }
  }

  function afspraakSluiten() {
    document.querySelector(".afspraakcontainer").classList.add("displaynone");
    document.querySelector("body").classList.remove("noscroll");
    document
      .querySelector(".afspraakcontainercontent")
      .classList.remove("afspraaktijddatumerror");
    document.querySelector(".datumafspraak").value = "";
    document.querySelector(".tijdafspraak").value = "";
  }

  async function afspraakBevestigen() {
    const datumafspraak = document.querySelector(".datumafspraak");
    const tijdafspraak = document.querySelector(".tijdafspraak");

    if (datumafspraak.value && tijdafspraak.value) {
      console.log(volgnummer);

      const afspraakApi =
        "https://opendata.rdw.nl/resource/5k74-3jha.json?$query=SELECT%0A%20%20%60volgnummer%60%2C%0A%20%20%60naam_bedrijf%60%2C%0A%20%20%60gevelnaam%60%2C%0A%20%20%60straat%60%2C%0A%20%20%60huisnummer%60%2C%0A%20%20%60huisnummer_toevoeging%60%2C%0A%20%20%60postcode_numeriek%60%2C%0A%20%20%60postcode_alfanumeriek%60%2C%0A%20%20%60plaats%60%2C%0A%20%20%60api_bedrijf_erkenningen%60%0AWHERE%20%60volgnummer%60%20%3D%20" +
        volgnummer;

      console.log(afspraakApi);

      const response = await fetch(afspraakApi);
      const garagedata = await response.json();
      console.log(garagedata);

      afspraakdata = {
        datum: document.querySelector(".datumafspraak").value,
        tijd: document.querySelector(".tijdafspraak").value,
        garagenaam: garagedata[0].gevelnaam,
        adres: garagedata[0].straat + " " + garagedata[0].huisnummer,
        postcode_plaats:
          garagedata[0].postcode_numeriek +
          garagedata[0].postcode_alfanumeriek +
          " " +
          garagedata[0].plaats,
      };

      console.log(afspraakdata);

      localStorage.setItem("apkafspraak", JSON.stringify(afspraakdata));
      let getOnderhoudsAfspraak = localStorage.getItem("apkafspraak");

      console.log(JSON.parse(getOnderhoudsAfspraak));

      window.location = "/dashboard";
    } else {
      document
        .querySelector(".afspraakcontainercontent")
        .classList.add("afspraaktijddatumerror");
    }
  }

  function removeError() {
    document
      .querySelector(".afspraakcontainercontent")
      .classList.remove("afspraaktijddatumerror");
  }

  function firstBack() {
    window.location = "/dashboard";
  }

  function secondBack() {
    location.reload();
  }

  return (
    <div className={styles.onderhoud}>
      <h1>APK Keuring</h1>

      <div className={styles.onderhoudcontainer1 + " onderhoudcontainer1"}>
        <button className='backbutton' onClick={firstBack}>
          <Image src={backIco} alt='Terug icoon' />
        </button>
        <div>
          <div
            className={
              styles.locationcontainer + " locationcontainer displaynone"
            }
          >
            <Image src={locationIco} alt='Locatie icoon' />
            <p>
              Huidige locatie: <span className='plaatsnaam'></span>
            </p>
          </div>

          <div className={styles.spinner + " spinner"}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <button
          onClick={zoekGarages}
          className={styles.zoekgaragebtn + " zoekgaragebtn displaynone"}
        >
          Zoek Garages
        </button>
      </div>

      <div
        className={
          styles.onderhoudcontainer2 + " onderhoudcontainer2 displaynone"
        }
      >
        <button className='backbutton' onClick={secondBack}>
          <Image src={backIco} alt='Terug icoon' />
        </button>
        <div className='garagecontainer'></div>
      </div>

      <div
        className={styles.afspraakcontainer + " afspraakcontainer displaynone"}
      >
        <button onClick={afspraakSluiten}>
          <Image src={closeIco} alt='Sluiten Icoon' />
        </button>

        <section className='afspraakcontainercontent'>
          <h2>Afspraak</h2>

          <p>Kies datum:</p>
          <input
            type='date'
            onclick={removeError}
            className='datumafspraak graytextinput'
          ></input>

          <p>Kies tijd:</p>
          <input
            type='time'
            onclick={removeError}
            className='tijdafspraak graytextinput'
          ></input>
        </section>

        <button onClick={afspraakBevestigen}>Afspraak Bevestigen</button>
      </div>
    </div>
  );
}

export default Apkprogress;
