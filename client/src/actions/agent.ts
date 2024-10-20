import axios, { AxiosResponse } from 'axios';
import { Course } from '../models/course';
import { PaginatedData } from '../models/paginatedData';
import { Category } from '../models/category';
import { Basket } from '../models/basket';
import { Login, Register, User } from '../models/user';
import { Store } from 'redux';
import { Lecture } from '../models/lecture';

axios.defaults.baseURL = 'http://localhost:5192/api';

const responseBody = <T>(response: AxiosResponse<T>) => {
  return response.data;
};

axios.defaults.withCredentials = true;

export const axiosInterceptor = (store: Store) => {
  axios.interceptors.request.use((config) => {
    const token = store.getState().user.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

const requests = {
  get: <T>(url: string, params?: URLSearchParams) =>
    axios.get<T>(url, { params }).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Users = {
  login: (values: Login) => requests.post<User>('/users/login', values),
  register: (values: Register) =>
    requests.post<User>('/users/register', values),
  addCourse: () => requests.post('/users/purchaseCourses', {}),
  currentUser: () => requests.get<User>('/users/currentUser'),
};

const Courses = {
  list: (params?: URLSearchParams) =>
    requests.get<PaginatedData<Course>>('/courses', params),
  getById: (id: string) => requests.get<Course>(`/courses/${id}`),
};

const Categories = {
  list: () => requests.get<Category[]>('/categories'),
  getCategory: (id: number) => requests.get<Category>(`/categories/${id}`),
};

const Baskets = {
  get: () => requests.get<Basket>('/baskets'),
  addItem: (courseId: string) =>
    requests.post<Basket>(`/baskets?courseId=${courseId}`, {}),
  removeItem: (courseId: string) =>
    requests.del(`/baskets?courseId=${courseId}`),
  clear: () => requests.del('/baskets/clear'),
};

const Payments = {
  paymentIntent: () => requests.post<Basket>('/payments', {}),
};

const Lectures = {
  getLectures: (courseId: string) =>
    requests.get<Lecture>(`/lectures/${courseId}`),
  setCurrentLecture: (values: { lectureId: number; courseId: string }) =>
    requests.put<>('/lectures/setCurrentLecture', values),
};

const agent = {
  Users,
  Courses,
  Categories,
  Baskets,
  Payments,
  Lectures,
};

export default agent;
