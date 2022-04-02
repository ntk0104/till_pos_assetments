import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import userEvent from '@testing-library/user-event'

test('renders Pizza Company App', () => {
  render(<App />)
  const headerElement = screen.getByText(/Pizza Company/i)
  expect(headerElement).toBeInTheDocument()
})

test('should update item quantity when increase and descrease quantity', async () => {
  const { container } = render(<App />)
  const smallItemDesc = await screen.findByText("10' pizza for one person")
  const mediumItem = await screen.findByText("12' pizza for two person")
  const largeItem = await screen.findByText("15' pizza for four person")
  expect(smallItemDesc).toBeInTheDocument()
  expect(mediumItem).toBeInTheDocument()
  expect(largeItem).toBeInTheDocument()

  const smallItem: any = container.querySelector('[element-test="Small Pizza"]')
  const smallItem_increaseBtn = smallItem.querySelector('.anticon-plus-circle')
  const smallItem_decreaseBtn = smallItem.querySelector('.anticon-minus-circle')
  const smallItem_QtyText = smallItem.querySelector('.item_quantity')
  userEvent.click(smallItem_increaseBtn)
  expect(smallItem_QtyText).toHaveTextContent('1')
  userEvent.click(smallItem_increaseBtn)
  expect(smallItem_QtyText).toHaveTextContent('2')
  userEvent.click(smallItem_decreaseBtn)
  expect(smallItem_QtyText).toHaveTextContent('1')
})

test('should add item to shopping cart correctly when increase item', async () => {
  const { container } = render(<App />)
  const smallItemDesc = await screen.findByText("10' pizza for one person")
  const mediumItem = await screen.findByText("12' pizza for two person")
  const largeItem = await screen.findByText("15' pizza for four person")
  expect(smallItemDesc).toBeInTheDocument()
  expect(mediumItem).toBeInTheDocument()
  expect(largeItem).toBeInTheDocument()

  const smallItem: any = container.querySelector('[element-test="Small Pizza"]')
  const smallItem_increaseBtn = smallItem.querySelector('.anticon-plus-circle')
  let smallItem_cartItem: any = container.querySelector(
    '.ant-table-row-level-0'
  )
  expect(smallItem_cartItem).not.toBeInTheDocument()
  userEvent.click(smallItem_increaseBtn)
  smallItem_cartItem = container.querySelector('.ant-table-row-level-0')
  const smallItem_cartItem_name_col =
    smallItem_cartItem.querySelector('td:first-child')
  expect(smallItem_cartItem_name_col).toHaveTextContent('Small Pizza')
  let smallItem_cartItem_qty_col =
    smallItem_cartItem.querySelector('td:nth-child(2)')

  expect(smallItem_cartItem_qty_col).toHaveTextContent('1')
  userEvent.click(smallItem_increaseBtn)
  smallItem_cartItem = container.querySelector('.ant-table-row-level-0')
  smallItem_cartItem_qty_col =
    smallItem_cartItem.querySelector('td:nth-child(2)')
  expect(smallItem_cartItem_qty_col).toHaveTextContent('2')
  const smallItem_cartItem_unitPrice_col =
    smallItem_cartItem.querySelector('td:nth-child(3)')
  expect(smallItem_cartItem_unitPrice_col).toHaveTextContent('11.99')
  const smallItem_cartItem_subTotal_col =
    smallItem_cartItem.querySelector('td:nth-child(4)')
  expect(smallItem_cartItem_subTotal_col).toHaveTextContent('23.98')
})

test('should remove item to shopping cart correctly when decrease item to 0', async () => {
  const { container } = render(<App />)
  const smallItemDesc = await screen.findByText("10' pizza for one person")
  const mediumItem = await screen.findByText("12' pizza for two person")
  const largeItem = await screen.findByText("15' pizza for four person")
  expect(smallItemDesc).toBeInTheDocument()
  expect(mediumItem).toBeInTheDocument()
  expect(largeItem).toBeInTheDocument()

  const smallItem: any = container.querySelector('[element-test="Small Pizza"]')
  const smallItem_increaseBtn = smallItem.querySelector('.anticon-plus-circle')
  const smallItem_decreaseBtn = smallItem.querySelector('.anticon-minus-circle')
  let smallItem_cartItem: any = container.querySelector(
    '.ant-table-row-level-0'
  )
  expect(smallItem_cartItem).not.toBeInTheDocument()
  userEvent.click(smallItem_increaseBtn)
  smallItem_cartItem = container.querySelector('.ant-table-row-level-0')
  const smallItem_cartItem_name_col =
    smallItem_cartItem.querySelector('td:first-child')
  expect(smallItem_cartItem_name_col).toHaveTextContent('Small Pizza')
  const smallItem_cartItem_qty_col =
    smallItem_cartItem.querySelector('td:nth-child(2)')

  expect(smallItem_cartItem_qty_col).toHaveTextContent('1')
  userEvent.click(smallItem_decreaseBtn)
  smallItem_cartItem = container.querySelector('.ant-table-row-level-0')
  expect(smallItem_cartItem).not.toBeInTheDocument()
})

test('should set default customer to Default', async () => {
  render(<App />)
  const smallItemDesc = await screen.findByText("10' pizza for one person")
  const mediumItem = await screen.findByText("12' pizza for two person")
  const largeItem = await screen.findByText("15' pizza for four person")
  expect(smallItemDesc).toBeInTheDocument()
  expect(mediumItem).toBeInTheDocument()
  expect(largeItem).toBeInTheDocument()

  const defaultCustomer: any = screen.getByLabelText('Default')
  expect(defaultCustomer.value).toBe('1')
})

test('should calculate total normally when order with default customer', async () => {
  const { container } = render(<App />)
  const smallItemDesc = await screen.findByText("10' pizza for one person")
  const mediumItemDesc = await screen.findByText("12' pizza for two person")
  const largeItem = await screen.findByText("15' pizza for four person")
  expect(smallItemDesc).toBeInTheDocument()
  expect(mediumItemDesc).toBeInTheDocument()
  expect(largeItem).toBeInTheDocument()

  const smallItem: any = container.querySelector('[element-test="Small Pizza"]')
  const smallItem_increaseBtn = smallItem.querySelector('.anticon-plus-circle')
  let smallItem_cartItem: any = container.querySelector(
    '.ant-table-row-level-0'
  )
  expect(smallItem_cartItem).not.toBeInTheDocument()
  userEvent.click(smallItem_increaseBtn)
  const mediumItem: any = container.querySelector(
    '[element-test="Medium Pizza"]'
  )
  const mediumItem_increaseBtn = mediumItem.querySelector(
    '.anticon-plus-circle'
  )
  userEvent.click(mediumItem_increaseBtn)
  const total = container.querySelector('[element-test="total"]')
  expect(total).toHaveTextContent('27.98 $')
})

test('should calculate total with promotion when order with Microsoft customer', async () => {
  const { container } = render(<App />)
  const smallItemDesc = await screen.findByText("10' pizza for one person")
  const mediumItemDesc = await screen.findByText("12' pizza for two person")
  const largeItem = await screen.findByText("15' pizza for four person")
  expect(smallItemDesc).toBeInTheDocument()
  expect(mediumItemDesc).toBeInTheDocument()
  expect(largeItem).toBeInTheDocument()

  const smallItem: any = container.querySelector('[element-test="Small Pizza"]')
  const smallItem_increaseBtn = smallItem.querySelector('.anticon-plus-circle')
  let smallItem_cartItem: any = container.querySelector(
    '.ant-table-row-level-0'
  )
  expect(smallItem_cartItem).not.toBeInTheDocument()
  userEvent.click(smallItem_increaseBtn)
  userEvent.click(smallItem_increaseBtn)
  userEvent.click(smallItem_increaseBtn)
  const total = container.querySelector('[element-test="total"]')
  const MicrosoftCustomer: any = screen.getByLabelText('Microsoft')
  userEvent.click(MicrosoftCustomer)
  expect(total).toHaveTextContent('23.98 $')
})

test('should calculate total with promotion when order with Amazon customer', async () => {
  const { container } = render(<App />)
  const smallItemDesc = await screen.findByText("10' pizza for one person")
  const mediumItemDesc = await screen.findByText("12' pizza for two person")
  const largeItemDesc = await screen.findByText("15' pizza for four person")
  expect(smallItemDesc).toBeInTheDocument()
  expect(mediumItemDesc).toBeInTheDocument()
  expect(largeItemDesc).toBeInTheDocument()

  const largeItem: any = container.querySelector('[element-test="Large Pizza"]')
  const largeItem_increaseBtn = largeItem.querySelector('.anticon-plus-circle')
  let largeItem_cartItem: any = container.querySelector(
    '.ant-table-row-level-0'
  )
  expect(largeItem_cartItem).not.toBeInTheDocument()
  userEvent.click(largeItem_increaseBtn)
  userEvent.click(largeItem_increaseBtn)
  userEvent.click(largeItem_increaseBtn)
  const total = container.querySelector('[element-test="total"]')
  const MicrosoftCustomer: any = screen.getByLabelText('Amazon')
  userEvent.click(MicrosoftCustomer)
  expect(total).toHaveTextContent('59.97 $')
})
