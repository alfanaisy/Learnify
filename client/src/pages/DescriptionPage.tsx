import { useEffect, useState } from 'react';
import { Course } from '../models/course';
import { useParams } from 'react-router-dom';
import agent from '../actions/agent';

const DescriptionPage = () => {
  const [course, setCourse] = useState<Course>();

  const { id } = useParams();

  useEffect(() => {
    agent.Courses.getById(id!).then((response) => {
      setCourse(response);
    });
  }, [id]);

  return (
    <div>
      <h1>{course?.title}</h1>
    </div>
  );
};

export default DescriptionPage;
