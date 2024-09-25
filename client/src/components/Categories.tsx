import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  categoriesSelector,
  getCategoriesAsync,
} from '../redux/slices/categorySlice';
import { useAppDispatch, useAppSelector } from '../redux/store/configureStore';

const Categories = () => {
  const categories = useAppSelector(categoriesSelector.selectAll);
  const { categoriesLoaded } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!categoriesLoaded) dispatch(getCategoriesAsync());
  }, [categoriesLoaded, dispatch]);

  return (
    <div className="categories">
      {categories &&
        categories.map((category) => {
          return (
            <Link to={`/category/${category.id}`} key={category.id}>
              <div className="categories__name">{category.name}</div>
            </Link>
          );
        })}
    </div>
  );
};

export default Categories;
