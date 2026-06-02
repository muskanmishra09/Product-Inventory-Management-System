import { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

function Products() {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "",
    producer_id: "",
  });

  const loadProducts = () => {
    axios
      .get("http://localhost:8000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = () => {
    axios
      .post("http://localhost:8000/products", {
        name: formData.name,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category_id: Number(formData.category_id),
        producer_id: Number(formData.producer_id),
      })
      .then(() => {
        alert("Product Added Successfully");
        loadProducts();

        setFormData({
          name: "",
          price: "",
          stock: "",
          category_id: "",
          producer_id: "",
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Failed To Add Product");
      });
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Delete Product?")) return;

    axios
      .delete(`http://localhost:8000/products/${id}`)
      .then(() => {
        alert("Product Deleted");
        loadProducts();
      })
      .catch((err) => {
        console.log(err);
        alert("Delete Failed");
      });
  };

  return (
    <div className="container">
      <h2 className="page-title">Products</h2>

      <div className="card mb-4">
        <h4>Add Product</h4>

        <div className="row">
          <div className="col-md-4 mb-2">
            <input
              className="form-control"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-2">
            <input
              className="form-control"
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-2">
            <input
              className="form-control"
              placeholder="Stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-2">
            <input
              className="form-control"
              placeholder="Category ID"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-2">
            <input
              className="form-control"
              placeholder="Producer ID"
              name="producer_id"
              value={formData.producer_id}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-2">
            <button
              className="btn btn-success w-100"
              onClick={addProduct}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProduct(p.id)}
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

export default Products;