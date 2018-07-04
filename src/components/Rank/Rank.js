import React from 'react';
import './rank.css'

const Rank = ({user}) => {
    return (
        <div>  
            <div className='white f3'>
                {`Hello ${user.name}, you have...`}
            </div>
            <div className='white f1'>
                {`${user.entries} submissions!`}
            </div>
        </div>
    );
}

export default Rank;