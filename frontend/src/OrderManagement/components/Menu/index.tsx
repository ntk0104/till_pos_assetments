import './index.scss'
import MenuItem from '../MenuItem'
import MenuItemType from '../../../types/models/menu-item'
import OrderManagementContext from '../../../context/OrderManagement/OrderManagementContext'
import { FC, useContext } from 'react'
import { Col, Row } from 'antd'

const Menu: FC = () => {
  const orderManagementContext = useContext(OrderManagementContext)
  const { menuItems } = orderManagementContext

  return (
    <Row className="menu">
      {menuItems.map((itemData: MenuItemType) => (
        <Col xs={12} md={12} lg={8} key={itemData.id}>
          <MenuItem item={itemData} />
        </Col>
      ))}
    </Row>
  )
}

export default Menu
