import axios, { AxiosResponse } from 'axios';
import { Course } from '../models/course';
import { PaginatedData } from '../models/paginatedData';
import { Category } from '../models/category';

axios.defaults.baseURL = 'http://localhost:5192/api';

const responseBody = <T>(response: AxiosResponse<T>) => {
  return response.data;
};

axios.defaults.withCredentials = true;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Courses = {
  list: () => requests.get<PaginatedData<Course>>('/courses'),
  getById: (id: string) => requests.get<Course>(`/courses/${id}`),
};

const Categories = {
  list: () => requests.get<Category[]>('/categories'),
  getCategory: (id: number) => requests.get<Category>(`/categories/${id}`),
};

const Basket = {
  get: () => requests.get('/baskets'),
  addItem: (courseId: string) =>
    requests.post(`/baskets?courseId=${courseId}`, {}),
  removeItem: (courseId: string) =>
    requests.del(`/baskets?courseId=${courseId}`),
};

const agent = {
  Courses,
  Categories,
  Basket,
};

export default agent;
