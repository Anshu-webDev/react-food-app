import React, { useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { ThemeContext } from '../../App';
import FavoritesItem from '../../components/favorites-item';
import ReceipeItem from '../../components/receipe-item';
import Search from '../../components/search'
import './style.css'

const reducer = (state, action) => {
    switch (action.type) {
        case 'filterFavorites':
            console.log(state, "state");
            console.log(action, "action");
            return {
                ...state,
                filteredValue: action.value,
            };
        default:
            return state;
    }
}

const initialState = {
    filteredValue: ''
}

const Homepage = () => {

    // loading state
    const [loadingState, setLoadingState] = useState(false);

    // save results that receive from api
    const [receipes, setReceipes] = useState([]);

    // favourite data state
    const [favorites, setFavorites] = useState([]);

    // state for api successful or not
    const [apiCallSuccess, setApiCallSuccess] = useState(false);

    // use reducer functionality
    const [filterState, dispatch] = useReducer(reducer, initialState);

    const { theme } = useContext(ThemeContext);

    const getDataFromSearchComp = (getData) => {
        setLoadingState(true);
        // console.log(getData, "getdata");

        // calling the api
        const getReceipes = async () => {
            const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=463dd04539744462a317fa91717df4e5&query=${getData}`)

            const result = await apiResponse.json();
            const { results } = result;
            if (results && results.length > 0) {
                setLoadingState(false);
                setReceipes(results);
                setApiCallSuccess(true);
            }
        }
        getReceipes();
    }

    // use callback
    const addFavourite = useCallback((getItem) => {
        // console.log(getItem.id, 'get id');
        let cpyFavorites = [...favorites];

        const index = cpyFavorites.findIndex(item => item.id === getItem.id);

        if (index === -1) {
            cpyFavorites.push(getItem);
            setFavorites(cpyFavorites);
            // save the favorites in local storage
            localStorage.setItem('favorites', JSON.stringify(cpyFavorites));
            window.scrollTo({ top: '0', behavior: 'smooth' })
        } else {
            alert("This item is already present")
        }
    }, [favorites])

    // const addFavourite = (getItem) => {
    //     // console.log(getItem.id, 'get id');
    //     let cpyFavorites = [...favorites];

    //     const index = cpyFavorites.findIndex(item => item.id === getItem.id);

    //     if (index === -1) {
    //         cpyFavorites.push(getItem);
    //         setFavorites(cpyFavorites);
    //         // save the favorites in local storage
    //         localStorage.setItem('favorites', JSON.stringify(cpyFavorites));
    //     } else {
    //         alert("This item is already present")
    //     }
    // }

    const removeFromFavorites = (getCurrentId) => {
        let cpyFavorites = [...favorites];
        cpyFavorites = cpyFavorites.filter((item) => item.id !== getCurrentId);

        setFavorites(cpyFavorites);
        localStorage.setItem('favorites', JSON.stringify(cpyFavorites));
    }

    useEffect(() => {
        console.log("this log only once");
        const extractFavoritesFromLocalstorage = JSON.parse(
            localStorage.getItem('favorites')
        ) || [];
        setFavorites(extractFavoritesFromLocalstorage);
    }, []);

    console.log(filterState, "filterState");

    // filter the favorites

    const filterFavoritesItems = favorites && favorites.length > 0 ? favorites.filter(item =>
        item.title.toLowerCase().includes(filterState.filteredValue)
    ) : [];

    // const renderRecipe = useCallback(() => {
    //     if (receipes && receipes.length > 0) {
    //         return (
    //             receipes.map(item => (
    //                 <ReceipeItem
    //                     key={item.id}
    //                     addToFavourite={() => addFavourite(item)}
    //                     id={item.id}
    //                     image={item.image}
    //                     title={item.title}
    //                 />
    //             ))
    //         )
    //     }

    // }, [receipes, addFavourite])

    return (
        <div className='homepage'>
            <Search
                getDataFromSearchComp={getDataFromSearchComp}
                apiCallSuccess={apiCallSuccess}
                setApiCallSuccess={setApiCallSuccess}
            />


            {/* show favorites */}
            <div className='favorites-wrapper'>
                <h1 style={theme ? { color: "#12343b" } : {}} className='favorites-title'>Favorites</h1>

                <div className='search-favorites'>
                    <input
                        onChange={(e) => dispatch({ type: 'filterFavorites', value: e.target.value })}
                        value={filterState.filteredValue}
                        name='searchFavorites'
                        placeholder='search favorites'
                    />
                </div>

                <div className='favorites'>
                    {!filterFavoritesItems.length && <div style={{ width: '100%', justifyContent: 'center' }} className='no-items'>No Favorites are found</div>}

                    {filterFavoritesItems && filterFavoritesItems.length > 0 ?
                        filterFavoritesItems.map(item => (
                            <FavoritesItem
                                key={item.id}
                                removeFromFavorites={() => removeFromFavorites(item.id)}
                                id={item.id}
                                image={item.image}
                                title={item.title}
                            />
                        )) : null
                    }
                </div>
            </div>
            {/* show favorites */}

            {/* show loading state */}
            {loadingState && <div className='loading'>Loading, please wait</div>}

            {/* map through receipes */}
            <div className='items'>
                {/* {renderRecipe()} */}

                {
                    useMemo(() => (
                        !loadingState && receipes && receipes.length > 0 ?
                            receipes.map(item => (
                                <ReceipeItem
                                    key={item.id}
                                    addToFavourite={() => addFavourite(item)}
                                    id={item.id}
                                    image={item.image}
                                    title={item.title}
                                />
                            ))
                            : null
                    ), [loadingState, addFavourite, receipes])
                }

                {/* {
                    
                receipes && receipes.length > 0 ?
                    receipes.map(item => (
                        <ReceipeItem
                            key={item.id}
                            addToFavourite={() => addFavourite(item)}
                            id={item.id}
                            image={item.image}
                            title={item.title}
                        />
                    )) 
                    : null
                } */}
            </div>
            {/* map through all the recepies  */}

            {
                !loadingState && !receipes.length && <div className='no-items'>No Receipe are found</div>
            }

        </div>
    )
}

export default Homepage