import axios from 'axios'
import React, { useReducer } from 'react'
import { Checkout } from '../../services/checkout'
import MenuItemType from '../../types/models/menu-item'
import ShoppingCartItemType from '../../types/shopping-cart-item'
import {
  DECREASE_ITEM,
  GET_CUSTOMERS,
  GET_MENU_ITEMS,
  GET_PRICING_RULES,
  INCREASE_ITEM,
  SET_CURRENT_CUSTOMER
} from '../types'
import OrderManagementContext from './OrderManagementContext'
import OrderManagementReducer from './OrderManagementReducer'

const OrderManagementState = (props: any) => {
  const initialState: any = {
    cartItems: [],
    customers: [],
    menuItems: [],
    pricingRules: [],
    currentCustomerId: 1
  }

  const [state, dispatch] = useReducer(OrderManagementReducer, initialState)

  const increaseItem = (item: MenuItemType) => {
    dispatch({
      type: INCREASE_ITEM,
      payload: item
    })
  }

  const decreaseItem = (item: MenuItemType) => {
    dispatch({
      type: DECREASE_ITEM,
      payload: item
    })
  }

  const setCurrentCustomer = (customerId: number) => {
    dispatch({
      type: SET_CURRENT_CUSTOMER,
      payload: customerId
    })
  }

  const getCustomers = async () => {
    const res = await axios.get(`http://localhost:8000/customers`)
    dispatch({
      type: GET_CUSTOMERS,
      payload: res.data
    })
  }

  const getMenuItems = async () => {
    const res = await axios.get(`http://localhost:8000/items`)
    dispatch({
      type: GET_MENU_ITEMS,
      payload: res.data
    })
  }

  const getPricingRules = async () => {
    const res = await axios.get(`http://localhost:8000/rules`)
    dispatch({
      type: GET_PRICING_RULES,
      payload: res.data
    })
  }

  const getTotal = () => {
    let co = new Checkout(
      state.pricingRules,
      state.menuItems,
      state.currentCustomerId
    )
    state.cartItems.forEach((i: ShoppingCartItemType) => {
      co.add(i)
    })
    return co.total()
  }

  return (
    <OrderManagementContext.Provider
      value={{
        cartItems: state.cartItems,
        customers: state.customers,
        menuItems: state.menuItems,
        pricingRules: state.pricingRules,
        currentCustomerId: state.currentCustomerId,
        setCurrentCustomer,
        increaseItem,
        decreaseItem,
        getCustomers,
        getMenuItems,
        getPricingRules,
        getTotal
      }}
    >
      {props.children}
    </OrderManagementContext.Provider>
  )
}

export default OrderManagementState
