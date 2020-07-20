import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js'
import {formatPrice} from '../utils/format'
import { CartContext } from '../context/CartContext';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

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

    const {cart, clearCart} = useContext(CartContext)

    const [displayName, setDisplayName] = useState('')
    const [displayTotal, setDisplayTotal] = useState('')
    const [displayAddress, setDisplayAddress] = useState('')
    const [displayId, setDisplayId] = useState('')

    const [validated, setValidated] = useState(false);

    const [error, setError] = useState(false);

    const [customer_name, setCustomer_name] = useState('')
    const [delivery_address, setDelivery_address] = useState('')
    const [delivery_zip, setDelivery_zip] = useState('')
    const [delivery_instructions, setDelivery_instructions] = useState('')
    const [phone_number, setPhone_number] = useState('')
    const [email, setEmail] = useState('')


    const [token, setToken] = useState(null)
    const [total, setTotal] = useState('loading')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)

    let payment_intent_id;

    const valid = () => {
        if(!customer_name || !delivery_address || !delivery_zip || !phone_number){
            return false
        }
        return true
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
  
      setValidated(true);
        setLoading(true)
        // console.log(event)
        const result = await stripe.confirmCardPayment(token, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        })

        const data = {
            paymentIntent: result.paymentIntent,
            customer_name,
            delivery_address,
            delivery_zip,
            delivery_instructions,
            phone_number,
            email,
            cart
        }


        axios.post('http://localhost:1337/orders', data)
          .then(function (response) {
            setLoading(false)
            setDisplayId(response.data.payment_intent_id)
            setDisplayName(response.data.customer_name)
            setDisplayAddress(response.data.delivery_address)
            setDisplayTotal(parseInt(response.data.total_in_cents)/100)

            console.log(response);
            clearCart()
            setSuccess(true) 
          })
          .catch(function (err) {
            setLoading(false)
            setError(err.response.statusText)
          });
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

            // console.log(data)
            setToken(data.client_secret)
            setTotal(data.amount)
            setLoading(false)
        }
        loadToken()
    }, [cart])

    return(
        <div
            style = {{margin: '24px  0'}} className = "text-center"
            >
                {!loading && !success && <Alert variant = "primary">Please enter your information below.</Alert>}
                {loading && <h3>Loading...</h3>}

                {!success && cart && cart.length > 0 &&
                      <Form noValidate validated={validated} onSubmit={handleSubmit}>
                      <Form.Group>
                        <Form.Label htmlFor = "name">Recipient's Name</Form.Label>
                        <Form.Control
                          required
                          id = "name" 
                          value = {customer_name}
                          onChange = {(event) => setCustomer_name(event.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          This is required.
                        </Form.Control.Feedback>
                      </Form.Group>
            
                      <Form.Group>
                        <Form.Label htmlFor = "address">Delivery Address</Form.Label>
                        <Form.Control
                          id = "address" 
                          value = {delivery_address}
                          onChange = {(event) => setDelivery_address(event.target.value)}
                          required
                          type="text"
                        />
                        <Form.Control.Feedback type="invalid">
                          This is required.
                        </Form.Control.Feedback>
                      </Form.Group>
            
                      <Form.Group>
                        <Form.Label htmlFor = "zip">Delivery Zip</Form.Label>
                        <Form.Control
                          id = "zip" 
                          value = {delivery_zip}
                          onChange = {(event) => setDelivery_zip(event.target.value)}
                          required
                          type="number"
                        />
                        <Form.Control.Feedback type="invalid">
                          This is required.
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Form.Group>
                        <Form.Label htmlFor = "instructions">Delivery Instructions (optional)</Form.Label>
                        <Form.Control
                          id = "instructions" 
                          value = {delivery_instructions}
                          onChange = {(event) => setDelivery_instructions(event.target.value)}
                          type="text"
                        />
                      </Form.Group>
                
                      <Form.Group>
                        <Form.Label htmlFor = "number">Phone Number</Form.Label>
                        <Form.Control
                          id = "number" 
                          value = {phone_number}
                          onChange = {(event) => setPhone_number(event.target.value)}
                          type="number"
                          required
                        />
                         <Form.Control.Feedback type="invalid">
                          This is required.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor = "email">Email (optional)</Form.Label>
                        <Form.Control
                          id = "email" 
                          value = {email}
                          onChange = {(event) => setEmail(event.target.value)}
                          type="text"
                        />
                      </Form.Group>
                      <Form.Label>Payment Information</Form.Label>

                    <div style = {{border:'1px solid lightgrey', padding:'5px', borderRadius:'5%'}}>
                    <CardElement options={CARD_ELEMENT_OPTIONS} /></div>
                    <Button variant = "success" size = "lg"
                        disabled = {!stripe || !valid()}
                        style = {{marginTop: '12px'}}
                        type = "submit"
                    >Confirm Order</Button><br/>
                    {loading && <Alert variant = "primary">Loading....</Alert>}
                    {error && <Alert variant = "danger" style = {{marginTop:'10px'}}><h3>{error}</h3>Please check your card details and form inputs. <br/>You might need to reload the page after multiple attempts.</Alert>}

                </Form>
                }
                {success &&
                    <div style= {{position:'relative', background:'white', marginTop: '80px', top:'-180px', width:'100%', minHeight:'200px', border:'10px solid green'}}>
                        <br/>
                        <br/>
                        <br/>
                    <h2 style = {{color:'green', textAlign:'center'}}>Your order was successful!</h2>
                    <h3 style = {{textAlign:'center'}}><i>{displayName}</i></h3>
                    <h4 style = {{textAlign:'center'}}>Delivery Address: <i>{displayAddress}</i></h4>
                    <p style = {{textAlign:'center'}}>We will start delivering as soon as we get your momos ready. Call us with any questions.</p>
                    <p style = {{textAlign:'center'}}> +1 470-455-2434 </p>
                    <p style = {{textAlign:'center'}}>MomoATL, 2600 Bentley RD SE</p>
                    <p style = {{textAlign:'center'}}>Marietta, GA 30067</p>
                    <hr/>
                    <p style = {{textAlign:'center'}}>Total: ${displayTotal}</p>
                    <p style = {{textAlign:'center'}}>Payment Id: {displayId}</p>

                    </div>
                }               
        </div>
        )
}