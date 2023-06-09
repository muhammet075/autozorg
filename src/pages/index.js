import { useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Opening from "@/components/opening";

export default function Home() {
  useEffect(() => {

    document.querySelector("footer").classList.add("displaynone");
    
    let getItem = localStorage.getItem("kenteken");
    let data = JSON.parse(getItem);

    document.querySelector("header").style.display = "none";
    document.querySelector("#__next").classList.add("fullheight");

    console.log(data);

    if (data === null) {
      setTimeout(() => {
        window.location = "/register";
      }, 1500);
    } else {
      setTimeout(() => {
        window.location = "/dashboard";
      }, 1500);
    }
  }, []);

  return (
    <div>
      <Opening />
    </div>
  );
}
