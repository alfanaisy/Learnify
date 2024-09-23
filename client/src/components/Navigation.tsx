import { useState } from 'react';
import Logo from '../assets/logo.png';
import {
  FaBars,
  FaChevronLeft,
  FaSearch,
  FaShoppingCart,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

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
          <form className="nav__right__search">
            <input
              type="text"
              className="nav__right__search__input"
              placeholder="Search Courses..."
            />
            <button className="nav__right__search__button">
              <FaSearch />
            </button>
          </form>
          <div className="nav__right__cart">
            <FaShoppingCart />
            <span className="nav__right__cart__count"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
