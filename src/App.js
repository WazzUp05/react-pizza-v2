import { useEffect, useState } from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';

const url = 'https://628df5dc368687f3e70d5ea7.mockapi.io/items';

function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(json => setItems(json));
    }, []);

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories />
                        <Sort />
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {items.map(item => (
                            <PizzaBlock key={item.id} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
