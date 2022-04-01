import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { FC, useContext, useState } from 'react'
import MenuItem from '../../../types/models/menu-item'
import OrderManagementContext from '../../../context/OrderManagement/OrderManagementContext'
import './index.scss'

const { Meta } = Card

interface MenuItemPropType {
  item: MenuItem
}

const Menu: FC<MenuItemPropType> = ({ item = {} }) => {
  const orderManagementContext = useContext(OrderManagementContext)

  const [quantity, setQuantity] = useState(0)

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
    orderManagementContext.increaseItem(item)
  }

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
      orderManagementContext.decreaseItem(item)
    }
  }
  return (
    <div className="menu__item" element-test={item.name}>
      <Card
        cover={
          <div className="image_cover">
            <img alt="example" src={item.img} className="item_cover_img" />
          </div>
        }
        actions={[
          <MinusCircleOutlined
            onClick={decreaseQuantity}
            style={{ color: 'red' }}
            key="decrease"
          />,
          <div>{quantity}</div>,
          <PlusCircleOutlined
            onClick={increaseQuantity}
            style={{ color: 'green' }}
            key="increase"
          />
        ]}
      >
        <Meta title={item.desc} description={`Price: ${item.price} $`} />
      </Card>
    </div>
  )
}

export default Menu
