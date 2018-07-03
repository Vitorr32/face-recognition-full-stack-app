import React from 'react';
import './rank.css'

const Rank = ({user}) => {
    return (
        <div>  
            <div className='white f3'>
                {`Hello ${user.name}, you are our..`}
            </div>
            <div className='white f1'>
                {`${user.entries} in submissions!`}
            </div>
        </div>
    );
}

export default Rank;