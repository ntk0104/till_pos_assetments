import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Pizza Company App', () => {
  render(<App />)
  const headerElement = screen.getByText(/Pizza Company/i)
  expect(headerElement).toBeInTheDocument()
})
