import { useEffect } from 'react';
import ShowCourses from '../components/ShowCourses';

import { Card, Col, Radio, Row } from 'antd';
import {
  coursesSelector,
  getCoursesAsync,
  setCourseParams,
} from '../redux/slices/courseSlice';
import { useAppDispatch, useAppSelector } from '../redux/store/configureStore';
import { categoriesSelector } from '../redux/slices/categorySlice';

const sortOptions = [
  { value: 'title', label: 'Alphabetical' },
  { value: 'priceDescending', label: 'Price - High to low' },
  { value: 'priceAscending', label: 'Price - Low to high' },
];

const HomePage = () => {
  const courses = useAppSelector(coursesSelector.selectAll);
  const dispatch = useAppDispatch();
  const { coursesLoaded, courseParams } = useAppSelector(
    (state) => state.course
  );

  const categories = useAppSelector(categoriesSelector.selectAll);

  const getCategories = () => {
    const catArray: { value: number; label: string }[] = [];

    categories.forEach((category) => {
      catArray.push({ value: category.id, label: category.name });
    });

    return catArray;
  };

  useEffect(() => {
    if (!coursesLoaded) dispatch(getCoursesAsync());
  }, [dispatch, coursesLoaded]);

  return (
    <div className="course">
      <div className="course__header">
        <h1>What to learn next?</h1>
        <h2>New Courses picked just for you...</h2>
      </div>
      <Row gutter={[24, 32]}>
        <Col span={4}>
          <Card title="Sorting Options">
            <Radio.Group
              value={courseParams.sort}
              options={sortOptions}
              onChange={(e) => {
                dispatch(setCourseParams({ sort: e.target.value }));
              }}
            />
          </Card>
          <Card title="Choose Category">
            <Radio.Group
              value={courseParams.category}
              options={getCategories()}
              onChange={(e) => {
                dispatch(setCourseParams({ category: e.target.value }));
              }}
            />
          </Card>
        </Col>
        <Col span={20}>
          <Row gutter={[24, 32]}>
            {courses &&
              courses.map((course) => {
                return <ShowCourses key={course.id} course={course} />;
              })}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
