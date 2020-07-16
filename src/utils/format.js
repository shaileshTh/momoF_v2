//thanks to https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
//price in cents into price in dollars

export const formatPrice = (priceInCents) => {
    const priceInDollars = parseInt(priceInCents) / 100
    return priceInDollars.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}

