import { Alert, Card, Radio, Table } from 'antd'
import { FC, useContext } from 'react'
import OrderManagementContext from '../../../context/OrderManagement/OrderManagementContext'
import Customer from '../../../types/models/customer'
import ShoppingCartItemType from '../../../types/shopping-cart-item'
import PromotionType from '../../../types/models/promotion'
import MenuItemType from '../../../types/models/menu-item'
import PricingRuleType from '../../../types/pricing-rule'

import './index.scss'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'age'
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: 'Unit Price',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: 'Subtotal',
    key: '',
    dataIndex: '',
    render: (item: ShoppingCartItemType) => {
      return <>{(item.price * item.quantity).toFixed(2)}</>
    }
  }
]

const ShoppingCart: FC = () => {
  const orderManagementContext = useContext(OrderManagementContext)
  const { menuItems, cartItems, pricingRules, customers, currentCustomerId } =
    orderManagementContext
  const onCustomerTypeChange = (e: any) => {
    orderManagementContext.setCurrentCustomer(e.target.value)
  }

  const getPromotionText = (rule: PromotionType) => {
    const pizzaName = menuItems.find(
      (i: MenuItemType) => i.id === rule.item_id
    )?.name
    let promotionText = ''
    switch (rule.promotion_type_id) {
      case 1:
        promotionText = `Gets a ${rule.get} for ${rule.buy} deal ${pizzaName} `
        break
      case 2:
        promotionText = `Gets a discount on ${pizzaName} where the price drops to $${rule.price_after_discount} per pizza`
        break
    }
    return promotionText
  }
  return (
    <div className="site-card-border-less-wrapper cart">
      <Card title="Shopping Cart" bordered={false}>
        <p>Select Customer</p>
        <Radio.Group onChange={onCustomerTypeChange} value={currentCustomerId}>
          {customers.map((customer: Customer) => {
            return (
              <Radio key={customer.id} value={customer.id}>
                {customer.name}
              </Radio>
            )
          })}
        </Radio.Group>
        {pricingRules
          .find((x: PricingRuleType) => x.customer_id === currentCustomerId)
          ?.rules.map((rule: PromotionType) => (
            <Alert
              key={rule.promotion_type_id}
              message={getPromotionText(rule)}
              type="success"
            />
          ))}
        <div className="cart__list-items">
          <Table
            columns={columns}
            dataSource={cartItems}
            pagination={false}
            footer={() => {
              return (
                <div element-test="total">{`Total: ${orderManagementContext.getTotal()} $`}</div>
              )
            }}
          />
        </div>
      </Card>
    </div>
  )
}

export default ShoppingCart
