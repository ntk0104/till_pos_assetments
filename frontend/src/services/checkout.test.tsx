import { Checkout } from './checkout'
import FIXTURES from '../fixtures'

describe('Checkout Tests', () => {
  test('init with correct default states', () => {
    let co = new Checkout([], [], 0)
    expect(co.menuItems).toStrictEqual([])
    expect(co.pricingRules).toStrictEqual([])
    expect(co.shoppingCartItems).toStrictEqual([])
  })

  test('init with correct input states', () => {
    let co = new Checkout(
      FIXTURES.rules,
      FIXTURES.menuItems,
      FIXTURES.customers[1].id
    )
    expect(co.menuItems).toStrictEqual(FIXTURES.menuItems)
    expect(co.pricingRules).toStrictEqual(FIXTURES.rules[0].rules)
    expect(co.shoppingCartItems).toStrictEqual([])
  })

  test('add single item should push item into shoppingCartItems', () => {
    let co = new Checkout(
      FIXTURES.rules,
      FIXTURES.menuItems,
      FIXTURES.customers[1].id
    )
    co.add({ ...FIXTURES.menuItems[0], quantity: 1 })
    expect(co.shoppingCartItems).toHaveLength(1)
    expect(co.shoppingCartItems[0].id).toStrictEqual(1)
    expect(co.shoppingCartItems[0].quantity).toStrictEqual(1)
  })

  test('add item with quantity 2 should push item into shoppingCartItems with quantity equal 2', () => {
    let co = new Checkout(
      FIXTURES.rules,
      FIXTURES.menuItems,
      FIXTURES.customers[1].id
    )
    co.add({ ...FIXTURES.menuItems[0], quantity: 2 })
    expect(co.shoppingCartItems).toHaveLength(1)
    expect(co.shoppingCartItems[0].id).toStrictEqual(1)
    expect(co.shoppingCartItems[0].quantity).toStrictEqual(2)
  })

  test('add 2 different items should push 2 items into shoppingCartItems', () => {
    let co = new Checkout(
      FIXTURES.rules,
      FIXTURES.menuItems,
      FIXTURES.customers[1].id
    )
    co.add({ ...FIXTURES.menuItems[0], quantity: 2 })
    co.add({ ...FIXTURES.menuItems[1], quantity: 2 })
    expect(co.shoppingCartItems).toHaveLength(2)
    expect(co.shoppingCartItems[0].id).toStrictEqual(1)
    expect(co.shoppingCartItems[0].quantity).toStrictEqual(2)
    expect(co.shoppingCartItems[1].id).toStrictEqual(2)
    expect(co.shoppingCartItems[1].quantity).toStrictEqual(2)
  })

  test('getRule should return null when currentCustomerId invalid', () => {
    let co = new Checkout(FIXTURES.rules, FIXTURES.menuItems, 10)
    const rule = co.getRule(FIXTURES.menuItems[0].id)
    expect(rule).toStrictEqual(null)
  })

  test('getRule should return correct rule when currentCustomerId valid and have promotion with input itemId', () => {
    let co = new Checkout(
      FIXTURES.rules,
      FIXTURES.menuItems,
      FIXTURES.customers[1].id
    )
    const rule = co.getRule(FIXTURES.menuItems[0].id)
    expect(rule).toStrictEqual(FIXTURES.rules[0].rules[0])
  })

  test('getRule should return null when currentCustomerId valid and not have promotion with input itemId', () => {
    let co = new Checkout(
      FIXTURES.rules,
      FIXTURES.menuItems,
      FIXTURES.customers[1].id
    )
    const rule = co.getRule(FIXTURES.menuItems[1].id)
    expect(rule).toStrictEqual(null)
  })

  test('getPrice invalid item - not in menuItems should return 0', () => {
    let co = new Checkout(
      FIXTURES.rules,
      FIXTURES.menuItems,
      FIXTURES.customers[1].id
    )
    const invalidItem = { ...FIXTURES.menuItems[0], quantity: 2, id: 10 }
    const price = co.getPrice(invalidItem)
    expect(price).toStrictEqual(0)
  })

  test('getPrice non-promotion item - not in promotion rule should return qty * price', () => {
    let co = new Checkout(
      FIXTURES.rules,
      FIXTURES.menuItems,
      FIXTURES.customers[1].id
    )
    const nonPromotionItem = { ...FIXTURES.menuItems[2], quantity: 3 }
    const price = co.getPrice(nonPromotionItem)
    expect(price).toStrictEqual(
      nonPromotionItem.price * nonPromotionItem.quantity
    )
  })

  test('getPrice for default customer', () => {
    let co = new Checkout(
      FIXTURES.rules,
      FIXTURES.menuItems,
      FIXTURES.customers[0].id
    )
    const nonPromotionItem = { ...FIXTURES.menuItems[2], quantity: 3 }
    const price = co.getPrice(nonPromotionItem)
    expect(price).toStrictEqual(
      nonPromotionItem.price * nonPromotionItem.quantity
    )
  })

  test('getPrice for promotion_type: deal (gets a 3 for 2 deal small pizzas) - Microsoft 3 x small pizza', () => {
    let co = new Checkout(
      FIXTURES.rules,
      FIXTURES.menuItems,
      FIXTURES.customers[1].id
    )
    const items = { ...FIXTURES.menuItems[0], quantity: 3 }
    const price = co.getPrice(items)
    expect(price).toStrictEqual(FIXTURES.menuItems[0].price * 2)
  })

  test('getPrice for promotion_type: discount (Gets a discount on Large Pizza where the price drops to $19.99 per pizza)', () => {
    let co = new Checkout(
      FIXTURES.rules,
      FIXTURES.menuItems,
      FIXTURES.customers[2].id
    )
    const items = { ...FIXTURES.menuItems[2], quantity: 1 }
    const price = co.getPrice(items)
    expect(price).toStrictEqual(19.99)
  })
})
