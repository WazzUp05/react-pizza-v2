import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FullPizza = () => {
    const [pizza, setPizza] = React.useState();
    const { id } = useParams();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(`https://628df5dc368687f3e70d5ea7.mockapi.io/items/${id}`);
                setPizza(data);
            } catch (error) {
                alert('Ошибка при получении пиццы');
            }
        }
        fetchPizza();
    }, []);

    return (
        <div className="container">
            {!pizza ? (
                'Загрузка'
            ) : (
                <>
                    <img src={pizza.imageUrl} alt="" />
                    <h2>{pizza.title}</h2>

                    <b>{pizza.price}</b>
                </>
            )}
        </div>
    );
};

export default FullPizza;
