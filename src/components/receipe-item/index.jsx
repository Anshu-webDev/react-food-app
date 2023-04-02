import React, { useContext } from 'react'
import { ThemeContext } from '../../App';
import './style.css'

const ReceipeItem = (props) => {
    // console.log(props);
    const { addToFavourite, id, image, title } = props;

    const { theme } = useContext(ThemeContext);

    // const handleClick = () => {
    //     addToFavourite(id);
    // }

    return (
        <div key={id} className='receipe-item'>
            <div>
                <img src={image} alt='receipeImage' />
            </div>
            <p style={theme ? { color: "#12343b" } : {}}>{title} - {id}</p>

            <button style={theme ? { backgroundColor: "#12343b" } : {}} type='button' onClick={addToFavourite}>Add to favourite</button>
        </div>
    )
}

export default ReceipeItem