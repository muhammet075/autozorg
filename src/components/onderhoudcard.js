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
        document.querySelector(".onderhoudsafspraakdatum").innerHTML = onderhoudsAfspraakData.datum + " " + onderhoudsAfspraakData.tijd;
        document.querySelector(".onderhoudsafspraakadres").innerHTML = onderhoudsAfspraakData.adres + " " + onderhoudsAfspraakData.postcode_plaats;
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

        <div>
          <h2>Service</h2>
          <p className='onderhoudscontent'>
            Tussentijds service nodig? Denk aan zaken zoals ruitenwissers laten
            vervangen, banden laten wisselen, defecte gloeilampen laten
            vervangen etc.
          </p>
          <Link href='/service' className='afspraakbtn'>
            Afspraak Inplannen
          </Link>
        </div>
      </div>
    </>
  );
}

export default Onderhoudcard;
