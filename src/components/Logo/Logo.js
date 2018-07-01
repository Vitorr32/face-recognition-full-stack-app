import React from 'react';
import Tilt from 'react-tilt';
import logovrc from './logovrc.png';
import './logo.css'

const Logo = () => {
    return (
        <div className='logoholder'>
            <Tilt className="Tilt" options={{ max : 50 }} >
                <div className="Tilt-inner"> 
                    <img src={logovrc} alt='Logo VRC Creative Solution'/> 
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;