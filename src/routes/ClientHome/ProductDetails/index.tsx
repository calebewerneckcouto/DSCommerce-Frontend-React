import ButtonPrimary from "../../../components/ButtonPrimary";
import ButtonSecond from "../../../components/ButtonSecond";

import ProductDetailsCard from "../../../components/ProductDetailsCard";
import './styles.css';
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProductDTO } from "../../../components/models/product";
import * as productService from '../../../services/product-service'
import * as cartService from '../../../services/cart-service';
import { ContextCartCount } from "../../../utils/context-cart";

export default function ProductDetails() {
    const { productId } = useParams(); // Extraia o productId dos parâmetros da URL
    const { setContextCartCount } = useContext(ContextCartCount);
    const [product, setProduct] = useState<ProductDTO | null>(null); // Inicialize como null para lidar com carregamento
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (productId) {
            // Use axios para buscar o produto
            productService.findById(Number(params.productId))
                .then(response => {
                    setProduct(response.data);
                    setProduct(response.data);
                })
                .catch(() => {

                    navigate("/");
                });
        }
    }, []);

    function handleBuyClick() {
        if (product) {
            cartService.addProduct(product);
            setContextCartCount(cartService.getCart().items.length);
            navigate("/cart");
        }


    }

    return (
        <main>
            <section id="product-details-section" className="dsc-container">
                {product && (
                    <ProductDetailsCard product={product} />
                )}
                <div className="dsc-btn-page-container">
                    <div onClick={handleBuyClick}>
                        <ButtonPrimary text="Comprar" />
                    </div>

                    <Link to="/">
                        <ButtonSecond text="Início" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
