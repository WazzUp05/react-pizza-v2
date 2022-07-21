import React, { useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
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

    const { categoryId, sort, currentPage } = useSelector(state => state.filter);

    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onChangeCategory = id => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = number => {
        dispatch(setCurrentPage(number));
    };

    const fetchPizzas = () => {
        setIsLoading(true);

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const caregoryId = categoryId > 0 ? `&category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        axios
            .get(
                `https://628df5dc368687f3e70d5ea7.mockapi.io/items?page=${currentPage}&limit=4${caregoryId}&sortBy=${sortBy}&order=${order}${search}`
            )
            .then(res => {
                setItems(res.data);
                setIsLoading(false);
            });
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
        if (!isSearch.current) {
            fetchPizzas();
        }

        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const pizzas = items.map(item => <PizzaBlock key={item.id} {...item} />);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={i => onChangeCategory(i)} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">{isLoading ? skeletons : pizzas}</div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
}

export default Home;
