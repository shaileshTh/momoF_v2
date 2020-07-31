import React, { useState, useCallback, useContext } from 'react'
import { cartTotal, cartSubtotal, tax} from '../utils/cart'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Checkout from '../components/Checkout'
import {formatPrice} from '../utils/format'
import {CartContext} from '../context/CartContext'
import { Link } from "gatsby"
import Emoji from '../components/Emoji'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'


export default () => {

    const {cart, addToCart} = useContext(CartContext)
    // console.log("cart", cart)
    // console.log("addtocart", addToCart)

    const [, updateState] = useState()
    const forceUpdate = useCallback(() => updateState({}), [])
    const [showCheckout, setShowCheckout] = useState(false)
    return(
        <Layout>
            <SEO title = "cart" />
                <h2 style = {{textAlign:'center'}}>Your Momo Cart</h2>
                {cart && cart.length > 0 &&
                <>
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
                                <h3>{dish.title}{' '}Momo</h3>
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
 
            <Alert variant = "info" className = "text-center">
            <h4 style = {{marginBottom:'.5em'}}>Subtotal: {formatPrice(cartSubtotal(cart))}</h4>
            <h4 style = {{marginBottom:'.5em'}}>8% Tax: {formatPrice(tax(cart))}</h4>
            <h3>Total: {formatPrice(cartTotal(cart))}</h3>
            </Alert>
            </>
                }
                {cart.length ===0 && <><h3 style = {{marginTop: '100px', textAlign:'center'}}>Your Momo Cart is empty.. <br/><br/>
                <Link to = "/" style = {{ textDecoration:'none'}}>
                Add some Momos for Free Delivery<Emoji symbol="🚚" label="delivery"/>
                </Link>
                </h3></>
                }
                
                <div className = "text-center">
                    {cart && cart.length > 0 &&
                        <Button variant = "primary" size = "lg"
                            onClick = {() => setShowCheckout(true)}
                        >Checkout
                        </Button>
                    }
                </div>
                {showCheckout &&
                    <Checkout cart = {cart}/>
                }

        </Layout>
    )
}