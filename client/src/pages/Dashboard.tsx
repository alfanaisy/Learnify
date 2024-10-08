import { Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../redux/store/configureStore';
import ShowCourses from '../components/ShowCourses';
import { useEffect } from 'react';
import { fetchCurrentUser } from '../redux/slices/userSlice';

const Dashboard = () => {
  const { userCourses } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>My Courses</h1>
      </div>
      <div className="dashboard__courses">
        <Row gutter={[48, 32]} />
        {userCourses.length > 0 ? (
          userCourses.map((course) => {
            return <ShowCourses key={course.id} course={course} />;
          })
        ) : (
          <h1>You have not bought any courses</h1>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
