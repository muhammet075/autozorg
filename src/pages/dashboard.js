import { useEffect } from "react";
import Autodetails from "@/components/autodetails";
import Apkcard from "@/components/apkcard";
import Onderhoudcard from "@/components/onderhoudcard";

export default function Dashboard() {
  useEffect(() => {
    let getItem = localStorage.getItem("kenteken");
    let data = JSON.parse(getItem);

    if (data === null) {
      window.location = "/register";
    }

    document.querySelector(".pechhulplink").classList.remove("activeurl");
    document.querySelector(".afsprakenlink").classList.remove("activeurl");
    document.querySelector(".instellingenlink").classList.remove("activeurl");
    document.querySelector(".homelink").classList.add("activeurl");

  }, []);

  return (
    <>
      <Autodetails />
      <Onderhoudcard />
      <Apkcard />
    </>
  );
}
