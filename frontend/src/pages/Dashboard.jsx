import { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

function Dashboard() {
  return (
    <div className="container">
      <h2 className="page-title">Dashboard</h2>

      <div className="dashboard-grid">

        <div className="dashboard-card blue">
          <h1>2</h1>
          <p>Total Products</p>
        </div>

        <div className="dashboard-card green">
          <h1>2</h1>
          <p>Total Customers</p>
        </div>

        <div className="dashboard-card orange">
          <h1>2</h1>
          <p>Total Orders</p>
        </div>

        <div className="dashboard-card red">
          <h1>2</h1>
          <p>Low Stock Products</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;