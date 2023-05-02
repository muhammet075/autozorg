import styles from "../styles/pechhulpstate.module.css";

function Pechhulpstate() {
  function openANWB() {
    window.open("https://www.anwb.nl/wegenwacht/service/pechmelding", "_blank");
  }

  function zoekGarages(){
    document.querySelector(".anwbcontainer").classList.add("displaynone");
    document.querySelector(".pechhulpcontainer").classList.remove("displaynone");
  }

  return (
    <div className={styles.pechhulpstate}>
      <h1>Pechhulp</h1>

      <div className={styles.container1 + " anwbcontainer"}>
        <h2>Heb jij een ANWB lidmaatschap?</h2>
        <section>
          <button onClick={openANWB}>Ja</button>
          <button onClick={zoekGarages}>Nee</button>
        </section>
      </div>

      <div className={styles.container2 + " pechhulpcontainer displaynone"}>
        <h2>pech?</h2>  
      </div>

    </div>
  );
}

export default Pechhulpstate;
