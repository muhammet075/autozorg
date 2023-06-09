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

      let getOnderhoudsAfspraak = localStorage.getItem("onderhoudafspraak");
      let onderhoudsAfspraakData = JSON.parse(getOnderhoudsAfspraak);

      console.log(onderhoudsAfspraakData)

       if (onderhoudsAfspraakData === null) {
        console.log("geen onderhoudsafspraak");
       } else{
        console.log("wel onderhoudsafspraak");

        document.querySelector(".onderhoudscardcontent").classList.add("displaynone");
        document.querySelector(".onderhoudsafspraakcard").classList.remove("displaynone");

        document.querySelector(".onderhoudsafspraaknaam").innerHTML = onderhoudsAfspraakData.garagenaam;

             let datum = new Date(onderhoudsAfspraakData.datum);
             let dag = datum.getDate().toString().padStart(2, "0");
             let maand = (datum.getMonth() + 1).toString().padStart(2, "0");
             let jaar = datum.getFullYear();

             let datumInDagMaandJaarFormaat = dag + "-" + maand + "-" + jaar;

        document.querySelector(".onderhoudsafspraakdatum").innerHTML = datumInDagMaandJaarFormaat + " " + onderhoudsAfspraakData.tijd;
        document.querySelector(".onderhoudsafspraakadres").innerHTML = onderhoudsAfspraakData.adres + "<br/>" + onderhoudsAfspraakData.postcode_plaats;
       }




      let getServiceAfspraak = localStorage.getItem("serviceafspraak");
      let serviceAfspraakData = JSON.parse(getServiceAfspraak);

       if (serviceAfspraakData === null) {
        console.log("geen service");
       } else{
        console.log("wel service");

      const datumString = serviceAfspraakData.datum;
      const datum = new Date(datumString);

      if (datum < new Date()) {
        console.log("De datum is in het verleden.");
        localStorage.removeItem("serviceafspraak");
        location.reload();

      } else {
        console.log("De datum is in de toekomst.");
    
        document.querySelector(".servicecontainer").classList.add("displaynone");
        document.querySelector(".serviceafspraakcontainer").classList.remove("displaynone");

        document.querySelector(".serviceafspraaknaam").innerHTML = serviceAfspraakData.garagenaam;

             let datum = new Date(serviceAfspraakData.datum);
             let dag = datum.getDate().toString().padStart(2, "0");
             let maand = (datum.getMonth() + 1).toString().padStart(2, "0");
             let jaar = datum.getFullYear();

             let datumInDagMaandJaarFormaat = dag + "-" + maand + "-" + jaar;

        document.querySelector(".serviceafspraakdatum").innerHTML = datumInDagMaandJaarFormaat + " " + serviceAfspraakData.tijd;
        document.querySelector(".serviceafspraakadres").innerHTML = serviceAfspraakData.adres + "<br/>" + serviceAfspraakData.postcode_plaats;

        if (!serviceAfspraakData.werkzaamheden){
          document.querySelector(".servicewerkzaamheden").innerHTML = "N.v.t";
        } else{
        document.querySelector(".servicewerkzaamheden").innerHTML = serviceAfspraakData.werkzaamheden;
        }
      }
    }




  }, []);

  function afspraakAnnuleren(){
      localStorage.removeItem("onderhoudafspraak");
      location.reload();
  };

  function afspraakVoltooid(){
        let getItem = localStorage.getItem("kenteken");
        let data = JSON.parse(getItem);
        let getOnderhoudsAfspraak = localStorage.getItem("onderhoudafspraak");
        let onderhoudsAfspraakData = JSON.parse(getOnderhoudsAfspraak);
        let newKmStand = data.onderhoud_bij_aantal_km
        let updateData;
        let newEerstVolgendOnderhoud;

        if (data.eerst_volgende_onderhoud === "Grote onderhoudsbeurt"){
          updateData = {
            kenteken: data.kenteken,
            handelsbenaming: data.handelsbenaming,
            merk: data.merk,
            cilinderinhoud: data.cilinderinhoud,
            datum_eerste_toelating: data.datum_eerste_toelating,
            wa_verzekerd: data.wa_verzekerd,
            apk_datum: data.apk_datum,
            brandstof: data.brandstof,
            onderhoud_bij_aantal_km: newKmStand + 15000,
            laatst_onderhouds_datum: onderhoudsAfspraakData.datum,
            kilometerstand: newKmStand,
            eerst_volgende_onderhoud: "Kleine onderhoudsbeurt",
          };

          localStorage.setItem("kenteken", JSON.stringify(updateData));
          localStorage.removeItem("onderhoudafspraak");
          location.reload()

        } else {
          updateData = {
            kenteken: data.kenteken,
            handelsbenaming: data.handelsbenaming,
            merk: data.merk,
            cilinderinhoud: data.cilinderinhoud,
            datum_eerste_toelating: data.datum_eerste_toelating,
            wa_verzekerd: data.wa_verzekerd,
            apk_datum: data.apk_datum,
            brandstof: data.brandstof,
            onderhoud_bij_aantal_km: newKmStand + 15000,
            laatst_onderhouds_datum: onderhoudsAfspraakData.datum,
            kilometerstand: newKmStand,
            eerst_volgende_onderhoud: "Grote onderhoudsbeurt",
          };

          localStorage.setItem("kenteken", JSON.stringify(updateData));
          localStorage.removeItem("onderhoudafspraak");
          location.reload()    
            }
  };

  function serviceAfspraakAnnuleren(){
          localStorage.removeItem("serviceafspraak");
          location.reload();
  }

  return (
    <>
      <div
        className={
          styles.onderhoudcard + " " + "onderhoudscard onderhoudgeldig"
        }
      >
        <div className='onderhoudscardcontent'>
          <h2 className='onderhoudh2'></h2>
          <p className='onderhoudscontent'>
            Staat of is de kilometerstand voor bij de:
          </p>
          <p className={styles.kmstand + " kmstand"}></p>
          <Link href='/onderhoud' className='afspraakbtn'>
            Ja
          </Link>
        </div>

        <div
          className={
            styles.onderhoudsafspraakcontainer +
            " onderhoudsafspraakcard displaynone"
          }
        >
          <h2>Onderhoudsbeurt afspraak</h2>
          <p>
            <span className='onderhoudsafspraaknaam'></span>
          </p>
          <p>Datum en tijd:</p>
          <p>
            <span className='onderhoudsafspraakdatum'></span>
          </p>
          <p>Adres:</p>
          <p>
            <span className='onderhoudsafspraakadres'></span>
          </p>
          <button onClick={afspraakVoltooid}>Afspraak voltooid</button>
          <button onClick={afspraakAnnuleren}>Afspraak annuleren</button>
        </div>

        <div className='servicecontainer'>
          <h2>Service</h2>
          <p>
            Tussentijds service nodig? Denk aan zaken zoals ruitenwissers laten
            vervangen, banden laten wisselen, defecte gloeilampen laten
            vervangen etc.
          </p>
          <Link href='/service' className='afspraakbtn'>
            Afspraak Inplannen
          </Link>
        </div>
      </div>

      <div className={styles.serviceafspraak + " serviceafspraakcontainer displaynone"}>
        <div>
        <h2>Service afspraak</h2>
        <p>
          <span className='serviceafspraaknaam'></span>
        </p>
        <p>Datum en tijd:</p>
        <p>
          <span className='serviceafspraakdatum'></span>
        </p>
        <p>Adres:</p>
        <p>
          <span className='serviceafspraakadres'></span>
        </p>
        <p>Werkzaamheden:</p>
        <p>
          <span className='servicewerkzaamheden'></span>
        </p>
        <p>Deze afspraak herrinering verdwijnt automatisch de eerst volgende dag van de dag van de afspraak.</p>
        <button onClick={serviceAfspraakAnnuleren}>Afspraak annuleren</button>
        </div>
      </div>
    </>
  );
}

export default Onderhoudcard;
