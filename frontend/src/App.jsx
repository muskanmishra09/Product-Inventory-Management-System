import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-dark bg-dark px-4">
          <span className="navbar-brand">
            Inventory Management System
          </span>

          <div>
            <Link className="btn btn-outline-light mx-2" to="/">
              Dashboard
            </Link>

            <Link className="btn btn-outline-light mx-2" to="/products">
              Products
            </Link>

            <Link className="btn btn-outline-light mx-2" to="/customers">
              Customers
            </Link>

            <Link className="btn btn-outline-light mx-2" to="/orders">
              Orders
            </Link>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;