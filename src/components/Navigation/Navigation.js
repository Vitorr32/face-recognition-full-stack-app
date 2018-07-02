import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn){
        return(
        <nav style={{display:'flex', justifyContent:'flex-end'}}>
            <p onClick={() => onRouteChange('singout')} className='f3 link dim black underline pad3 pointer'>Sing Out</p>
        </nav>
        );
    }else{
        return(
        <nav style={{display:'flex', justifyContent:'flex-end'}}>
            <p onClick={() => onRouteChange('singin')} className='f3 link dim black underline pad3 pointer'>Sing In</p>
            <p onClick={() => onRouteChange('register')} className='pl3 f3 link dim black underline pad3 pointer'>Register</p>
        </nav>
        );
    }
}

export default Navigation;