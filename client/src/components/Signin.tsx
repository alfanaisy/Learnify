import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Login } from '../models/user';
import { Button, Card, Form, Input, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import { Content } from 'antd/es/layout/layout';
import agent from '../actions/agent';

const Signin = ({ toggleRegister }: { toggleRegister: () => void }) => {
  const [values, setValues] = useState<Login>({
    email: '',
    password: '',
  });

  const { email, password } = values;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && password.length >= 6) {
      const response = await agent.Users.login(values);
      setValues({ ...values, email: '', password: '' });
      console.log(response);
    }
  };

  return (
    <Card className="log-in-card">
      <div className="log-in-card__intro">
        <Typography>
          <Title level={2} className="log-in-card__intro-title">
            Log in to Learnify!
          </Title>
          <Text>Use your email and password to login</Text>
        </Typography>
      </div>
      <Content className="log-in__form">
        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          onSubmitCapture={handleLogin}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter a valid email',
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              },
            ]}
          >
            <Input value={email} onChange={handleChange} name="email"></Input>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password',
                min: 6,
              },
            ]}
          >
            <Input.Password
              value={password}
              onChange={handleChange}
              name="password"
            ></Input.Password>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button onClick={handleLogin} type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <div className="log-in-card__toggle" onClick={toggleRegister}>
        Not a user yet? Register here
      </div>
    </Card>
  );
};

export default Signin;
