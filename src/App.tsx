import { Grid, LinearProgress } from '@mui/material';
import { useQuery } from 'react-query';
import { Wrapper } from './App.styles';

import Item from './components/item/Item';
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
  // eslint-disable-next-line
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);

  if (isLoading) return <LinearProgress />;
  if (error) return <div>something went wrong ...</div>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getTotalItems = () => null;

  const handleAddToCart = () => null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRemoveFromCart = () => null;

  return (
    <Wrapper>
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
