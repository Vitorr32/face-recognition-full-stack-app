import React from 'react';
import './FaceRecognition.css'

const showPhoto = (imageURL, box) => {
    if(imageURL){
        return(
        <div className='center'>
            <div className='photoContainer'>
                <img id='inputimage' className='photo' src={imageURL} alt='Recognized Faces'/>  
                <div className='bounding-box' style={{top: box.topRow, left: box.leftCol, bottom: box.bottomRow, right: box.rightCol }}></div>
            </div>
        </div>
        );
    }
    else{
        return null;
    }
}

const FaceRecognition = ({imageURL, box}) => {
    return showPhoto(imageURL, box);
}

export default FaceRecognition;