import React from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'

const stripe = loadStripe('pk_test_51H4f83BDMxRrTIJt7Ep6KZIYSNQPw8S963t9Y53I4z7BXNdP055rU5cngz24ltXgv2KQSXKuTkwRWGX09uMMX9ct00LQNqmvU7')

export default () => (
    <div>
        <Elements stripe = {stripe}>
            <CheckoutForm />
        </Elements>
    </div>
)