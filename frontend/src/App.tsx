import { Layout } from 'antd'
import './App.scss'
import OrderManagementState from './context/OrderManagement/OrderManagementState'
import OrderManagement from './OrderManagement'

const { Header, Content } = Layout

function App() {
  return (
    <Layout>
      <Header>Pizza Company</Header>
      <Layout>
        <OrderManagementState>
          <Content>
            <OrderManagement />
          </Content>
        </OrderManagementState>
      </Layout>
    </Layout>
  )
}

export default App
