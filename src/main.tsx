import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Expenses from './routes/Expenses'
import Invoices from './routes/Invoices'
import NotFound from './routes/NotFound'
import Invoice from './routes/Invoices/Invoice'
import InvoicesIndex from './routes/Invoices/InvoicesIndex'
import Welcome from './routes/Welcome'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        <Route index element={<Welcome />} />
        
          <Route path="expenses" element={<Expenses />} />
          <Route path="invoices" element={<Invoices />} >

            <Route
              index
              element={<InvoicesIndex />} />

            <Route path=":invoiceId" element={<Invoice />} />
          </Route>
          <Route
            path="*"
            element={
              <NotFound />
            } />
        </Route>


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)