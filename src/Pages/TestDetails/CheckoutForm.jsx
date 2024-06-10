
import {CardElement,  useElements, useStripe} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { ImSpinner9 } from 'react-icons/im';
import Swal from 'sweetalert2';



const CheckoutForm = ({totalPrice ,test}) => {
  const stripe = useStripe();
  const elements = useElements();
  const {user} = useAuth()
  const axiosSecure= useAxiosSecure()
  const [clientSecret, setClientSecret] = useState();
 const [cardError, setCardError] = useState('')
 const [processing, setProcessing] = useState(false)
  useEffect(()=>{
    if( totalPrice > 1){
        getClientSecret({ price: totalPrice })
    }
  },[totalPrice])

  const getClientSecret = async price =>{
    const {data}= await axiosSecure.post(`/create-payment-intent`, price)
    console.log(data);
    setClientSecret(data.clientSecret)
  }
  const handleSubmit = async (event) => {
    setProcessing(true)
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      setProcessing(false)
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setCardError(error.message)
      return
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setCardError('')
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      })

      if (confirmError) {
        console.log(confirmError);
        setCardError(confirmError.message)
        setProcessing(false)
     return  
    }
     
    if (paymentIntent.status === 'succeeded' ){
      setProcessing(false)
        const paymentInfo = {
            email: user.email,
            price: totalPrice,
            transactionId: paymentIntent.id,
            date: new Date(),
            testName: test.name,
            testId: test._id,
            reportStatus: 'pending',
        }
        
        
          const res =  await axiosSecure.post('/reservations', paymentInfo)
          console.log(res);
          // refetch()
          if(res.data?.result?.insertedId){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Thank you for payment",
              showConfirmButton: false,
              timer: 1500
            });
            // navigate("/dashboard/paymentHistory")
          }
       
    }
    setProcessing(false)
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn rounded-full px-10 mt-5 bg-[#47CCC8]" type="submit" disabled={!stripe || !clientSecret || processing}>
        {processing ?<ImSpinner9 className='animate-spin m-auto' size={24}></ImSpinner9> :
        `Pay ${totalPrice.toFixed(2)}`}
      </button>
      
    </form>
    {cardError && <p className='text-red-500 p-2'>{cardError}</p> }</>
  );
};





export default CheckoutForm;