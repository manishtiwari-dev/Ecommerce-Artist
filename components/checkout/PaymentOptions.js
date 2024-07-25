import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import Script from 'next/script';

const PaymentOptions = () => {
    const { total_price } = useSelector((state) => state.Cart);

    const checkoutHandler = async (amount) => {

        try {
            const {data : { order }} = await axios.post("/api/checkout", { amount }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(order.amount);
            

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "Ritesh Singh",
                description: "RazorPay integration",
                image: "",
                order_id: order.id,
                callback_url: "/api/paymentverification",
                prefill: {
                    name: "Test",
                    email: "test@gmail.com",
                    contact: "9999999999"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();

        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
                onLoad={() => console.log('Razorpay loaded')}
            />
            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                <div className="col-12">
                    <div className="form-check text-start my-3">
                        <input type="checkbox" className="form-check-input bg-primary border-0" id="Transfer-1" name="Transfer" value="Transfer" />
                        <label className="form-check-label" for="Transfer-1">Direct Bank Transfer</label>
                    </div>
                    <p className="text-start text-dark">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                </div>
            </div>
            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                <div className="col-12">
                    <div className="form-check text-start my-3">
                        <input type="checkbox" className="form-check-input bg-primary border-0" id="Payments-1" name="Payments" value="Payments" />
                        <label className="form-check-label" for="Payments-1">Check Payments</label>
                    </div>
                </div>
            </div>
            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                <div className="col-12">
                    <div className="form-check text-start my-3">
                        <input type="checkbox" className="form-check-input bg-primary border-0" id="Delivery-1" name="Delivery" value="Delivery" />
                        <label className="form-check-label" for="Delivery-1">Cash On Delivery</label>
                    </div>
                </div>
            </div>
            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                <div className="col-12">
                    <div className="form-check text-start my-3">
                        <input type="checkbox" className="form-check-input bg-primary border-0" id="Paypal-1" name="Paypal" value="Paypal" />
                        <label className="form-check-label" for="Paypal-1">Paypal</label>
                    </div>
                </div>
            </div>
            <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                <button
                    onClick={() => checkoutHandler(total_price)}
                    type="button" className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">
                    Place Order
                </button>
            </div>
        </>
    )
}

export default PaymentOptions
