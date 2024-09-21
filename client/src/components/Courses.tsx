import { useEffect, useLayoutEffect, useState } from 'react';
import { Course } from '../models/course';
import agent from '../actions/agent';

import { Row, Col, Card } from 'antd';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { PaginatedData } from '../models/paginatedData';
import { IconType } from 'react-icons';

const Courses = () => {
  const [data, setData] = useState<PaginatedData<Course>>();
  const [spanVal, setSpanVal] = useState<number>();

  const checkWidth = () => {
    if (window.innerWidth > 1024) {
      setSpanVal(6);
    } else if (window.innerWidth < 1024 && window.innerWidth > 768) {
      setSpanVal(8);
    } else {
      setSpanVal(12);
    }
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', checkWidth);

    return () => window.addEventListener('resize', checkWidth);
  }, []);

  useEffect(() => {
    agent.Courses.list().then((response) => {
      setData(response);
      checkWidth();
    });
  }, []);

  const showStars = (rating: number): JSX.Element[] => {
    const options: JSX.Element[] = [];
    for (let i = 1; i < rating; i++) {
      options.push(<FaStar key={i} />);
      if (rating - i < 1 && rating - i > 0.3) {
        options.push(<FaStarHalf key={i + 1} />);
      }
    }
    return options;
  };

  return (
    <div className="course">
      <div className="course__header">
        <h1>What to learn next?</h1>
        <h2>New Courses picked just for you...</h2>
      </div>
      <Row gutter={[24, 32]}>
        {data &&
          data.data.map((course) => {
            return (
              <Col key={course.id} className="gutter-row" span={spanVal}>
                <Card
                  hoverable
                  cover={
                    <img width="100%" alt="course-cover" src={course.image} />
                  }
                >
                  <div className="course__title">{course.title}</div>
                  <div className="course__instructor">{course.instructor}</div>
                  <div className="course__rating">
                    {course.rating} <span>{showStars(course.rating)}</span>
                  </div>
                  <div className="course__price">{course.price}</div>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Courses;
