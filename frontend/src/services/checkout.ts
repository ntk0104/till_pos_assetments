import MenuItemType from '../types/models/menu-item'
import PricingRuleType from '../types/pricing-rule'
import PromotionType from '../types/models/promotion'
import ShoppingCartItemType from '../types/shopping-cart-item'

export class Checkout {
  pricingRules: Array<PromotionType> = []
  menuItems: Array<MenuItemType> = []
  shoppingCartItems: Array<ShoppingCartItemType> = []

  constructor(
    allPricingRules: Array<PricingRuleType>,
    menuItems: Array<MenuItemType>,
    currentCustomerId: number
  ) {
    this.pricingRules =
      allPricingRules.find(
        (x: PricingRuleType) => x.customer_id === currentCustomerId
      )?.rules || []
    this.menuItems = menuItems
  }

  add(item: ShoppingCartItemType) {
    this.shoppingCartItems.push(item)
  }

  getPrice(item: ShoppingCartItemType) {
    const itemRule: PromotionType | null = this.getRule(item.id)
    const pricingItem = this.menuItems.find(
      (x: MenuItemType) => x.id === item.id
    )?.price
    if (!pricingItem) {
      return 0
    }
    if (!itemRule) {
      return pricingItem * item.quantity
    }
    switch (itemRule.promotion_type_id) {
      case 1:
        if (
          !itemRule.get ||
          !itemRule.buy ||
          itemRule.get === 0 ||
          itemRule.buy === 0
        ) {
          return pricingItem * item.quantity
        }
        const remainderPricing = (item.quantity % itemRule.get) * pricingItem
        const modulusPricing =
          Math.floor(item.quantity / itemRule.get) * itemRule.buy * pricingItem
        return remainderPricing + modulusPricing
      case 2:
        return itemRule.price_after_discount
          ? itemRule.price_after_discount * item.quantity
          : 0
      default:
        return pricingItem * item.quantity
    }
  }

  getRule(itemId: number) {
    if (!this.pricingRules || this.pricingRules.length === 0) {
      return null
    }
    return (
      this.pricingRules.find((x: PromotionType) => x.item_id === itemId) || null
    )
  }

  total() {
    return this.shoppingCartItems.reduce(
      (prev: number, current: ShoppingCartItemType) =>
        Math.round((prev + this.getPrice(current)) * 100) / 100,
      0
    )
  }
}
