import React from 'react';
import './App.css';

const SearchItem = ({props}) => {
    return (
        <div>
            <h2>{props.item.displayName}</h2>
            <h3>{props.group.displayName}</h3>
        </div>
    )
}

export default SearchItem;