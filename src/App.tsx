import {
 Badge, Drawer, Grid, LinearProgress,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { StyledButton, Wrapper } from './App.styles';

import Item from './components/Item/Item';

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getTotalItems = (items: CartItemType[]) => null;

  const handleAddToCart = () => null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRemoveFromCart = () => null;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        Cart goes here
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
