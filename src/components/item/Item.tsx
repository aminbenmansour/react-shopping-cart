/* eslint-disable react/jsx-one-expression-per-line */

import { Button } from '@mui/material';
import { CartItemType } from '../../App';
import { Wrapper } from '../../App.styles';

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

function Item({ item, handleAddToCart }: Props) {
    return (
        <Wrapper>
            <img src={item.image} alt={item.title} />
            <div>
                <h3> {item.title} </h3>
                <p> {item.description} </p>
                <h4> ${item.price} </h4>
            </div>
            <Button onClick={() => handleAddToCart(item)}> Add item to cart </Button>
        </Wrapper>
    );
}

export default Item;
