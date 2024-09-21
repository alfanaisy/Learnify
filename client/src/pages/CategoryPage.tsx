import { Row } from 'antd';
import { useEffect, useState } from 'react';
import agent from '../actions/agent';
import ShowCourses from '../components/ShowCourses';
import { Category } from '../models/category';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const [data, setData] = useState<Category>();

  const { id } = useParams<string>();

  useEffect(() => {
    agent.Categories.getCategory(Number(id)).then((response) => {
      setData(response);
    });
  }, [id]);

  return (
    <div className="course">
      <div className="course__header">
        <h1>Pick a course from your favorite category!</h1>
        <h2>{data?.name}</h2>
      </div>
      <Row gutter={[24, 32]}>
        {data?.courses?.length ? (
          data?.courses?.map((course) => {
            return <ShowCourses key={course.id} course={course} />;
          })
        ) : (
          <h1>There are currently no courses in this category</h1>
        )}
      </Row>
    </div>
  );
};

export default CategoryPage;
