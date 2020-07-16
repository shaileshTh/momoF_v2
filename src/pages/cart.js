import React, { useState, useCallback, useContext } from 'react'
import { cartTotal, cartSubtotal, tax} from '../utils/cart'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Checkout from '../components/Checkout'
import {formatPrice} from '../utils/format'
import {CartContext} from '../context/CartContext'

export default () => {

    const {cart, addToCart} = useContext(CartContext)
    console.log("cart", cart)
    console.log("addtocart", addToCart)

    const [, updateState] = useState()
    const forceUpdate = useCallback(() => updateState({}), [])

    const [showCheckout, setShowCheckout] = useState(false)

    return(
        <Layout>
            <SEO title = "cart" />
                <h2 style = {{textAlign:'center'}}>Your Momo Cart</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(dish => (
                            <tr>
                                <td>
                                    <h3>{dish.title}</h3>
                                </td>
                                <td>
                                    <h3>{formatPrice(dish.price_in_cents)}</h3>
                                </td>
                                <td>
                                    <h3>
                                    <span 
                                        onClick = {() => {
                                            addToCart(dish, -1)
                                            forceUpdate()}}
                                        ><a href = "#" style = {{textDecoration: 'none', color:'red'}}>-{'  '}</a></span>
                                    {dish.quantity}
                                    <span 
                                        onClick = {() => {
                                            addToCart(dish, 1)
                                            forceUpdate()
                                        }}
                                        >
                                    <a href = "#" style = {{textDecoration: 'none', color:'green'}}>{' '}+</a></span>                                    
                                    </h3>
                                </td>
                            </tr>
                       
                        ))}
                    </tbody>
                </table>
                <h4 style = {{marginBottom:'.5em'}}>Subtotal: {formatPrice(cartSubtotal(cart))}</h4>
                <h4 style = {{marginBottom:'.5em'}}>8% Tax: {formatPrice(tax(cart))}</h4>
                <h3>Total: {formatPrice(cartTotal(cart))}</h3>
                <div>
                    {cart && cart.length > 0 &&
                        <button
                            onClick = {() => setShowCheckout(true)}
                        >Checkout
                        </button>
                    }
                </div>
                {showCheckout &&
                    <Checkout cart = {cart}/>
                }
        </Layout>
    )
}