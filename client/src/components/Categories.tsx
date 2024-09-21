import { useEffect, useState } from 'react';
import { Category } from '../models/category';
import agent from '../actions/agent';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    agent.Categories.list().then((response) => {
      setCategories(response);
    });
  }, []);

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
