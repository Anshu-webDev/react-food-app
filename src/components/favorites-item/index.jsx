import React, { useContext } from 'react'
import { ThemeContext } from '../../App';
import './style.css'

const FavoritesItem = (props) => {
    // console.log(props);
    const { id, image, title, removeFromFavorites } = props;
    const { theme } = useContext(ThemeContext);

    // const handleClick = () => {
    //     addToFavourite(id);
    // }

    return (
        <div key={id} className='receipe-item'>
            <div>
                <img src={image} alt='receipeImage' />
            </div>
            <p style={theme ? { color: "#12343b" } : {}}>{title}</p>

            <button style={theme ? { backgroundColor: "#12343b" } : {}} type='button' onClick={removeFromFavorites}>Remove from favourite</button>
        </div>
    )
}

export default FavoritesItem