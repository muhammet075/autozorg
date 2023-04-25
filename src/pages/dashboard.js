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
  }, []);

  return (
    <>
      <Autodetails />
      <Onderhoudcard />
      <Apkcard />
    </>
  );
}
