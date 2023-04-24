import { useEffect } from "react";
import Autodetails from "@/components/autodetails";

export default function Dashboard() {
  useEffect(() => {
    let getItem = localStorage.getItem("kenteken");
    let data = JSON.parse(getItem);

    if (data === null) {
      window.location = "/register";
    }
  }, []);

  return (
    <>
      <Autodetails />
      <p className='kenteken'></p>
      <p>
        <span className='merk'></span>
        <span> </span>
        <span className='handelsbenaming'></span>
      </p>
      <p className='brandstof'></p>
      <p className='kilometerstand'></p>

      <div className='onderhoudscontainer'>
        <h3 className='eerst_volgende_onderhoud'></h3>
        <p>Staat de kilometerstand (bijna) op:</p>
        <h3 className='onderhoud_bij_aantal_km'></h3>
        <button>Ja</button>
      </div>

      <div className='apkcontainer'>
        <p>
          De APK van jouw auto verloopt pas over <span className='apk'></span>
          dagen.
        </p>
      </div>
    </>
  );
}
