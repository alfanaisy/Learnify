import { useEffect, useState } from 'react';
import agent from '../actions/agent';
import { Basket, CourseItem } from '../models/basket';
import { Table } from 'antd';
import { FaTrash } from 'react-icons/fa';

const BasketPage = () => {
  const [items, setItems] = useState<Basket | null>();

  const assignKey = (items: Basket | null) => {
    items?.items.map((item, index) => {
      Object.assign(item, { key: index });
    });

    setItems(items);
  };

  const removeItem = (courseId: string) => {
    agent.Baskets.removeItem(courseId).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    agent.Baskets.get().then((response) => {
      assignKey(response);
    });
  }, []);

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
        <div onClick={() => removeItem(item.courseId)}>
          <FaTrash />
        </div>
      ),
    },
  ];

  return (
    <div className="basket-page">
      <h1 className="basket-page__header">Shopping Cart</h1>
      <Table columns={columns} dataSource={items?.items} />
    </div>
  );
};

export default BasketPage;
