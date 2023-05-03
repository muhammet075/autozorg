import { useEffect } from "react";
import { useRouter } from "next/router";
import plaatsen from "../../public/plaatsen";
import styles from "../styles/pechhulpstate.module.css";
import Image from "next/image";
import locationIco from "../assets/icons/location.svg";
import backIco from "../assets/icons/back.svg";

function Pechhulpstate() {
  const router = useRouter();

  let plaatsnaam;
  let garageApi;
  let allAfspraakBtns;

  function openANWB() {
    window.open("https://www.anwb.nl/wegenwacht/service/pechmelding", "_blank");
  }

  function toonLocatie() {
    document.querySelector(".anwbcontainer").classList.add("displaynone");
    document
      .querySelector(".pechhulpcontainer")
      .classList.remove("displaynone");
  }

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
    document.querySelector(".pechhulpcontainer").classList.add("displaynone");
    document.querySelector(".garagelijst").classList.remove("displaynone");

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
            <a href="tel:075-123-4567" class="afspraakbtn" value="${jsondata[i].volgnummer}">Bel sleepdienst</a>
            </div>
            </section>
            `;

      html += "";
      document.querySelector(".garagecontainer").innerHTML = html;
      allAfspraakBtns = document.querySelectorAll(".afspraakbtn");
    }
  }

  function firstBack() {
    router.back();
  }

  function secondBack() {
    document.querySelector(".anwbcontainer").classList.remove("displaynone");
    document.querySelector(".pechhulpcontainer").classList.add("displaynone");
  }

  function thirdBack() {
    document.querySelector(".garagelijst").classList.add("displaynone");
    document
      .querySelector(".pechhulpcontainer")
      .classList.remove("displaynone");
  }

  return (
    <div className={styles.pechhulpstate}>
      <h1>Pechhulp</h1>

      <div className={styles.container1 + " anwbcontainer"}>
        <button className='backbutton' onClick={firstBack}>
          <Image src={backIco} alt='Terug icoon' />
        </button>

        <h2>Heb jij een ANWB lidmaatschap?</h2>
        <section>
          <button onClick={openANWB}>Ja</button>
          <button onClick={toonLocatie}>Nee</button>
        </section>
      </div>

      <div className={styles.container2 + " pechhulpcontainer displaynone"}>
        <button className='backbutton' onClick={secondBack}>
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

      <div className={styles.onderhoudcontainer2 + " garagelijst displaynone"}>
        <button className='backbutton' onClick={thirdBack}>
          <Image src={backIco} alt='Terug icoon' />
        </button>
        <div className='garagecontainer'></div>
      </div>
    </div>
  );
}

export default Pechhulpstate;
