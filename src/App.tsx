import {  Navigate, Route, Routes } from "react-router-dom";
import ProductDetails from "./routes/ClientHome/ProductDetails";
import ClientHome from "./routes/ClientHome";
import Catalog from "./routes/ClientHome/Catalog";
import Cart from "./routes/ClientHome/Cart";
import { useState } from "react";
import { ContextCartCount } from "./utils/context-cart";
import Login from "./routes/ClientHome/Login";
import AdminHome from "./routes/Admin/AdminHome";
import Admin from "./routes/Admin";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import{history} from './utils/history';


export default function App() {
  const [contextCartCount, setContextCartCount] = useState<number>(0);

  return (
    <ContextCartCount.Provider value={{ contextCartCount, setContextCartCount }}>
      <HistoryRouter history={history}>
        <Routes>
          {/* Rotas para o cliente */}
          <Route path="/" element={<ClientHome />}>
            <Route index element={<Catalog />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="product-details/:productId" element={<ProductDetails />} />
          </Route>

          {/* Rotas para o admin */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminHome />} />
          </Route>

          {/* Redirecionamento de rota não encontrada */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ HistoryRouter>
    </ContextCartCount.Provider>
  );
}
