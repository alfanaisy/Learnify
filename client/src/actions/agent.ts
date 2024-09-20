import axios, { AxiosResponse } from 'axios';
import { Course } from '../models/course';

axios.defaults.baseURL = 'http://localhost:5192/api';

const responseBody = <T>(response: AxiosResponse<T>) => {
  return response.data;
};

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Courses = {
  list: () => requests.get<Course[]>('/courses'),
};

const agent = {
  Courses,
};

export default agent;
