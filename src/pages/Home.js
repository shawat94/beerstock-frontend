import React from 'react'

const Home = ({styles, LoginForm, user, taps}) => {

  if (user) {
    if (taps.length > 0) {
      return (
          <div className={styles.App}>
          <p className={styles.BreweryTitle}>Beer List</p>
          {taps}
          </div>
        )
    } else {
      return(
        <p className={styles.LoginText}>Click 'New Beer' to start your beer list</p>
      )
    }
  } else {
    return (
      <p className={styles.LoginText}>Login to view your beer list</p>
    )
  }

}

export default Home