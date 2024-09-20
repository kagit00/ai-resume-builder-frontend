import React, { useEffect, useRef, useState } from 'react';
import dropin from 'braintree-web-drop-in';
import { getClientTokenForPayment, doSubscribe } from '@/services/ApiService';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment = () => {
    const queryClient = useQueryClient();
    const location = useLocation();
    const [clientToken, setClientToken] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [redirecting, setRedirecting] = useState(false);
    const [isDropinValid, setIsDropinValid] = useState(false);
    const dropinInstance = useRef(null);
    const userId = location.state || 0;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    useEffect(() => {
        const fetchClientToken = async () => {
            try {
                setIsLoading(true)
                const tokenResponse = await getClientTokenForPayment();
                setClientToken(tokenResponse.clientToken);
            } catch (error) {
                toast.error(error?.response?.data?.errorMsg, {
                    style: {
                        backgroundColor: '#1F2937',
                        color: '#fff'
                    },
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchClientToken();
    }, []);

    const handleRedirectToUserDashboard = () => {
        queryClient.invalidateQueries('userDetails');
        setTimeout(() => {
            window.location.href = '/user/dashboard';
        }, 3000);
    };

    useEffect(() => {
        if (clientToken && !dropinInstance.current) {
            dropin.create(
                {
                    authorization: clientToken,
                    container: '#dropin-container',
                },
                (error, instance) => {
                    if (error) {
                        return;
                    }
                    dropinInstance.current = instance;

                    // Enable/disable the Pay Now button based on Drop-in's state
                    instance.on('paymentMethodRequestable', () => {
                        setIsDropinValid(true); // Enable when valid
                    });
                    instance.on('noPaymentMethodRequestable', () => {
                        setIsDropinValid(false); // Disable when invalid
                    });
                }
            );
        }
    }, [clientToken]);

    const handlePayment = async () => {
        if (!dropinInstance.current) {
            return;
        }

        dropinInstance.current.requestPaymentMethod(async (err, payload) => {
            if (err) return;

            try {
                setIsLoading(true)
                const response = await doSubscribe(payload.nonce, '20.00', userId);
                if (response) {
                    setPaymentSuccess(true);
                    setRedirecting(true);
                    handleRedirectToUserDashboard();
                }
            } catch (error) {
                toast.error(error?.response?.data?.errorMsg, {
                    style: {
                        backgroundColor: '#1F2937',
                        color: '#fff'
                    },
                });
            } finally {
                setIsLoading(false)
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            {isLoading && (
                <div className="loader-overlay">
                    <div className="loader"></div>
                </div>
            )}
            <div className={`w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-xl hidden-scrollbar ${isLoading ? 'hidden' : ''}`} style={{ maxHeight: '90vh', overflowY: 'scroll' }}>
                <h1 className="text-3xl font-thin text-center text-white mb-3">Complete Your Payment</h1>
                {/* Sandbox Instruction Panel - Moved Here */}
                <div className="bg-yellow-200 text-yellow-900 p-3 mb-4 rounded-lg text-sm">
                    <p>
                        This is a <strong>Sandbox Environment</strong>. No real money will be transacted.
                    </p>
                    <p>Use the following test card details:</p>
                    <ul className="list-disc list-inside">
                        <li>
                            Card Number: <strong>4111 1111 1111 1111</strong>
                        </li>
                        <li>
                            Expiration Date: <strong>Any future date</strong>
                        </li>
                        <li>
                            CVV: <strong>123</strong>
                        </li>
                    </ul>
                </div>

                {/* Drop-in UI */}
                <div id="dropin-container" className={`mb-2 bg-gray-800 p-4 rounded-lg ${paymentSuccess ? 'hidden' : ''}`}></div>

                {/* Pay Now Button with updated disabled logic */}
                {!paymentSuccess && (
                    <>
                        <button
                            onClick={handlePayment}
                            disabled={!clientToken || !isDropinValid} // Disable button based on Drop-in validity
                            className={`w-full py-1 text-white font-semibold rounded-full ${clientToken && isDropinValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'}`}
                        >
                            Pay Now
                        </button>
                    </>
                )}

                {/* Payment Success Message */}
                {paymentSuccess && (
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-green-500 rounded-full mb-4 flex items-center justify-center">
                            <svg
                                className="w-10 h-10 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <p className="text-2xl text-green-400 font-bold">Payment was successful!</p>
                        {redirecting && (
                            <p className="text-center text-gray-400 text-sm mt-2">You are being redirected to the Dashboard ...</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payment;
