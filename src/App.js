import React, { useEffect, useState } from 'react';
import { Image, Button, Navbar } from 'rbx';
import ProductGrid from './Components/ProductGrid'; 
import ShoppingCart from './Components/ShoppingCart'
import Sidebar from "react-sidebar"

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);


  const [cartOpen, setCartOpen] = useState(false);


  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <React.Fragment>
      <Sidebar
        styles={{sidebar: { backgroundColor: "white" }}}
        sidebar={<ShoppingCart />}
        open={cartOpen}
        pullRight={true}>
      <Navbar>
        <Navbar.Segment align="end">
        { cartOpen?
          ( <Button> <Image onClick ={() => setCartOpen(false)} src={'data/icons/cart.png'} /> </Button>):
          ( <Button> <Image onClick ={() => setCartOpen(true)} src={'data/icons/cart.png'} /> </Button>)
        }
        </Navbar.Segment>
      </Navbar>
      <ProductGrid products={products} />
    </Sidebar>
    </React.Fragment>
  );
};

export default App;