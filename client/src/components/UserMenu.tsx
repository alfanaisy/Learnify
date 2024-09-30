import { Dropdown, Menu, MenuProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store/configureStore';
import { signOut } from '../redux/slices/userSlice';
import { removeBasket } from '../redux/slices/basketSlice';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const signout = () => {
    dispatch(signOut());
    dispatch(removeBasket());
    navigate('/', { replace: true });
  };

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <Menu>
          <Menu.Item>
            <Link to={'/profile'}>Profile</Link>
          </Menu.Item>
        </Menu>
      ),
    },
    {
      key: 2,
      label: (
        <Menu>
          <Menu.Item>
            <div onClick={signout}>Logout</div>
          </Menu.Item>
        </Menu>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomCenter">
      <div className="dropdown">Menu</div>
    </Dropdown>
  );
};

export default UserMenu;
