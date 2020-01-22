  
import React from 'react';
import 'rbx/index.css';
import { Card, Media, Image, Title, Column, Button } from 'rbx';

const ShoppingCartCard = ({ product, size, qty, rmvFromCart }) => {

  return (
    <Card>
      <Button onClick ={() => rmvFromCart(product, size)} style={{float: 'right'}}>-</Button>
      <Media>
        <Media.Item as="figure" align="left">
          <Image.Container as="p" size={64} style={{marginTop:'50%'}}>
            <Image src={`data/products/${product.sku}_2.jpg`} />
          </Image.Container>
        </Media.Item>
          <Card.Content>
            <Title size={8}>{product.title}</Title>
            <p size={2}>Size: {size}</p>
            <p> Quantity: {qty}</p>
            <p size={2}>Price: {`$${product.price.toFixed(2) * qty}`} </p>
          </Card.Content>
      </Media>
    </Card>
  );
  };

  








  export default ShoppingCartCard;