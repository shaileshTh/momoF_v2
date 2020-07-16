export const TAX_RATE = 0.08;

export const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const getCart = () => {
    try{
        const cart = JSON.parse(localStorage.getItem('cart'))
        if(cart){
            return cart
        }
    } catch (err) {

    }
    return[]
}



export const cartSubtotal = (cart) => {
    const subTotal = cart.reduce((counter, dish) => {
        return counter + dish.price_in_cents * dish.quantity
    }, 0)
    return subTotal 
}

export const cartTotal = (cart) => {
    const subTotal = cartSubtotal(cart)
    const total = subTotal + subTotal * TAX_RATE;
    return Math.round(total);
}
export const tax = (cart) => {
    const subTotal = cartSubtotal(cart)
    return subTotal * TAX_RATE
}
