import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { setCategoryId } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

function Home() {
    const dispatch = useDispatch();
    const { categoryId, sort } = useSelector(state => state.filter);

    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const onChangeCategory = id => {
        dispatch(setCategoryId(id));
    };

    console.log(categoryId);

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const caregoryId = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://628df5dc368687f3e70d5ea7.mockapi.io/items?page=${currentPage}&limit=4${caregoryId}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => res.json())
            .then(arr => {
                setItems(arr);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
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
            <Pagination onChangePage={number => setCurrentPage(number)} />
        </div>
    );
}

export default Home;
