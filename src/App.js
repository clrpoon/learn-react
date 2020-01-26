import React, { useEffect, useState } from 'react';
import { Image, Button, Navbar } from 'rbx';
import ProductGrid from './Components/ProductGrid'; 
import ShoppingCart from './Components/ShoppingCart'
import Sidebar from "react-sidebar"
import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyCErUtGJ_IAWf2BJuIdUjvnpLTsT4cvRGo",
  authDomain: "learnreact-67a27.firebaseapp.com",
  databaseURL: "https://learnreact-67a27.firebaseio.com",
  projectId: "learnreact-67a27",
  storageBucket: "learnreact-67a27.appspot.com",
  messagingSenderId: "1057988748661",
  appId: "1:1057988748661:web:4689e6d5ddbd0b214b9f3c",
  measurementId: "G-ZT7HTKENMW"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.database().ref();

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
   
  // database inventory keeping
  const [inventory, setInventory] = useState({});

  const isInStock = (product, size) =>{
    for (var i = 0; i < Object.keys(inventory).length; i++)
    {
      var curSku = Object.keys(inventory)[i]  
      if (parseInt(curSku) === product.sku) {
        var sizesInStock = inventory[parseInt(curSku)]
        return sizesInStock[size] > 0 ? true: false
      }
    }
    return false
  }
  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) 
      {
        console.log(snap.val())
        setInventory(snap.val());
      }
    };
    db.on("value", handleData, error => alert(error));
    return () => { db.off("value", handleData);};
  }, []);

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


  // app root
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
        addToCart={addToCart}
        isInStock={isInStock}/>
    </Sidebar>
    </React.Fragment>
  );
};

export default App;