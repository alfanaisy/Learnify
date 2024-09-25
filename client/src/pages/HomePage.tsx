import { useEffect } from 'react';
import ShowCourses from '../components/ShowCourses';

import { Row } from 'antd';
import { coursesSelector, getCoursesAsync } from '../redux/slices/courseSlice';
import { useAppDispatch, useAppSelector } from '../redux/store/configureStore';

const HomePage = () => {
  const courses = useAppSelector(coursesSelector.selectAll);
  const dispatch = useAppDispatch();
  const { coursesLoaded } = useAppSelector((state) => state.course);

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
        {courses &&
          courses.map((course) => {
            return <ShowCourses key={course.id} course={course} />;
          })}
      </Row>
    </div>
  );
};

export default HomePage;
