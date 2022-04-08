import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('Create a new tap', async () => {
  const newTap = {
    name: "Test Tap",
    style: "IPA",
    abv: "7.0",
    ibu: "75",
    type: "Bottle",
    unit: "oz",
    brewery: "Test Brewery",
    remaining: 10,
    description: "Test tap for unit tests",
    color: "Pale"
  }

  const mockHandler = jest.fn()

  
})