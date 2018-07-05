import React from 'react';
import './FaceRecognition.css'

class FaceRecognition extends React.Component{
    
    renderBoxes = (boxes) =>{
        const result = boxes.map((box,iterator)=>{
            return <div key={`box${iterator}`} className='bounding-box' style={{top: box.topRow, left: box.leftCol, bottom: box.bottomRow, right: box.rightCol }}></div>
        });
        return result;
    }

    render(){
        const {imageURL,box} = this.props  
        
        if(!imageURL || !box){ return null; }

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