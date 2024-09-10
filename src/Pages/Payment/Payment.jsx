import React, { useEffect, useRef, useState } from 'react';
import dropin from 'braintree-web-drop-in';
import { getClientTokenForPayment, doSubscribe } from '@/services/ApiService';
import { useLocation } from 'react-router-dom';
import { doNormalLogOut } from '@/utils/AuthUtils';
import { useQueryClient } from '@tanstack/react-query';

const Payment = () => {
    const queryClient = useQueryClient()
    const location = useLocation()
    const [clientToken, setClientToken] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [redirecting, setRedirecting] = useState(false);
    const dropinInstance = useRef(null);
    const userId = location.state || 0;

    useEffect(() => {
        const fetchClientToken = async () => {
            try {
                const tokenResponse = await getClientTokenForPayment();
                setClientToken(tokenResponse.clientToken);
            } catch (error) {
                console.error('Error fetching client token:', error);
            }
        };

        fetchClientToken();
    }, []);

    const handleRedirectToUserDashboard = () => {
        queryClient.invalidateQueries('userDetails')
        setTimeout(() => {
            window.location.href = '/user/dashboard';
        }, 500);
    }

    useEffect(() => {
        if (clientToken && !dropinInstance.current) {
            dropin.create({
                authorization: clientToken,
                container: '#dropin-container'
            }, (error, instance) => {
                if (error) {
                    console.error(error);
                    return;
                }
                dropinInstance.current = instance;
            });
        }
    }, [clientToken]);

    const handlePayment = async () => {
        if (!dropinInstance.current) {
            console.error('Braintree drop-in not initialized');
            return;
        }

        dropinInstance.current.requestPaymentMethod(async (err, payload) => {
            if (err) {
                console.error('Error requesting payment method:', err);
                return;
            }

            try {
                const response = await doSubscribe(payload.nonce, '20.00', userId);
                if (response) {
                    setPaymentSuccess(true);
                    setRedirecting(true);
                    console.log('Payment successful:', response);
                    handleRedirectToUserDashboard()
                } else {
                    console.error('Payment failed');
                }
            } catch (error) {
                console.error('Error during payment:', error);
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-xl">
                <h1 className="text-3xl font-thin text-center text-white mb-3">Complete Your Payment</h1>
                <p className="text-center text-gray-400 text-xs font-normal">
                    Secure payment powered by <span className="font-bold text-white">Braintree</span>.
                </p>
                <div id="dropin-container" className={`mb-4 bg-gray-800 p-4 rounded-lg ${paymentSuccess ? 'hidden' : ''}`}></div>
                {!paymentSuccess && (
                    <button
                        onClick={handlePayment}
                        disabled={!clientToken}
                        className={`w-full py-2 px-4 text-white font-semibold rounded-full ${clientToken ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'}`}
                    >
                        Pay Now
                    </button>
                )}
                {paymentSuccess && (
                    <div className="text-center">
                        <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <p className="text-center text-green-500 font-semibold text-lg">
                            Payment was successful!
                        </p>
                        {redirecting && (
                            <p className="text-center text-gray-400 text-sm mt-2">
                                You are being redirected to the Dashboard ...
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payment;
