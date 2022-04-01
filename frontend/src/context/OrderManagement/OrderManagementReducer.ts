import {
  SET_CURRENT_CUSTOMER,
  INCREASE_ITEM,
  DECREASE_ITEM,
  GET_CUSTOMERS,
  GET_MENU_ITEMS,
  GET_PRICING_RULES
} from '../types'
import _ from 'lodash'
import OrderManagementActionType from '../../types/order-management-action'
import ShoppingCartItemType from '../../types/shopping-cart-item'

const orderManagementReducer = (
  state: any,
  action: OrderManagementActionType
) => {
  const listItemsTmp = _.cloneDeep(state.cartItems)
  switch (action.type) {
    case INCREASE_ITEM:
      const increasedItem = action.payload
      const increasedItemIndex = listItemsTmp.findIndex(
        (item: ShoppingCartItemType) => item.id === increasedItem.id
      )
      if (increasedItemIndex > -1) {
        listItemsTmp[increasedItemIndex].quantity += 1
      } else {
        listItemsTmp.push({
          ...increasedItem,
          quantity: 1
        })
      }
      return {
        ...state,
        cartItems: listItemsTmp
      }
    case DECREASE_ITEM:
      const decreasedItem = action.payload
      const decreasedItemIndex = listItemsTmp.findIndex(
        (item: ShoppingCartItemType) => item.id === decreasedItem.id
      )
      if (decreasedItemIndex > -1) {
        if (listItemsTmp[decreasedItemIndex].quantity > 1) {
          listItemsTmp[decreasedItemIndex].quantity -= 1
        } else {
          _.pullAt(listItemsTmp, decreasedItemIndex)
        }
      }
      return {
        ...state,
        cartItems: listItemsTmp
      }
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload.result
      }
    case GET_MENU_ITEMS:
      return {
        ...state,
        menuItems: action.payload.result
      }
    case GET_PRICING_RULES:
      return {
        ...state,
        pricingRules: action.payload.result
      }
    case SET_CURRENT_CUSTOMER:
      return {
        ...state,
        currentCustomerId: action.payload
      }
    default:
      return state
  }
}

export default orderManagementReducer
