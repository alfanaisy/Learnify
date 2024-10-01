import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from '../components/Checkout';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51Q4xWOL1Mshgfrvs1v9eLAwhZQhdV8Kq5JvrbXTgqAGtbo0Lfa5XxD5jB8eQuPveBqswk72AdOZHYjYGdK50BOfn00cbbv2Dpp'
);

export default function CheckoutPage() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <Checkout />
    </Elements>
  );
}
