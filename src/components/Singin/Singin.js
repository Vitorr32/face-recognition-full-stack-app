import React from 'react';
import './Singin.css';

const Singin = ({onRouteChange}) => {
    return (
        <div className='br3 ba b--black-10 mw4 w-100 w-50-m w-25-1 mw6 shadow-5 center'>
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-blue  hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-blue hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                            <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
                    </fieldset>
                    <div className="">
                        <input onClick={() => onRouteChange('home')} className="b ph3 pv2 input-reset ba b--blue bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                        <a href="#0" onClick={() => onRouteChange('register')} className="f6 link dim blue db">Register</a>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Singin;