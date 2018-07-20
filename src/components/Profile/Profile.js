import React,{Component} from 'react';
import './profile.css';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.user.name,
            age: this.props.user.age,
            pet: this.props.user.pet,
        }
    }

    onFormChange = (event) =>{
        switch(event.target.name){
            case 'name':
                this.setState({name:event.target.value})
                break;
            case 'age':
                this.setState({age:event.target.value})
                break;
            case 'pet':
                this.setState({pet:event.target.value})
                break;
            default:
                return;
        }
    }

    onProfileUpdate = (data) =>{
        fetch(`https://young-wave-95662.herokuapp.com/profile/${this.props.user.id}`,{
            method : 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': window.sessionStorage.getItem('token'),            
            },
            body: JSON.stringify({
                formInput : data
            }),
        })
        .then(resp =>{
            if(resp.status === 200 || resp.status === 304){
                this.props.toogleModal();
                this.props.loadUser({...this.props.user, ...data});
            }
        })
        .catch(err => console.log(err));
    }

    render(){
        const {toogleModal, user} = this.props;
        const {name, age, pet} = this.state;
        return (
            <div className="profile-modal">
                <div className='br3 ba b--black-10 mw4 w-100 w-50-m w-25-1 mw6 shadow-5 center bg-white'>
                    <main className="pa4 black-80 w-80">
                        <img src="http://tachyons.io/img/logo.jpg" className="h3 w3 dib" alt="avatar"/>
                        <h1>{this.state.name}</h1>
                        <h1>{user.joined}</h1>
                        <label className="m2 fw6" htmlFor="name">Nickname:</label>
                        <input onChange={this.onFormChange} className="pa2 ba w-100" type="text" name="name"  id="name"/>
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={this.onFormChange} className="pa2 input-reset ba bg-transparent hover-bg-blue  hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={this.onFormChange} className="b pa2 input-reset     ba bg-transparent hover-bg-blue hover-white w-100" type="password" name="password"  id="password"/>
                        <div className="mt4" style={{display:'flex', justifyContent: 'space-evenly'}}>
                            <button onClick={() => this.onProfileUpdate({name, age, pet})} className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'>Save</button>
                            <button onClick={toogleModal} className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'>Cancel</button>
                        </div>
                    </main>
                    <div className='modal-close' onClick={toogleModal}>&times;</div>
                </div>
            </div>
        );
    }
}

export default Profile;