import React from 'react'
import Button from 'react-bootstrap/esm/Button'
// import { useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js'

const Recharge = () => {
  let order = JSON.parse(sessionStorage.getItem('order'))
  // const navigate = useNavigate();
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
            <tr>
              <th>Order ID</th>
              <td>{order.orderId}</td>
            </tr>
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
              <td>{order.price}</td>
            </tr>
            <tr>
              <th>Details</th>
              <td>
                {order.validity} validity with {order.data}, {order.localMins}{' '}
                local mins, {order.texts} texts & {order.internationalMins} intl
                mins
              </td>
            </tr>
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
