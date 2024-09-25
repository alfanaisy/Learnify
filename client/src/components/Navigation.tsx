import { ChangeEvent, SyntheticEvent, useState } from 'react';
import Logo from '../assets/logo.png';
import {
  FaBars,
  FaChevronLeft,
  FaSearch,
  FaShoppingCart,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store/configureStore';
import { setCourseParams } from '../redux/slices/courseSlice';

const Navigation = () => {
  const [sidebar, setSidebar] = useState(false);
  const [searchText, setSearchText] = useState('');

  const { basket } = useAppSelector((state) => state.basket);

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(setCourseParams({ search: searchText }));
  };

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const basketCount = basket?.items.length;

  return (
    <div className="nav-container">
      <div className="nav">
        <div className="nav__left">
          <div className="nav__left__hamburger">
            <FaBars onClick={showSidebar} />
            <nav className={`nav-menu ${sidebar ? 'active' : ''}`}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="cancel">
                  <FaChevronLeft />
                </li>
                <li className="nav-menu-items__header">Navigation</li>
                <li>Courses</li>
              </ul>
            </nav>
          </div>
          <img className="nav__left__logo" src={Logo} alt="Logo" />
          <ul className="nav__left__list">
            <Link to="/">
              <li className="nav__left__list__item">Home</li>
            </Link>
          </ul>
        </div>
        <div className="nav__right">
          <form onSubmit={onSearch} className="nav__right__search">
            <input
              type="text"
              className="nav__right__search__input"
              placeholder="Search Courses..."
              onChange={handleChange}
              value={searchText}
            />
            <button className="nav__right__search__button">
              <FaSearch />
            </button>
          </form>
          <Link to={'/basket'}>
            <div className="nav__right__cart">
              <FaShoppingCart />
              {basketCount! > 0 && (
                <span className="nav__right__cart__count">{basketCount}</span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
