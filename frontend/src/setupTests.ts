// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { rest } from 'msw'
import { server } from './mocks/server'
// import axios from 'axios'

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {}
    }
  }

beforeAll(() => {
  // axios.defaults.adapter = require('axios/lib/adapters/http');
  server.listen()
})
afterEach(() => {
  server.resetHandlers(
    rest.get('http://localhost:8000/items', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
    rest.get('http://localhost:8000/customers', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
    rest.get('http://localhost:8000/rules', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )
})
afterAll(() => server.close())
