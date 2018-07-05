import React from 'react';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name : '',
            namefeedback: '',
            email : '',
            emailfeedback: '',
            password: '',
            passwordfeedback: '',
            valid: false
        }
        this.references = React.createRef();
    }


    onNameChange = (event) => {
        const {value} = event.target;

        this.setState({ name : value});

        if(!value){
            this.setState({
                namefeedback : 'You have a name...rigth?',
                valid: false
            });
        }
        else if(value.length > 100){
            this.setState({
                namefeedback : 'Your name need to be less than 100 characteres long',
                valid : false
            });
        }
        else{
            this.setState({
                namefeedback : '',
            });            
        }
    }

    onEmailChange = (event) => {
        const {value} = event.target;
        const re = new RegExp('^\\S+@\\S+[\\.][0-9a-z]+$');

        this.setState({email : value});        

        console.log(value + " is " + re.test(value));

        if(!value){
            this.setState({
                emailfeedback : 'You need a email so that you can login later',
                valid: false
            });
        }
        else if(!re.test(value)){
            this.setState({
                emailfeedback : `That's not a valid email format`,
                valid : false
            });
        }
        else{
            this.setState({
                emailfeedback : '',
            });            
        }
    }

    onPasswordChange = (event) => {
        const {value} = event.target;

        this.setState({ password : value});

        if(!value){
            this.setState({
                passwordfeedback : 'You need a password so that you can login later',
                valid: false
            });
        }
        else{
            this.setState({
                passwordfeedback : '',
            });            
        }
    }

    checkValidEmail = () => {
        const {email} = this.state;
        fetch('https://young-wave-95662.herokuapp.com/registercheck', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email : email
            }),
        }).then( response => {
            if(response.status === 200){
                return true;
            }
            else if(response.status === 409){
                this.setState({emailfeedback : 'Esse email já está registrado'})
                return false;
            }
        })
    }

    onSubmitRegister = () =>{
        const {name, email, password, valid} = this.state;
        
        //If any of the fields is invalid or the email is not valid
        if(!this.checkValidEmail()) {return;}
        console.log("All okay!");
        return;
        /*
        fetch('https://young-wave-95662.herokuapp.com/register', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                name : name,
                password : password,
                email : email
            }),
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
            else{

            }
        });
        */
    }

    render(){    
        return (
            <div className='br3 ba b--black-10 mw4 w-100 w-50-m w-25-1 mw6 shadow-5 center'>
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0 center">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="nickname">Nickname</label>
                                <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-blue  hover-white w-100" type="text" name="nickname"  id="nickname"/>
                                <label className="db fw6 lh-copy f6 dark-red" htmlFor="nickname">{this.state.namefeedback}</label>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-blue  hover-white w-100" type="email" name="email-address"  id="email-address"/>
                                <label className="db fw6 lh-copy f6 dark-red" htmlFor="email-address">{this.state.emailfeedback}</label>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-blue hover-white w-100" type="password" name="password"  id="password"/>
                                <label className="db fw6 lh-copy f6 dark-red" htmlFor="password">{this.state.passwordfeedback}</label>
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--blue bg-transparent grow pointer f6 dib pointer" type="submit" value="Register"/>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default Register;