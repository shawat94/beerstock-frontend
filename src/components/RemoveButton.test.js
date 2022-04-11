import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { testTaplist, testRemoveButtonTaplist, testTap } from '../resources/testTaplists'
import tapsService from '../services/taps'
import RemoveButton from './RemoveButton'

jest.mock('../services/taps')
const flushPromises = () => new Promise(setImmediate)

test('Remove button calls taps state only once', async () => {
  const setTapsMock = jest.fn(console.log('Mock called'))

  tapsService.remove.mockResolvedValue = 'Test'

  render(<RemoveButton tap={testTap} taps={testTaplist} setTaps={setTapsMock} />)

  const button = screen.getByText('Remove')
  userEvent.click(button)

  await flushPromises()

  expect(setTapsMock).toBeCalledWith(testRemoveButtonTaplist)
})