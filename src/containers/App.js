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
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'e25d4397564b4d5abbfa90da26bb9c4d'
});

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL : '',
      box : {},
      route: 'singin',
      isSignedIn : false,
    }
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

  onButtonSubmit = (event) =>{
    this.setState({imageURL: this.state.input});

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then((response) => this.displayBoundingBox(this.getFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'singout'){
      this.setState({isSignedIn : false})
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
        return <Singin onRouteChange ={this.onRouteChange} />;
      case 'register':
        return <Register onRouteChange={this.onRouteChange} />;
      default:
        return(
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit ={this.onButtonSubmit}/>
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
