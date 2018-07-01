import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Singin from '../components/Singin/Singin';
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

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={PaticleConfig} />
        <Singin/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit ={this.onButtonSubmit}/>
        <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;
