import React from 'react';
import './FaceRecognition.css'

class FaceRecognition extends React.Component{

    renderBoxes = (boxes) =>{
        boxes.map((box)=>{
            return <div className='bounding-box' style={{top: box.topRow, left: box.leftCol, bottom: box.bottomRow, right: box.rightCol }}></div>
        });
    }

    render(){
        const {imageURL,box} = this.props  
        
        if(!imageURL){ return null; }

        return(
            <div className='center'>
                <div className='photoContainer'>
                    <img id='inputimage' className='photo' src={imageURL} alt='Recognized Faces'/>  
                    {this.renderBoxes(box)}
                </div>
            </div>
        );
    }
}


export default FaceRecognition;