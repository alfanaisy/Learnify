import { Button, Card, Form, Input, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import agent from '../actions/agent';
import { Register } from '../models/user';

const RegisterComponent = ({
  toggleRegister,
}: {
  toggleRegister: () => void;
}) => {
  const [values, setValues] = useState<Register>({
    username: '',
    email: '',
    password: '',
  });

  const { Title, Text } = Typography;

  const { username, email, password } = values;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleRegister = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      username.length >= 5 &&
      email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) &&
      password.length >= 6
    ) {
      const response = await agent.Users.register(values);
      setValues({ ...values, username: '', email: '', password: '' });
      console.log(response);
    }
  };

  return (
    <Card className="log-in-card">
      <div className="log-in-card__intro">
        <Typography>
          <Title level={2} className="log-in-card__intro-title">
            Sign up with Learnify!
          </Title>
          <Text>Use your username, email, and password to register</Text>
        </Typography>
      </div>
      <Content className="log-in__form">
        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          onSubmitCapture={handleRegister}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please enter a valid username',
                min: 5,
              },
            ]}
          >
            <Input
              value={username}
              onChange={handleChange}
              name="username"
            ></Input>
          </Form.Item>
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
            <Button onClick={handleRegister} type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <div className="log-in-card__toggle" onClick={toggleRegister}>
        Already a user? Sign in
      </div>
    </Card>
  );
};

export default RegisterComponent;
