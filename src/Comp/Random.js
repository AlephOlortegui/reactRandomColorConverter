import { useState } from 'react';
import '../styles/Random.css';

const simpleColors = ["hsl(174, 36%, 64%)","hsl(37, 89%, 67%)","rgb(239, 35, 60)","rgb(83, 144, 217)","hsl(205, 78%, 60%)"];
const hex =  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const Random = () => {
  const [bgColor, setBgColor] = useState('transparent')

  const getRandomColor = (arr) => { 
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex]
  }

  const handleSimple = () => { 
    let newBg = getRandomColor(simpleColors)
    setBgColor(newBg)
  }

  const handleHex = () => { 
    let hash = "#"
    for (let i = 0; i < 6; i++) {
        //concatenate     
        hash = hash + getRandomColor(hex)  
    }
    setBgColor(hash)
   }

  return (
    <div className='random-container' style={{backgroundColor: bgColor}}>
      <div className="top">
        <h2>Color: <span className="color">{bgColor}</span></h2>
          <div className="btn-group">
            <button className="btn btn-simple" onClick={handleSimple}>Simple</button>
            <button className="btn btn-hex" onClick={handleHex}>Hex</button>
          </div>
      </div>
    </div>
  )
}

export default Random