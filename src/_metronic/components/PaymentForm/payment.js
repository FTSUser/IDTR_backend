import axios from 'axios';
import React from 'react'
import { ApiPut } from '../../../helpers/API/ApiData';
// import { ApiPost, ApiPut } from '../../Helpers/Api/ApiData';
import "./payment.scss";

function PaymentData(props) {
    const price = props.price;


    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            'https://checkout.razorpay.com/v1/checkout.js'
        );

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        // const result = await axios.post('/payment/orders');
        const result = "data";


        if (!result) {
            alert('Server error. Are you online?');
            return;
        }

        const { amt, id: order_id, } = result;
        const options = {
            key: 'rzp_test_HvMIzOImOtzrzA', // Enter the Key ID generated from the Dashboard

            amount: price * 100,
            currency: "INR",
            name: 'Honda',
            description: 'Honda Transaction',
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    // razorpayPaymentId: response.razorpay_payment_id,
                    cnid: props.cnid,
                    ctid: props.ctid,
                    vcid: props.vcid,
                    tdid: props.tdid,
                    paymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    price: props.price,
                    type: "online"

                };

                const result = await ApiPut('payment/pay', data);

                alert(result.data.message);
                if (result.data.message) {
                    props.hhhhh(true)
                    props.paymentId(response.razorpay_payment_id)
                }
            },
            prefill: {
                name: 'Honda',
                email: 'example@example.com',
                contact: '8160362614',
            },
            notes: {
                address: 'Example Corporate Office',
            },
            theme: {
                color: '#cc0001',
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    }
    return (
        <>
            <button className='payment-button ' onClick={displayRazorpay}>
                Pay ₹{price}
            </button>
        </>
    )
}

export default PaymentData
