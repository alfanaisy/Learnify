import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { addBasketItemAsync } from '../redux/slices/basketSlice';
import { coursesSelector, getCourseAsync } from '../redux/slices/courseSlice';
import { useAppDispatch, useAppSelector } from '../redux/store/configureStore';

const DescriptionPage = () => {
  const { id } = useParams();

  const course = useAppSelector((state) =>
    coursesSelector.selectById(state, id!)
  );
  const { basket } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!course) dispatch(getCourseAsync({ courseId: id! }));
  }, [id, course, dispatch]);

  const parseDate = (date: Date | undefined) => {
    if (date === undefined)
      return new Intl.DateTimeFormat(['id', 'en-US']).format(new Date());
    return new Intl.DateTimeFormat(['id', 'en-US']).format(new Date(date));
  };

  return (
    <div className="description-page">
      <div className="description-page__body">
        <div className="description-page__header">
          <div className="description-page__header__title">{course?.title}</div>
          <div className="description-page__header__details">
            <div className="description-page__header__details__author">
              Created By
              <span className="description-page__header__details__author--name">
                {course?.instructor}
              </span>
            </div>
            <div className="description-page__header__details__language">
              Language
              <span className="description-page__header__details__language--name">
                {course?.language}
              </span>
            </div>
            <div className="description-page__header__details__updated">
              Last Updated
              <span className="description-page__header__details__updated--date">
                {parseDate(course?.lastUpdated)}
              </span>
            </div>
          </div>
        </div>
        <div className="description-page__info">
          <div className="description-page__info__category">
            Category
            <span className="description-page__info__category--name">
              {course?.category}
            </span>
          </div>
          <div className="description-page__info__level">
            Level
            <span className="description-page__info__level--name">
              {course?.level}
            </span>
          </div>
          <div className="description-page__info__enrolled">
            Total Enrolled
            <span className="description-page__info__enrolled--count">
              {course?.students}
            </span>
          </div>
        </div>
        <div className="description-page__about">
          <div className="description-page__about__title">
            More about Course!
          </div>
          <div className="description-page__about__content">
            {course?.subtitle}
          </div>
        </div>
        <div className="description-page__description">
          <div className="description-page__description__title">
            Description
          </div>
          <div className="description-page__description__content">
            {course?.description}
          </div>
        </div>
      </div>
      <div className="description-page__sidebar">
        <div className="description-page__sidebar__box">
          <div className="description-page__sidebar__box__video">
            <img
              src={course?.image}
              alt="Course__image"
              width="100%"
              height="100%"
            />
          </div>
          <div className="description-page__sidebar__box__price">
            <span className="description-page__sidebar__box__real">
              ${course?.price}
            </span>
            <span className="description-page__sidebar__box__before">$100</span>
            <span className="description-page__sidebar__box__discount">
              {course && `${Math.floor(100 - course!.price)}% off`}
            </span>
          </div>
          <div className="description-page__sidebar__box__learning">
            <div className="description-page__sidebar__box__learning__title">
              What will you learn?
            </div>
            <div className="description-page__sidebar__box__learning__content">
              <ul className="description-page__sidebar__box__learning__content__list">
                {course?.learnings.map((learning, idx) => {
                  return (
                    <li
                      key={idx}
                      className="description-page__sidebar__box__learning__content__list__item"
                    >
                      <span className="description-page__sidebar__box__learning__content__list__item__span">
                        &#10003;
                      </span>
                      {learning.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="description-page__sidebar__box__button">
            {basket?.items.find((item) => item.courseId === course?.id) !==
            undefined ? (
              <Link
                className="description-page__sidebar__box__button--cart"
                to={'/basket'}
              >
                Go to Cart
              </Link>
            ) : (
              <div
                className="description-page__sidebar__box__button--cart"
                onClick={() =>
                  dispatch(addBasketItemAsync({ courseId: course!.id }))
                }
              >
                Add to Cart
              </div>
            )}
            <div className="description-page__sidebar__box__button--text">
              Book Now
            </div>
          </div>
        </div>
        <div className="description-page__sidebar__body">
          <div className="description-page__sidebar__body__requirements">
            <div className="description-page__sidebar__body__requirements__title">
              Requirements of the course
            </div>
            <div className="description-page__sidebar__body__requirements__content">
              <ul className="description-page__sidebar__body__requirements__content__list">
                {course?.requirements.map((requirement, idx) => {
                  return (
                    <li
                      key={idx}
                      className="description-page__sidebar__body__requirements__content__list__item"
                    >
                      <span className="description-page__sidebar__body__requirements__content__list__item__span">
                        &#1003;
                      </span>
                      {requirement.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionPage;
