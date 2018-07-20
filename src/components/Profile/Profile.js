import React from 'react';
import './profile.css';

const Profile = ({isProfileOpen, toogleModal}) => {
    return (
        <div className="profile-modal">
            <div className='br3 ba b--black-10 mw4 w-100 w-50-m w-25-1 mw6 shadow-5 center bg-white'>
                <main className="pa4 black-80 w-80">
                    <img src="http://tachyons.io/img/logo.jpg" className="h3 w3 dib" alt="avatar"/>
                    <label className="m2 fw6" htmlFor="nickname">Nickname:</label>
                    <input className="pa2 ba w-100" type="text" name="nickname"  id="nickname"/>
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-blue  hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-blue hover-white w-100" type="password" name="password"  id="password"/>

                    <div className="mt4" style={{display:'flex', justifyContent: 'space-evenly'}}>
                        <button className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'>Save</button>
                        <button onClick={toogleModal} className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'>Cancel</button>
                    </div>
                </main>
                <div className='modal-close' onClick={toogleModal}>&times;</div>
            </div>
        </div>
    );
}

export default Profile;