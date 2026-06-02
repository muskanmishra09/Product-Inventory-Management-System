import { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  const [formData, setFormData] = useState({
    customer_id: "",
    product_id: "",
    quantity: "",
  });

  const loadOrders = () => {
    axios
      .get("http://localhost:8000/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createOrder = () => {
    axios
      .post("http://localhost:8000/orders", {
        customer_id: Number(formData.customer_id),
        product_id: Number(formData.product_id),
        quantity: Number(formData.quantity),
      })
      .then(() => {
        alert("Order Created Successfully");

        setFormData({
          customer_id: "",
          product_id: "",
          quantity: "",
        });

        loadOrders();
      })
      .catch((err) => {
        console.log(err);
        alert("Failed To Create Order");
      });
  };

  return (
    <div className="container">
      <h2 className="page-title">Orders</h2>

      <div className="card mb-4">
        <h4>Create Order</h4>

        <div className="row">
          <div className="col-md-4 mb-2">
            <input
              className="form-control"
              placeholder="Customer ID"
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-2">
            <input
              className="form-control"
              placeholder="Product ID"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-2">
            <input
              className="form-control"
              placeholder="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-2">
            <button
              className="btn btn-primary"
              onClick={createOrder}
            >
              Create Order
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Total Amount</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer_id}</td>
                <td>{order.product_id}</td>
                <td>{order.quantity}</td>
                <td>₹{order.total_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;