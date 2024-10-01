import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from '../components/Checkout';
import { useEffect } from 'react';
import agent from '../actions/agent';
import { useAppDispatch } from '../redux/store/configureStore';
import { setBasket } from '../redux/slices/basketSlice';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51Q4xWOL1Mshgfrvs1v9eLAwhZQhdV8Kq5JvrbXTgqAGtbo0Lfa5XxD5jB8eQuPveBqswk72AdOZHYjYGdK50BOfn00cbbv2Dpp'
);

export default function CheckoutPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    agent.Payments.paymentIntent()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
}
