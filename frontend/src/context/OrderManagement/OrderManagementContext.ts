import { createContext } from 'react'

const orderManagementContext = createContext<any>({
  cartItems: [],
  customers: [],
  menuItems: [],
  pricingRules: [],
  currentCustomerId: 1
})

export default orderManagementContext
