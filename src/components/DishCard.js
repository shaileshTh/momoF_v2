import React, { useState, useContext } from 'react'
import {formatPrice} from '../utils/format'
import {CartContext} from '../context/CartContext'

const DishCard = ({dish}) => {

    const [quantity, setQuantity] = useState(1);
    const {addToCart} = useContext(CartContext)

    return(
        <div>
            <div key = {dish.id}>
            <h2>{dish.title}</h2>
            <p>{dish.description}</p>
            <h3>{formatPrice(dish.price_in_cents)}<br/>
            <input
                type = "number"
                value = {quantity}
                onChange = {(event) => setQuantity(event.target.value)}
                style = {{width:'60px', marginTop:'10px', textAlign:'center'}}
            />{' '}
            <button onClick = {() => addToCart(dish, quantity)}>Add To Cart</button>
            </h3>
            </div>
        </div>
    )
}

export default DishCard
