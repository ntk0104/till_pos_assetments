/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row } from 'antd'
import { useContext, useEffect } from 'react'
import OrderManagementContext from '../context/OrderManagement/OrderManagementContext'
import Menu from './components/Menu'
import ShoppingCart from './components/ShoppingCart'
import './index.scss'

export default function OrderManagement() {
  const orderManagementContext = useContext(OrderManagementContext)
  useEffect(() => {
    Promise.all([
      orderManagementContext.getCustomers(),
      orderManagementContext.getMenuItems(),
      orderManagementContext.getPricingRules()
    ])
  }, [])

  return (
    <Row>
      <Col xs={24} md={12}>
        <Menu />
      </Col>
      <Col xs={24} md={12}>
        <ShoppingCart />
      </Col>
    </Row>
  )
}
