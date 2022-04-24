import React from 'react'
import { Button } from 'react-bootstrap'
import tapsService from '../services/taps'

const RemoveButton = ({ tap, taps, setTaps }) => {

  const handleRemove = (event) => {
    event.preventDefault()
    removeTap(tap)
  }

  const removeTap = async (tap) => {
    await tapsService.remove(tap.id)
    const newTaps = taps.filter(existingTap => existingTap.id !== tap.id)
    setTaps(newTaps)
  }

  return (
    <Button variant="outline-warning" onClick={handleRemove}>Remove</Button>
  )
}

export default RemoveButton