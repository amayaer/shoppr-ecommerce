require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path'); 

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/create-checkout-session', async (req, res) => {
    try {
        const cartItems = req.body.cartItems;

        const lineItems = cartItems.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.productTitle || item.productName || item.title || 'Product',
                },
                unit_amount: Math.round(parseFloat(item.productPrice) * 100),
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: 'https://shoppr-ecommerce.onrender.com/success.html',
            cancel_url: 'https://shoppr-ecommerce.onrender.com/checkout.html',
        });

        res.json({url: session.url});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));