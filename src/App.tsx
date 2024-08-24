import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
          display: "flex",
          gap: "1rem"
        }}>
        <Link to="/invoices" style={{ textDecoration: "none", color: "black" }}>
          Invoices
        </Link>
        <Link to="/expenses" style={{ textDecoration: "none", color: "black" }}>
          Expenses
        </Link>
      </nav>

      <Outlet />
    </>
  );
}
