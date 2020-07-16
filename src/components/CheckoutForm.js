import React, {useEffect, useState, useContext} from 'react'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js'
import {formatPrice} from '../utils/format'
import { CartContext } from '../context/CartContext';

const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

export default () => {
    const stripe = useStripe()
    const elements = useElements()

    const {cart} = useContext(CartContext)

    const [customer_name, setCustomer_name] = useState('')
    const [delivery_address, setDelivery_address] = useState('')
    const [delivery_zip, setDelivery_zip] = useState('')
    const [delivery_instructions, setDelivery_instructions] = useState('')
    const [phone_number, setPhone_number] = useState('')

    const [token, setToken] = useState(null)
    const [total, setTotal] = useState('loading')
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        console.log(event)
        const result = await stripe.confirmCardPayment(token, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        })
        console.log(result)
        setLoading(false)
    }

    useEffect(()=>{
        const loadToken = async () => {
            setLoading(true)
            const response = await fetch('http://localhost:1337/orders/payment',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cart.map(dish => (
                        {...dish, ...{id: dish.strapiId}}
                    ))
                })
            })
            const data = await response.json()

            console.log(data)
            setToken(data.client_secret)
            setTotal(data.amount)
            setLoading(false)
        }
        loadToken()
    }, [cart])

    return(
        <div
            style = {{margin: '24px  0'}}
            >
                {!loading && <h3>{formatPrice(total)} + $0 Delivery Fee</h3>}
                {loading && <h3>Loading...</h3>}
                <form 
                    onSubmit = {handleSubmit}
                >   <div>
                        <label htmlFor = "name">Full Name</label>
                        <input id = "name" 
                            value = {customer_name}
                            onChange = {(event) => setCustomer_name(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor = "address">Delivery Address</label>
                        <input id = "address" 
                            value = {delivery_address}
                            onChange = {(event) => setDelivery_address(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor = "zip">Delivery Zip</label>
                        <input id = "zip" 
                            value = {delivery_zip}
                            onChange = {(event) => setDelivery_zip(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor = "instructions">Delivery Instructions</label>
                        <input id = "instructions" 
                            value = {delivery_instructions}
                            onChange = {(event) => setDelivery_instructions(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor = "number">Phone Number</label>
                        <input id = "number" 
                            value = {phone_number}
                            onChange = {(event) => setPhone_number(event.target.value)}
                        />
                    </div>

                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                    <button 
                        disabled = {!stripe}
                        style = {{marginTop: '12px'}}
                    >Confirm Order</button>
                </form>
        </div>
        )
}