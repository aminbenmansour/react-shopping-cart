// styles
import { useQuery } from 'react-query';
// eslint-disable-next-line
import { Wrapper } from './App.styles';

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
const domain = 'https://fakestoreapi.com';

const getProducts = async (): Promise<CartItemType[]> => {
  const res = await (await fetch(`${domain}/products`)).json();
  return res;
};

function App() {
  // eslint-disable-next-line
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);
  return (
    <div className="App" />
  );
}

export default App;
