import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import styles from "../styles/afsprakencard.module.css";
import backIco from "../assets/icons/back.svg";
import deleteIco from "../assets/icons/delete.png";


function Afsprakencard() {
  const router = useRouter();

  function firstBack() {
    router.back();
  }

useEffect(() => {

let getApkAfspraak = localStorage.getItem("apkafspraak");
let apkAfspraakData = JSON.parse(getApkAfspraak);
let getOnderhoudsAfspraak = localStorage.getItem("onderhoudafspraak");
let onderhoudAfspraakData = JSON.parse(getOnderhoudsAfspraak);
let getServiceAfspraak = localStorage.getItem("serviceafspraak");
let serviceAfspraakData = JSON.parse(getServiceAfspraak);

  if (localStorage.getItem("serviceafspraak")) {
    document.querySelector(".geenresultaten").classList.add("displaynone");
    document.querySelector(".afsprakenlijstcontainer").classList.remove("displaynone");
    document.querySelector(".serviceafspraak").classList.remove("displaynone");

    document.querySelector(".servicegaragenaam").innerHTML = serviceAfspraakData.garagenaam;
    document.querySelector(".servicedatum").innerHTML = serviceAfspraakData.datum + " " + serviceAfspraakData.tijd;
    document.querySelector(".serviceadres").innerHTML = serviceAfspraakData.adres + "<br/>" + serviceAfspraakData.postcode_plaats;
  } 

  if (localStorage.getItem("apkafspraak")) {
    document.querySelector(".geenresultaten").classList.add("displaynone");
    document.querySelector(".afsprakenlijstcontainer").classList.remove("displaynone");
    document.querySelector(".apkafspraak").classList.remove("displaynone");

    document.querySelector(".apkgaragenaam").innerHTML = apkAfspraakData.garagenaam;
    document.querySelector(".apkdatum").innerHTML = apkAfspraakData.datum + " " + apkAfspraakData.tijd;
    document.querySelector(".apkadres").innerHTML = apkAfspraakData.adres + "<br/>" + apkAfspraakData.postcode_plaats;
  }

  if (localStorage.getItem("onderhoudafspraak")) {
    document.querySelector(".geenresultaten").classList.add("displaynone");
    document.querySelector(".afsprakenlijstcontainer").classList.remove("displaynone");
    document.querySelector(".onderhoudsafspraak").classList.remove("displaynone");

    document.querySelector(".onderhoudsgaragenaam").innerHTML = onderhoudAfspraakData.garagenaam;
    document.querySelector(".onderhoudsdatum").innerHTML = onderhoudAfspraakData.datum + " " + onderhoudAfspraakData.tijd;
    document.querySelector(".onderhoudsadres").innerHTML = onderhoudAfspraakData.adres + "<br/>" + onderhoudAfspraakData.postcode_plaats;
  }
}, []);


function removeOnderhoud(){
    localStorage.removeItem("onderhoudafspraak");
    location.reload();
}

function removeApk(){
    localStorage.removeItem("apkafspraak");
    location.reload();
}

function removeService(){
    localStorage.removeItem("serviceafspraak");
    location.reload();
}

  return (
    <div className={styles.afsprakencard}>
      <button className='backbutton' onClick={firstBack}>
        <Image src={backIco} alt='Terug icoon' />
      </button>

      <h1>Mijn Afspraken</h1>

      <div className={styles.zerostate + " geenresultaten"}>
        <h2>Geen afspraken gevonden</h2>
        <p>Ga terug naar de home pagina om een afspraak te maken.</p>
      </div>

      <div
        className={
          styles.afsprakenlijst + " afsprakenlijstcontainer displaynone"
        }
      >
        <section className='onderhoudsafspraak displaynone'>
          <h3>Onderhoudsbeurt afspraak</h3>
          <h3 className='onderhoudsgaragenaam'></h3>

          <p>Datum en tijd:</p>
          <p className='onderhoudsdatum'></p>

          <p>Adres:</p>
          <p className='onderhoudsadres'></p>
          
          <button onClick={removeOnderhoud}><Image src={deleteIco} alt="Delete Icoon"/></button>

        </section>

        <section className='serviceafspraak displaynone'>
          <h3>Service afspraak</h3>
          <h3 className='servicegaragenaam'></h3>

          <p>Datum en tijd:</p>
          <p className='servicedatum'></p>

          <p>Adres:</p>
          <p className='serviceadres'></p>

          <button onClick={removeService}><Image src={deleteIco} alt="Delete Icoon"/></button>

        </section>

        <section className='apkafspraak displaynone'>
          <h3>APK afspraak</h3>
          <h3 className='apkgaragenaam'></h3>

          <p>Datum en tijd:</p>
          <p className='apkdatum'></p>

          <p>Adres:</p>
          <p className='apkadres'></p>

          <button onClick={removeApk}><Image src={deleteIco} alt="Delete Icoon"/></button>

        </section>
      </div>
    </div>
  );
}

export default Afsprakencard;
