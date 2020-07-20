import React from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'

const stripe = loadStripe('pk_live_51H4f83BDMxRrTIJtQ8C0DYyyyxfElEPo33kKypiXY74FGWtoCwUIZMhyEdYJFD3nVdaTdggFPxLZa6u9t84fOgcT00kg8UEo7k')

export default () => (
    <div>
        <Elements stripe = {stripe}>
            <CheckoutForm />
        </Elements>
    </div>
)