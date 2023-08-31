import React from "react";
import Button from "react-bootstrap/esm/Button";

const Recharge = () => {
  let order = JSON.parse(sessionStorage.getItem("order"));
  console.log(order);
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
                {order.validity} validity with {order.data}, {order.localMins}{" "}
                local mins, {order.texts} texts & {order.internationalMins} intl
                mins
              </td>
            </tr>
          </table>
          <div className="d-flex justify-content-center">
            <Button variant="primary">Proceed to pay</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
