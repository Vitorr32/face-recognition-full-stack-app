import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Singin from '../components/Singin/Singin';
import Register from '../components/Register/Register';
import Particles from 'react-particles-js';
import PaticleConfig from './particlesjs-config.json';
import './App.css';


const defaultState = {
  input: '',
  imageURL : '',
  box : {},
  route: 'singin',
  isSignedIn : false,
  user : { 
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
};

class App extends Component {
  constructor(){
    super();
    this.state = defaultState;
  }

  loadUser = (registereduser) =>{
    this.setState({user: {
        id: registereduser.id,
        name: registereduser.name,
        email: registereduser.email,
        entries: registereduser.entries,
        joined: registereduser.joined,
      }
    });
  }

  getFacesLocations = (data) =>{
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const boxes = data.outputs[0].data.regions.map((region) =>{
      const box = region.region_info.bounding_box
      return {
        leftCol: box.left_col * width,
        topRow: box.top_row * height,
        rightCol: width - (box.right_col * width),
        bottomRow: height - (box.bottom_row * height),
      }
    });
    return boxes;
  }

  getFaceLocation = (data) =>{
    const clarifaiface = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiface.left_col * width,
      topRow: clarifaiface.top_row * height,
      rightCol: width - (clarifaiface.right_col * width),
      bottomRow: height - (clarifaiface.bottom_row * height),
    }
  }

  displayBoundingBox = (box) =>{
    this.setState({box : box});
  }

  onInputChange = (event) =>{
    this.setState({input : event.target.value});
  }

  onPicutreSubmit = () =>{
    this.setState({imageURL: this.state.input});

    fetch('https://young-wave-95662.herokuapp.com/imageurl',{
        method : 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          input : this.state.input
      })
    })
    .then(response => response.json())
    .then(response =>{
      fetch('https://young-wave-95662.herokuapp.com/image',{
        method : 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            id : this.state.user.id
        }),
      })
      .then(response => response.json())
      .then(count =>{
        this.setState(Object.assign(this.state.user, { entries : count} ))
      })
      .catch(err => console.log(err));

      
      //this.displayBoundingBox(this.getFaceLocation(response))
      this.displayBoundingBox(this.getFacesLocations(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'singout'){
      this.setState(this.setState(defaultState))
    }
    else if(route === 'home'){
      this.setState({isSignedIn : true})
    }
    this.setState({route : route})
  }

  recoverPageFromRoute = () =>{
    const{route, box, imageURL} = this.state;
    switch(route){
      case 'singout': // Fallthrough
      case 'singin':
        return <Singin loadUser = {this.loadUser} onRouteChange ={this.onRouteChange} />;
      case 'register':
        return <Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange} />;
      default:
        return(
          <div>
            <Logo />
            <Rank user={this.state.user}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit ={this.onPicutreSubmit}/>
            <FaceRecognition box={box} imageURL={imageURL}/>
          </div>
        );
    }
  }

  render() {
    
    return (
      <div className="App">
        <Particles className='particles' params={PaticleConfig} />        
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.recoverPageFromRoute()}
      </div>
    );
  }
}

export default App;
