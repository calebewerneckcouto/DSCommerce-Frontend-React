import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecond from "../../components/ButtonSecond";
import HeaderClient from "../../components/HeaderClient";
import { ProductDTO } from "../../components/models/product";
import ProductDetailsCard from "../../components/ProductDetailsCard";
import './styles.css'

const product: ProductDTO = {
  id: 2,
  name: "Smart TV",
  description: "TV Bacana Hein!",
  imgUrl: "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg",
  price: 2500.99,
  categories: [
    {
      id: 2,
      name: "Eletrônicos"
    },
    {
      id: 3,
      name: "Computadores"
    },
    {
      id: 4,
      name: "Importados"
    }

  ]
}

export default function ProductDetails() {
  return (
    <>
      <HeaderClient />
      <main>
        <section id="product-details-section" className="dsc-container">

          <ProductDetailsCard product={product} />
          <div className="dsc-btn-page-container">
            <ButtonPrimary text= "Comprar"/>
            <ButtonSecond text= "Inicio"/>
          </div>
        </section>
      </main>
    </>
  );
}


