import { Link, Outlet } from "react-router-dom";
import { getInvoices } from "../../data";

export default function Invoices() {
  let invoices = getInvoices();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
          display: "flex",
          flexDirection: "column", // Alinha os itens verticalmente
          width: "200px" // Define uma largura fixa para a barra de navegação
        }}
      >
        {invoices.map((invoice) => (
          <Link
            style={{
              display: "block",
              margin: "1rem 0",
              textDecoration: "none", // Remove o sublinhado padrão
              color: "black" // Define a cor do texto
            }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </Link>
        ))}
      </nav>
      <Outlet/>
    </div>
  );
}
