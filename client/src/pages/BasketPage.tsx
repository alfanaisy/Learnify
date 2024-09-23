import { useEffect, useState } from 'react';
import agent from '../actions/agent';
import { Basket, CourseItem } from '../models/basket';
import { Table } from 'antd';
import { FaTrash } from 'react-icons/fa';
import { useStoreContext } from '../context/storeContext';

const BasketPage = () => {
  const { basket, removeItem } = useStoreContext();
  const [items, setItems] = useState<Basket | null>();

  const basketCount = basket?.items.length;

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
      <Table columns={columns} dataSource={items?.items} />
    </div>
  );
};

export default BasketPage;
