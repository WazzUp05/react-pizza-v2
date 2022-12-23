import React from 'react';
import debounce from 'lodash.debounce';
import { setSearchValue } from '../../redux/slices/filterSlice';
import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const onClickClear = () => {
        dispatch(setSearchValue(''));
        setValue('');
        inputRef.current?.focus();
    };

    const updateSearchValue = React.useCallback(
        debounce(str => {
            dispatch(setSearchValue(str));
        }, 300),
        []
    );

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        // console.log(event.target.value);
        updateSearchValue(event.target.value);
    };

    return (
        <div className={styles.root}>
            <svg className={styles.search} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <g>
                    <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
                </g>
            </svg>
            <input value={value} onChange={onChangeInput} className={styles.input} ref={inputRef} type="text" placeholder="Поиск пицы" />
            {value && (
                <svg onClick={onClickClear} className={styles.close} height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
                    <path d="M0 0h48v48h-48z" fill="none" />
                </svg>
            )}
        </div>
    );
};

export default Search;
