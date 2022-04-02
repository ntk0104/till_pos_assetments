import { rest } from 'msw'
import FIXTURES from '../fixtures'

export const handlers = [
  rest.get('http://localhost:8000/items', (req, res, ctx) => {
    ctx.json(FIXTURES.menuItems)
  }),
  rest.get('http://localhost:8000/customers', (req, res, ctx) => {
    ctx.json(FIXTURES.customers)
  }),
  rest.get('http://localhost:8000/rules', (req, res, ctx) => {
    ctx.json(FIXTURES.rules)
  })
]
