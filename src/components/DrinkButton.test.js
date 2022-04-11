import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { testTaplist, testDrinkButtonTaplist, testTap } from '../resources/testTaplists'
import tapsService from '../services/taps'
import DrinkButton from './DrinkButton'

jest.mock('../services/taps')
const flushPromises = () => new Promise(setImmediate)

test('Drink button calls taps state with one fewer remaining', async () => {
  const setTapsMock = jest.fn(console.log('Mock called'))

  tapsService.update.mockResolvedValue = 'Test'

  render(<DrinkButton tap={testTap} taps={testTaplist} setTaps={setTapsMock} />)

  const button = screen.getByText('Drink')
  userEvent.click(button)

  await flushPromises()

  expect(setTapsMock).toBeCalledWith(testDrinkButtonTaplist)
})