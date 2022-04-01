import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
)

app.get('/promotion-types', (req: Request, res: Response) => {
  res.json({
    result: [
      { id: 1, name: 'deal' },
      { id: 2, name: 'discount' }
    ]
  })
})

app.get('/customers', (req: Request, res: Response) => {
  res.json({
    result: [
      { id: 1, name: 'Default' },
      { id: 2, name: 'Microsoft' },
      { id: 3, name: 'Amazon' },
      { id: 4, name: 'Facebook' }
    ]
  })
})

app.get('/items', (req: Request, res: Response) => {
  res.json({
    result: [
      {
        id: 1,
        name: 'Small Pizza',
        desc: "10' pizza for one person",
        img: 'https://media.istockphoto.com/photos/tasty-delicious-pizza-food-on-a-black-background-picture-id1189887005?k=20&m=1189887005&s=612x612&w=0&h=awpP8SrvtTgrC96uooRbdvLdayxQExcm0nLCCQJlYJ8=',
        price: 11.99
      },
      {
        id: 2,
        name: 'Medium Pizza',
        desc: "12' pizza for two person",
        img: 'https://thumbs.dreamstime.com/b/isolated-round-pizza-black-background-tomatoes-aside-space-text-enlargement-italian-style-recepies-authentic-fresh-175907270.jpg',
        price: 15.99
      },
      {
        id: 3,
        name: 'Large Pizza',
        desc: "15' pizza for four person",
        img: 'https://thumbs.dreamstime.com/b/isolated-round-pizza-black-background-tomatoes-aside-space-text-enlargement-italian-style-recepies-authentic-fresh-175907270.jpg',
        price: 21.99
      }
    ]
  })
})

app.get('/rules', (req: Request, res: Response) => {
  res.json({
    result: [
      {
        customer_id: 2,
        rules: [
          {
            promotion_type_id: 1,
            item_id: 1,
            buy: 2,
            get: 3
          }
        ]
      },
      {
        customer_id: 3,
        rules: [
          {
            promotion_type_id: 2,
            item_id: 3,
            price_after_discount: 19.99
          }
        ]
      },
      {
        customer_id: 4,
        rules: [
          {
            promotion_type_id: 1,
            item_id: 2,
            buy: 4,
            get: 5
          }
        ]
      }
    ]
  })
})

interface MenuItemType {
  id: number
  name: string
  price: number
}

interface PricingRuleType {
  customer_id: number
  rules: Array<PromotionType>
}

interface PromotionType {
  promotion_type_id: number
  item_id: number
  buy?: number
  get?: number
  price_after_discount?: number
}

interface ShoppingCartItemType {
  id: number
  qty: number
}

app.get('/total', (req: Request, res: Response) => {
  const menuItems: Array<MenuItemType> = [
    { id: 1, name: 'Small Pizza', price: 11.99 },
    { id: 2, name: 'Medium Pizza', price: 15.99 },
    { id: 3, name: 'Large Pizza', price: 21.99 }
  ]
  const allPricingRules: Array<PricingRuleType> = [
    {
      customer_id: 2,
      rules: [
        {
          promotion_type_id: 1,
          item_id: 1,
          buy: 2,
          get: 3
        }
      ]
    },
    {
      customer_id: 3,
      rules: [
        {
          promotion_type_id: 2,
          item_id: 3,
          price_after_discount: 19.99
        }
      ]
    },
    {
      customer_id: 4,
      rules: [
        {
          promotion_type_id: 1,
          item_id: 2,
          buy: 4,
          get: 5
        }
      ]
    }
  ]

  const currentCustomerId = 3

  class Checkout {
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
        return pricingItem * item.qty
      }
      switch (itemRule.promotion_type_id) {
        case 1:
          if (
            !itemRule.get ||
            !itemRule.buy ||
            itemRule.get === 0 ||
            itemRule.buy === 0
          ) {
            return 0
          }
          const remainderPricing = (item.qty % itemRule.get) * pricingItem
          const modulusPricing =
            Math.floor(item.qty / itemRule.get) * itemRule.buy * pricingItem
          return remainderPricing + modulusPricing
        case 2:
          return itemRule.price_after_discount
            ? itemRule.price_after_discount * item.qty
            : 0
        default:
          return pricingItem * item.qty
      }
    }

    getRule(itemId: number) {
      if (!this.pricingRules || this.pricingRules.length === 0) {
        return null
      }
      return (
        this.pricingRules.find((x: PromotionType) => x.item_id === itemId) ||
        null
      )
    }

    total() {
      return this.shoppingCartItems.reduce(
        (prev: number, current: ShoppingCartItemType) => {
          return prev + this.getPrice(current)
        },
        0
      )
    }
  }

  let co = new Checkout(allPricingRules, menuItems, currentCustomerId)
  co.add({ id: 1, qty: 3 })
  co.add({ id: 2, qty: 2 })
  co.add({ id: 3, qty: 1 })
  res.json({ total: co.total() })
})
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
