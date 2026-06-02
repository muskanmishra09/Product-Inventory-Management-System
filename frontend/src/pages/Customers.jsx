import { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  const loadCustomers = () => {
    axios
      .get("http://localhost:8000/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addCustomer = () => {
    axios
      .post("http://localhost:8000/customers", formData)
      .then(() => {
        alert("Customer Added Successfully");

        setFormData({
          full_name: "",
          email: "",
          phone: "",
        });

        loadCustomers();
      })
      .catch((err) => {
        console.log(err);
        alert("Failed To Add Customer");
      });
  };

  const deleteCustomer = (id) => {
    if (!window.confirm("Delete Customer?")) return;

    axios
      .delete(`http://localhost:8000/customers/${id}`)
      .then(() => {
        alert("Customer Deleted");
        loadCustomers();
      })
      .catch((err) => {
        console.log(err);
        alert("Delete Failed");
      });
  };

  return (
    <div className="container">
      <h2 className="page-title">Customers</h2>
      <h2>Total Customers: {customers.length}</h2>

      <div className="card mb-4">
        <h4>Add Customer</h4>

        <div className="row">
          <div className="col-md-4 mb-2">
            <input
              className="form-control"
              placeholder="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-2">
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-2">
            <input
              className="form-control"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-2">
            <button
              className="btn btn-success"
              onClick={addCustomer}
            >
              Add Customer
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.full_name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCustomer(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;