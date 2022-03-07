import React from 'react'
import { Button } from 'react-bootstrap'
import tapsService from '../services/taps'

const RemoveButton = ({ tap, taps, setTaps }) => {

  const handleRemove = (event) => {
    event.preventDefault()
    removeTap(tap)
  }

  const removeTap = async (tap) => {
    console.log(tap)
    const response = await tapsService.remove(tap.id)
    console.log(response.body)
    const newTaps = taps.filter(existingTap => existingTap.id !== tap.id)
    setTaps(newTaps)

  }

  return (
    <Button variant="outline-warning" onClick={handleRemove}>Remove</Button>
  )
}

export default RemoveButton