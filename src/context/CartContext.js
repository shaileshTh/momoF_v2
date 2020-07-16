import React, {createContext, useState} from 'react'
import {getCart, saveCart} from '../utils/cart'
import cart from '../pages/cart'

export const CartContext = createContext(null)

export default ({children}) => {
    const [cart, setCart] = useState(getCart())

    const updateCart = (updatedCart) => {
        setCart(updatedCart)
        saveCart(updatedCart)
    }

    const addToCart = (dish, quantity = 1) => {
        const copy = [...cart]
        const indexOfDish = cart.findIndex((alreadyInCart) => 
            alreadyInCart.strapiId === dish.strapiId
        )
    
        if(indexOfDish !== -1){
            copy[indexOfDish].quantity += parseInt(quantity)
    
            if(copy[indexOfDish].quantity === 0){
                copy.splice(indexOfDish, 1)
            }
        }else{
            dish.quantity = parseInt(quantity)
    
            copy.push(dish)
        }
    
        updateCart(copy)
    }

    return(<CartContext.Provider value = {{cart, addToCart}}>
            {children}
        </CartContext.Provider>
    )
}
