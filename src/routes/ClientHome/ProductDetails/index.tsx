import ButtonPrimary from "../../../components/ButtonPrimary";
import ButtonSecond from "../../../components/ButtonSecond";

import ProductDetailsCard from "../../../components/ProductDetailsCard";
import './styles.css';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../components/models/product";
import axios from "axios";

export default function ProductDetails() {
    const { productId } = useParams(); // Extraia o productId dos parâmetros da URL
    const [product, setProduct] = useState<ProductDTO | null>(null); // Inicialize como null para lidar com carregamento
    const params = useParams();
    useEffect(() => {
        if (productId) {
            // Use axios para buscar o produto
            axios.get(`http://localhost:8080/products/${params.productId}`)
                .then(response => {
                    setProduct(response.data); // Atualize o estado com os dados recebidos
                    setProduct(response.data);
                })
                .catch(error => {
                    console.error('Erro ao buscar produto:', error);
                });
        }
    }, []); // Adicione productId como dependência

    return (
        <main>
            <section id="product-details-section" className="dsc-container">
                {product && (
                    <ProductDetailsCard product={product} />
                )}
                <div className="dsc-btn-page-container">
                    <ButtonPrimary text="Comprar" />
                    <Link to="/">
                        <ButtonSecond text="Início" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
