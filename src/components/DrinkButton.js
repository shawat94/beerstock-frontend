import React from 'react'
import { Button } from 'react-bootstrap'
import tapsService from '../services/taps'

const DrinkButton = ({ tap, taps, setTaps }) => {

  const handleDrink = (event) => {
    event.preventDefault()
    drinkTap(tap)
  }

  const drinkTap = async (tap) => {
    const updatedTap = {...tap, remaining: (tap.remaining - 1)}
    console.log(updatedTap)
    console.log(`ID is ${tap.id}`)
    const response = await tapsService.update(tap.id, updatedTap)
    console.log(response)
    const newTaps = (taps.map(existingTap => {
      if (existingTap.id == tap.id) {
        existingTap.remaining = existingTap.remaining - 1
        }
      return(existingTap)
    })
    )
    console.log(newTaps)
    setTaps(newTaps)
  }

  return (
    <Button variant="outline-warning" onClick={handleDrink}>Drink</Button>
  )
}

export default DrinkButton
