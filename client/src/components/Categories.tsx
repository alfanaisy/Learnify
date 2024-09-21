import { useEffect, useState } from 'react';
import { Category } from '../models/category';
import agent from '../actions/agent';

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
            <div className="categories__name" key={category.id}>
              {category.name}
            </div>
          );
        })}
    </div>
  );
};

export default Categories;
