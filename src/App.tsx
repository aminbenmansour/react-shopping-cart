import {
  Badge, Drawer, Grid, LinearProgress,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { StyledButton, Wrapper } from './App.styles';

import Item from './components/Item/Item';
import Cart from './components/Cart/Cart';

// types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

export const domain = 'https://fakestoreapi.com';

const getProducts = async (): Promise<CartItemType[]> => {
  const res = await (await fetch(`${domain}/products`)).json();
  return res;
};

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  // eslint-disable-next-line
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);

  if (isLoading) return <LinearProgress />;
  if (error) return <div>something went wrong ...</div>;

  const getTotalItems = (items: CartItemType[]) => (
    items.reduce((ack: number, item) => ack + item.amount, 0)
  );

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        // eslint-disable-next-line max-len
        return prev.map((item) => (item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item));
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        }
          return [...ack, item];
      }, [] as CartItemType[]));
  };

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>

        {/* eslint-disable-next-line max-len */}
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>

      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {
          // eslint-disable-next-line arrow-parens
          data?.map(item => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))
        }
      </Grid>
    </Wrapper>
  );
}

export default App;
