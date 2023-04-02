import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../App';
import './style.css'

const Search = (props) => {

    const { getDataFromSearchComp, apiCallSuccess, setApiCallSuccess } = props;

    const { theme } = useContext(ThemeContext);

    const [inputValue, setInputValue] = useState('');

    const handleInputValue = (e) => {
        const { value } = e.target;
        // set the updated value
        setInputValue(value)
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        getDataFromSearchComp(inputValue);
    }

    useEffect(() => {
        if (apiCallSuccess) {
            setInputValue('');
            setApiCallSuccess(false);
        }
    }, [apiCallSuccess, setApiCallSuccess])

    return (
        <form onSubmit={handleSubmit} className='Search'>
            <input name='search' onChange={handleInputValue} value={inputValue} placeholder='search receipes' id='search' />
            <button style={theme ? { backgroundColor: "#12343b" } : {}} type='submit'>Search</button>
        </form>
    )
}

export default Search