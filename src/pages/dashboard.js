import { useEffect } from "react";

export default function Dashboard() {
  let datam;

  useEffect(() => {
    let getItem = localStorage.getItem("kenteken");
    let data = JSON.parse(getItem);
    console.log(data);

    document.querySelector(".kenteken").innerHTML = data.kenteken;
    document.querySelector(".merk").innerHTML = data.merk;
    document.querySelector(".handelsbenaming").innerHTML = data.handelsbenaming;
    document.querySelector(".brandstof").innerHTML = data.brandstof;
    document.querySelector(".apk").innerHTML = data.apk_datum;
    document.querySelector(".kilometerstand").innerHTML = data.kilometerstand;
    document.querySelector(".eerst_volgende_onderhoud").innerHTML =
      data.eerst_volgende_onderhoud;
    document.querySelector(".onderhoud_bij_aantal_km").innerHTML =
      data.onderhoud_bij_aantal_km;
  }, []);

  return (
    <>
      <p className='kenteken'></p>
      <p>
        <span className='merk'></span>
        <span> </span>
        <span className='handelsbenaming'></span>
      </p>
      <p className='brandstof'></p>
      <p className='eerst_volgende_onderhoud'></p>
      <p className='apk'></p>
      <p className='kilometerstand'></p>
      <p className='onderhoud_bij_aantal_km'></p>
    </>
  );
}
