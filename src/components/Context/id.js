import React, { useState, createContext } from 'react';

export const IdContext = React.createContext({
    id: 'yes'
});

export const IdProvider = (props) => {
    const [id, setId] = useState('');
    return(
        <IdContext.Provider value={[id, setId]}>
            {props.children}
        </IdContext.Provider>
    )
}