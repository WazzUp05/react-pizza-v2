import React from 'react';

import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

function Home() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating',
    });

    useEffect(() => {
        setIsLoading(true);
        fetch(
            `https://628df5dc368687f3e70d5ea7.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${
                sortType.sortProperty
            }&order=desc`
        )
            .then(res => res.json())
            .then(arr => {
                setItems(arr);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={i => setCategoryId(i)} />
                <Sort value={sortType} onChangeSort={i => setSortType(i)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                    : items.map(item => <PizzaBlock key={item.id} {...item} />)}
            </div>
        </div>
    );
}

export default Home;
