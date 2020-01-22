import React, { useEffect, useState } from 'react';
import { Image, Button, Navbar } from 'rbx';
import ProductGrid from './Components/ProductGrid'; 
import ShoppingCart from './Components/ShoppingCart'
import Sidebar from "react-sidebar"

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  // CART LOGIC
  const [cartOpen, setCartOpen] = useState(false); //sidebar collaspe states
  const [cartItems, setCartItems] = useState([]); //cart items state

  const addToCart = (product, size, setCardOpen) => {
    setCardOpen(true)
    const index = cartItems.findIndex(item => item.product.sku === product.sku && item.size === size); //check for item AND size match
    let newCartItems;
    if (index >= 0) //item in cart, update qty
    { 
      const item = cartItems[index];
      newCartItems = [...cartItems.slice(0, index), {product, size, qty: item.qty + 1}, ...cartItems.slice(index + 1)];
    } 
    else //item not in cart, add to end
    { 
      newCartItems = [...cartItems, {product, size, qty: 1}];
    }
    setCartItems(newCartItems);
  };
 
  const rmvFromCart = (product, size) => {
    const itemIndex = cartItems.findIndex(item => item.product === product && item.size === size); //check for item AND size match
    const item = cartItems[itemIndex];
    let newCartItems;
    if 
    (item.qty === 1) 
    {
      newCartItems = [...cartItems.slice(0, itemIndex),...cartItems.slice(itemIndex + 1)]; //remove if only 1
    } 
    else 
    {
      newCartItems = [...cartItems.slice(0, itemIndex),{product, size, qty: item.qty - 1}, ...cartItems.slice(itemIndex + 1)]; //decrement otherwise
    }
    setCartItems(newCartItems);
  };

  // root
  return (
    <React.Fragment>
      <Sidebar
        styles={{sidebar: { backgroundColor: "white" }}}
        sidebar={
          <ShoppingCart 
            cartItems={cartItems}
            rmvFromCart={rmvFromCart}/>
        }
        open={cartOpen}
        pullRight={true}
      >
      <Navbar>
        <Navbar.Segment align="end">
        { cartOpen?
          ( <Button> <Image onClick ={() => setCartOpen(false)} src={'data/icons/cart.png'} /> </Button>):
          ( <Button> <Image onClick ={() => setCartOpen(true)} src={'data/icons/cart.png'} /> </Button>)
        }
        </Navbar.Segment>
      </Navbar>
      <ProductGrid 
        products={products} 
        setCartOpen={setCartOpen} 
        addToCart={addToCart}/>
    </Sidebar>
    </React.Fragment>
  );
};

export default App;