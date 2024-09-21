import { useEffect, useState } from 'react';
import { Course } from '../models/course';
import agent from '../actions/agent';

import { Row } from 'antd';
import { PaginatedData } from '../models/paginatedData';
import ShowCourses from '../components/ShowCourses';

const HomePage = () => {
  const [data, setData] = useState<PaginatedData<Course>>();

  useEffect(() => {
    agent.Courses.list().then((response) => {
      setData(response);
    });
  }, []);

  return (
    <div className="course">
      <div className="course__header">
        <h1>What to learn next?</h1>
        <h2>New Courses picked just for you...</h2>
      </div>
      <Row gutter={[24, 32]}>
        {data &&
          data.data.map((course) => {
            return <ShowCourses key={course.id} course={course} />;
          })}
      </Row>
    </div>
  );
};

export default HomePage;
