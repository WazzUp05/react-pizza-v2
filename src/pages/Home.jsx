import React, { useRef } from 'react';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortList } from '../components/Sort';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizzaData);

    const onChangeCategory = id => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = number => {
        dispatch(setCurrentPage(number));
    };

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `&category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage,
            })
        );

        window.scrollTo(0, 0);
    };

    // Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    // Если был первый рендер, то проверяем и сохранаем в редаксе
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            );
            isSearch.current = true;
        }
    }, []);

    // Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        window.scrollTo(0, 0);
        // if (!isSearch.current) {
        getPizzas();
        // }

        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const pizzas = items.map(item => (
        <Link key={item.id} to={`/pizza/${item.id}`}>
            <PizzaBlock {...item} />
        </Link>
    ));
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={i => onChangeCategory(i)} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>
                        Произошла ошибка <icon>😕</icon>
                    </h2>
                    <p>Не удалось получить пиццы.</p>
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            )}

            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
}

export default Home;
