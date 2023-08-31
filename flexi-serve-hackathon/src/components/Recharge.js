import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { loadStripe } from '@stripe/stripe-js'

const Recharge = () => {
  let order = JSON.parse(sessionStorage.getItem('order'))
  const makePayment = async () => {
    const stripe = await loadStripe(
      'pk_test_51JumLXBPQeAuTgL1NI4yDdkimtENKscd8FBy4LRA4ahqXVEbBRt4VgcobThjBxmwywgTwX1t2PtodBZYjYYp5gbY00cI3NjBn6'
    )

    const body = {
      product: order,
    }
    const headers = {
      'Content-Type': 'application/json',
    }
    const response = await fetch('http://localhost:7000/api/make-payment', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    })

    const session = await response.json()
    if (response.status === 200) {
      const username = sessionStorage.getItem('username')
      fetch('http://localhost:8080/user/' + username)
        .then((res) => {
          return res.json()
        })
        .then((resp) => {
          const { orders } = resp
          const ordersObject =
            orders.length === 0
              ? { ...resp, orders: [order] }
              : { ...resp, orders: [...orders, order] }
          fetch('http://localhost:8080/user/' + username, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(ordersObject),
          })
            .then((res) => {
              console.log('Order updated successfully', res)
            })
            .catch((err) => {
              console.log('Order update failed :' + err.message)
            })
        })
        .catch((err) => {
          console.log('Something went wrong :' + err.message)
        })
    }
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    })
    if (result.error) {
      console.log(result.error)
    }
  }
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h3>Order Summary</h3>
        </div>
        <div className="card-body">
          <table className="table">
            <tbody>
              <tr>
                <th>Date of order</th>
                <td>{order.date}</td>
              </tr>
              <tr>
                <th>Plan</th>
                <td>{order.header}</td>
              </tr>
              <tr>
                <th>Rate</th>
                <td>${order.price}</td>
              </tr>
              <tr>
                <th>Details</th>
                <td>
                  {order.validity} days validity with {order.data}GB Data,{' '}
                  {order.localMins} Local mins, {order.texts} Texts &{' '}
                  {order.internationalMins} Intl mins
                </td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <Button variant="primary" onClick={makePayment}>
              Proceed to pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recharge
