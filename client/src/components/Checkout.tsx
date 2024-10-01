import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Card, Form, Input, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import CheckoutSummary from './CheckoutSummary';
import { useAppDispatch, useAppSelector } from '../redux/store/configureStore';
import { removeBasket } from '../redux/slices/basketSlice';
import { useNavigate } from 'react-router-dom';
import agent from '../actions/agent';

const Checkout = () => {
  const [cardName, setCardName] = useState<string>('');

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const { basket } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardName(e.target.value);
  };

  const [form] = useForm();

  const handlePayment = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      const cardElement = elements.getElement(CardNumberElement);
      const paymentResult = await stripe.confirmCardPayment(
        basket!.clientSecret!,
        {
          payment_method: {
            card: cardElement!,
            billing_details: {
              name: cardName,
            },
          },
        }
      );

      if (paymentResult.paymentIntent?.status === 'succeeded') {
        notification.success({
          message: 'Your payment is successful',
        });

        dispatch(removeBasket());
        await agent.Baskets.clear();

        setTimeout(() => {
          navigate('/profile');
        }, 1000);
      } else {
        notification.error({
          message: paymentResult.error?.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="checkout">
      <div className="checkout__form">
        <h1>Checkout Page</h1>
        <Card title="Fill your credit card details here">
          <Form form={form} layout="vertical">
            <Form.Item
              name="cardName"
              rules={[
                { required: true, message: 'Card Name is required', min: 5 },
              ]}
              label="Name on card"
            >
              <Input
                name="cardName"
                placeholder="Mention the name on your card"
                value={cardName}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Card Number">
              <div className="stripe-input">
                <CardNumberElement />
              </div>
            </Form.Item>
            <div className="inline">
              <Form.Item label="Expiry Date">
                <div className="stripe-input">
                  <CardExpiryElement />
                </div>
              </Form.Item>
              <Form.Item label="CVV">
                <div className="stripe-input">
                  <CardCvcElement />
                </div>
              </Form.Item>
            </div>
          </Form>
        </Card>
      </div>
      <div className="checkout__summary">
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default Checkout;
