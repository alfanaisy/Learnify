import { useEffect, useState } from 'react';
import './App.css';

import axios from 'axios';

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5192/api/courses').then((response) => {
      console.log(response);
      setCourses(response.data);
    });
  }, []);

  if (courses.length < 1) {
    return <p>No Data.</p>;
  }

  return (
    <>
      <div>
        <ul>
          {courses.map((course: any, idx) => {
            return (
              <li key={idx}>
                {course.id}
                {course.title}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
