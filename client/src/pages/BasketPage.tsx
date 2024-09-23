import { useEffect, useState } from 'react';
import agent from '../actions/agent';
import { Basket, CourseItem } from '../models/basket';
import { Table } from 'antd';
import { FaTrash } from 'react-icons/fa';
import { useStoreContext } from '../context/storeContext';
import { Link } from 'react-router-dom';

const BasketPage = () => {
  const { basket, removeItem } = useStoreContext();
  const [items, setItems] = useState<Basket | null>();

  const basketCount = basket?.items.length || 0;
  const total = basket?.items.reduce((sum, item) => sum + item.price, 0);

  const assignKey = (items: Basket | null) => {
    items?.items.map((item, index) => {
      Object.assign(item, { key: index });
    });

    setItems(items);
  };

  const removeBasketItem = (courseId: string) => {
    agent.Baskets.removeItem(courseId)
      .then(() => {
        removeItem(courseId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    assignKey(basket);
  }, [basket]);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (url: string) => (
        <img src={url} alt="course-thumbnail" width="100px" />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <div>${price}</div>,
    },
    {
      title: 'Instructor',
      key: 'instructor',
      dataIndex: 'instructor',
    },
    {
      title: 'Action',
      key: 'action',
      render: (item: CourseItem) => (
        <div onClick={() => removeBasketItem(item.courseId)}>
          <FaTrash />
        </div>
      ),
    },
  ];

  return (
    <div className="basket-page">
      <h1 className="basket-page__header">Shopping Cart</h1>
      <h2 className="basket-page__sub-header">{`${basketCount} ${
        basketCount! > 1 ? 'courses' : 'course'
      } in the Cart`}</h2>
      <div className="basket-page__body">
        <div className="basket-page__body__table">
          <Table columns={columns} dataSource={items?.items} />
        </div>
        {total! > 0 && (
          <div className="basket-page__body__summary">
            <h2>Total</h2>
            <div className="basket-page__body__summary__total">${total}</div>
            <Link to={'/basket'}>
              <div className="basket-page__body__summary__checkout">
                Checkout
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasketPage;
