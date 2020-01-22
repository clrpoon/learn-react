  
import React from 'react';
import 'rbx/index.css';
import { Card, Image, Title, Column, Button } from 'rbx';


const ProductCard = ({ product, addToCart, setCartOpen }) => {
    return (
      <Column size="one-fifth">
        <Card raised>
          <Card.Image>
            <Image.Container>
              <Image class="card-img" src={`data/products/${product.sku}_1.jpg`} />
            </Image.Container>
          </Card.Image>
          <Card.Content>
            <Title size={8}>{product.title}</Title>
            <p size={2}>{product.description} </p>
            <p size={2}>{`$${product.price.toFixed(2)}`} </p>
            <Button.Group>
                <Button onClick ={() => addToCart(product, 'S', setCartOpen)}>S</Button>
                <Button onClick ={() => addToCart(product, 'M', setCartOpen)}>M</Button>
                <Button onClick ={() => addToCart(product, 'L', setCartOpen)}>L</Button>
                <Button onClick ={() => addToCart(product, 'XL', setCartOpen)}>XL</Button>
            </Button.Group>
          </Card.Content>
        </Card>
      </Column>
    );
  };

  








  export default ProductCard;