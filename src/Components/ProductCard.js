  
import React from 'react';
import 'rbx/index.css';
import { Card, Image, Title, Column, Button } from 'rbx';
import './ProductCard.css'

const ProductCard = ({ product }) => {
    return (
      <Column size="one-quarter">
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
                <Button>S</Button>
                <Button>M</Button>
                <Button>L</Button>
                <Button>XL</Button>
            </Button.Group>
          </Card.Content>
        </Card>
      </Column>
    );
  };








  export default ProductCard;