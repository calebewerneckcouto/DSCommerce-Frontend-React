import ButtonPrimary from "../../../components/ButtonPrimary";
import ButtonSecond from "../../../components/ButtonSecond";
import * as productService from '../../../services/product-service';

import ProductDetailsCard from "../../../components/ProductDetailsCard";
import './styles.css'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export default function ProductDetails() {
const params = useParams();
const product = productService.findById(Number(params.productId));

  return (
   
      <main>
        <section id="product-details-section" className="dsc-container">
            
            {  product &&
                  <ProductDetailsCard product={product} />
            }
          
          <div className="dsc-btn-page-container">
            <ButtonPrimary text= "Comprar"/>

            <Link to ={"/"}>            <ButtonSecond text= "Inicio"/>
            </Link>

          </div>
        </section>
      </main>
    
  );
}


