import React from 'react';
import 'rbx/index.css';
import { Container, Column } from 'rbx';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, setCartOpen, addToCart }) => {
  return (
    <Container >
      <Column.Group vcentered multiline >
        {products.map(product => <ProductCard product={product} setCartOpen={setCartOpen} addToCart={addToCart}/>)}</Column.Group>
    </Container>
  );
};






export default ProductGrid;