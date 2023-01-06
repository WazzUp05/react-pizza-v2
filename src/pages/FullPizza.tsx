import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
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
                    <br />
                    <Link to="/" className="button button--outline button--add go-back-btn">
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 13L1 6.93015L6.86175 1"
                                stroke="#D3D3D3"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                        <span>Вернуться назад</span>
                    </Link>
                </>
            )}
        </div>
    );
};

export default FullPizza;
