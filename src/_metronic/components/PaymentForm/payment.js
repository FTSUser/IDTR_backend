import axios from 'axios';
import React from 'react'
import { ApiPost, ApiPut } from '../../../helpers/API/ApiData';
// import { ApiPost, ApiPut } from '../../Helpers/Api/ApiData';
import "./payment.scss";
import { toast } from 'react-toastify';

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

    function displayRazorpay() {

        if (props.cnid) {
            const data = {
                cnid: props.cnid,
                ctid: props.ctid,
                vcid: props.vcid,
                phone: props.phone,
                tdid: props.tdid,
            }
            ApiPost('payment/checkPayment', data).then(async (res) => {
             
                if (res.data.result === 0) {

                    const ress = await loadScript(
                        'https://checkout.razorpay.com/v1/checkout.js'
                    );

                    if (!ress) {
                        alert('Razorpay SDK failed to load. Are you online?');
                        return;
                    }

                    // const result = await axios.post('/payment/orders');
                    const results = "data";


                    if (!results) {
                        alert('Server error. Are you online?');
                        return;
                    }

                    const { amt, id: order_id, } = results;
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
                                email: props?.email,
                                phone: props?.phone,
                                name: props?.fname,
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
                else {
                    toast.error(res?.data?.message, { theme: "colored" });
                }
            })

        }


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
