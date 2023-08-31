import { useEffect, useState } from 'react'

const OrderHistory = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrderHistory()
  }, [])

  const fetchOrderHistory = () => {
    fetch('http://localhost:8080/user/' + sessionStorage.getItem('username'))
      .then((res) => {
        if (!res.ok) {
          return {}
        }
        return res.json()
      })
      .then((res) => {
        setOrders(res?.orders)
      })
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h3>Order History</h3>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <th>Order ID</th>
                <th>Date of order</th>
                <th>Plan</th>
                <th>Rate</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {orders?.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.header}</td>
                    <td>{order.price}</td>
                    <td>
                      {order.validity} days validity with {order.data}GB Data,{' '}
                      {order.localMins} Local mins, {order.texts} Texts &{' '}
                      {order.internationalMins} Intl mins
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} align="center">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
