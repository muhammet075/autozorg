import styles from "../styles/pechhulpstate.module.css";

function Pechhulpstate() {
  function openANWB() {
    window.open("https://www.anwb.nl/wegenwacht/service/pechmelding", "_blank");
  }

  return (
    <div className={styles.pechhulpstate}>
      <h1>Pechhulp</h1>
      <div className={styles.container1}>
        <h2>Heb jij een ANWB lidmaatschap?</h2>
        <button onClick={openANWB}>Ja</button>
        <button className='nee'>Nee</button>
      </div>
    </div>
  );
}

export default Pechhulpstate;
