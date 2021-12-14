import taplist from './taplist.js'
import tapitem from './tap_item.js'
import navbar from './navbar.js'
import styles from "./App.module.css";

function App() {
  let tapmap = taplist['brewery_taps'].map(x => tapitem(x))
  let guesttapmap = taplist['guest_taps'].map(x => tapitem(x))

  return (
    <div className={styles.App}>
      <p className={styles.BreweryTitle}>{taplist['home_brewery']}</p>
      {tapmap}
      <p className={styles.BreweryTitle}>Guest Beers</p>
      {guesttapmap}
    </div>
  );
}

export default App;
