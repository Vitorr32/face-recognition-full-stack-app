import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageURL, box}) => {
    return (
        <div className='center'>
            <div className='photoContainer'>
                <img id='inputimage' className='photo' src={imageURL} alt='Recognized Faces'/>  
                <div className='bounding-box' style={{top: box.topRow, left: box.leftCol, bottom: box.bottomRow, right: box.rightCol }}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;