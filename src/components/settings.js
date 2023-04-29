import { useEffect } from "react";
import Image from "next/image";
import styles from "../styles/settings.module.css";
import deleteIco from "../assets/icons/delete.svg";
import backIco from "../assets/icons/back.svg";

function Settings() {
  useEffect(() => {
    let getItem = localStorage.getItem("kenteken");
    let data = JSON.parse(getItem);

    console.log(data);

    document.querySelector(".merknaam").innerHTML = data.merk + " ";
    document.querySelector(".typeauto").innerHTML = data.handelsbenaming;
    document.querySelector(".kentekenplaat").innerHTML = data.kenteken;
    document.querySelector(".brandstof").innerHTML = data.brandstof + " ";
    document.querySelector(".bouwjaar").innerHTML =
      data.datum_eerste_toelating.substring(0, 4);
    document.querySelector(".autoimg").src =
      "/carlogos/" + data.merk.toLowerCase().replace(/ /g, "_") + ".png";

    if (data === null) {
      window.location = "/register";
    }
  }, []);

  function deleteCar(){
    localStorage.removeItem("kenteken");
    document.querySelector(".autocard").classList.add("displaynone");
    setTimeout(function () {
        window.location = "/register"
    }, 1000);
  }

  function firstBack(){
     window.location = "/dashboard";
  }

  return (
    <div className={styles.settings}>
      <h1>Instellingen</h1>

      <button className='backbutton' onClick={firstBack}>
        <Image src={backIco} alt='Terug icoon' />
      </button>

      <div className='autocard'>
        <section>
          <img className='autoimg' alt='Logo van de auto merk' />
        </section>
        <section>
          <p className='kentekenstyle kentekenplaat'></p>
          <h3>
            <span className='merknaam'></span>
            <span className='typeauto'></span>
          </h3>
          <h3>
            <span className='brandstof'></span>
            <span className='bouwjaar'></span>
          </h3>
        </section>
        <button onClick={deleteCar}>
          <Image src={deleteIco} alt='Verwijder button' />
        </button>
      </div>
    </div>
  );
}

export default Settings;
