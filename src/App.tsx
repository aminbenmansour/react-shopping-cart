
// styles
import { useQuery } from "react-query";
import { Wrapper } from "./App.styles";
//types

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

const getProducts = async (): Promise<CartItemType[]> => await (await fetch(`${domain}/products`)).json()

const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);
  console.log(data);
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
