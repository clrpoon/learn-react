import React from 'react';
import 'rbx/index.css';
import { Container, Column } from 'rbx';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  return (
    <Container id="card-grid">
      <Column.Group vcentered multiline >{products.map(product => <ProductCard key={product.sku} product={product} />)}</Column.Group>
    </Container>
  );
};






export default ProductGrid;