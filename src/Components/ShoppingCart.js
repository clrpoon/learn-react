import React from 'react';
import 'rbx/index.css';
import { List, Title } from 'rbx';
import ShoppingCartCard from './ShoppingCartCard'


const ShoppingCart = ({ cartItems}) => {
    const shoppingcartstyle = {
        padding: "60px"
      };
      const p = (total, item) => total+(item.product.price*item.qty);
      const totalPrice = cartItems.reduce(p, 0).toFixed(2); //round to two decimals
    return (
        <div style={shoppingcartstyle}>
            <List>
                {cartItems.map(item =>
                <ShoppingCartCard 
                    product={item.product}
                    qty={item.qty}
                    size={item.size}
                />)
                }
            </List>
            <Title>Total: {`$${totalPrice}`}</Title>
        </div>
    );
}

export default ShoppingCart