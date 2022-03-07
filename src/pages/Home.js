import React from 'react'
import TapItem from '../components/TapItem'

const Home = ({styles, LoginForm, user, taps, setTaps}) => {

  if (user) {
    if (taps.length > 0) {
      return (
          <div className={styles.App}>
          <p className={styles.BreweryTitle}>Beer List</p>
          {taps.map(tap => <TapItem tap={tap} taps={taps} setTaps={setTaps}/>)}
          </div>
        )
    } else {
      return(
        <p className={styles.LoginText}>Click 'New Beer' to start your beer list</p>
      )
    }
  } else {
    return (
      <p className={styles.LoginText}>Log in to view your beer list</p>
    )
  }

}

export default Home