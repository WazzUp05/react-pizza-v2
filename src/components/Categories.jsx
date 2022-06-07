import { useState } from 'react';

function Categories({ value, onClickCategory }) {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
                {categories.map((item, index) => (
                    <li key={index} onClick={() => onClickCategory(index)} className={value === index ? 'active' : ''}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;
