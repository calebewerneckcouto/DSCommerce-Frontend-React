import { useEffect, useState } from 'react';
import './styles.css';
import * as cartService from '../../../services/cart-service';
import { OrderDTO, OrderItemDTO } from '../../../components/models/order';

const item1 = new OrderItemDTO(
  4, 1, "Pc Gamer", 1200, "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/4-big.jpg"
);

const item2 = new OrderItemDTO(
  5, 2, "Rails for Dummies", 100.99, "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/5-big.jpg"
);

export default function Cart() {

  const [cart,setCart] = useState<OrderDTO>(cartService.getCart());

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <main>
      <section id="cart-container-section" className="dsc-container">
        <div className="dsc-card dsc-mb20">
          {cart.items.map(item => (
            <div key={item.productId} className="dsc-cart-item-container dsc-line-bottom">
              <div className="dsc-cart-item-left">
                <img src={item.imgUrl} alt={item.name} />
                <div className="dsc-cart-item-description">
                  <h3>{item.name}</h3>
                  <div className="dsc-cart-item-quantity-container">
                    <div className="dsc-cart-item-quantity-btn">-</div>
                    <p>{item.quantity}</p>
                    <div className="dsc-cart-item-quantity-btn">+</div>
                  </div>
                </div>
              </div>
              <div className="dsc-cart-item-right">
                R$ {item.price * item.quantity},00
              </div>
            </div>
          ))}
          
          <div className="dsc-cart-total-container">
            <h3>R$ {calculateTotal().toFixed(2).replace('.', ',')}</h3>
          </div>
        </div>
        <div className="dsc-btn-page-container">
          <div className="dsc-btn dsc-btn-blue">
            Finalizar pedido
          </div>
          <div className="dsc-btn dsc-btn-white">
            Continuar comprando
          </div>
        </div>
      </section>
    </main>
  );
}
