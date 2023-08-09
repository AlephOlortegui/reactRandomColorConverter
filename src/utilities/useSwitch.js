import { useContext, useState } from 'react';
import { BgContext } from '../context/BgProvider';

const useSwitch = () => {
  const {colorsFormat, dispatch} = useContext(BgContext)
  // console.log(colorsFormat)

  const [isSwitch, setIsSwitch] = useState(false)
  const [data, setData] = useState({
    rValue: "",
    gValue:"",
    bValue: "",
    hexVal: ""
  })
  const [warning, setWarning] = useState({
    isWarning: false,
    warningText: ''
  })
  /* const [colorsFormat, setColorsFormat] = useState({
    hex: '#222',
    R:"34",
    G:"34",
    B:"34"
  }) */

  const handleSwitch = () => { 
    setIsSwitch(prevState => !prevState)
  }

  const handleFocus = (e) => { 
    //console.log(e.target)
    const formControl = e.target.parentNode
    formControl.classList.add('focus') 
  }
  const handleBlur = (e) => { 
    const formControl = e.target.parentNode
    if(!e.target.value) formControl.classList.remove('focus') 
  }

  const handleChange = (e) => { 
    const {name,value} = e.target
    //Computed Property names
    setData({
      ...data,
      [name]:value
    })
  }

  // ************  Functionality - calculations ****************************

  const closeAlert = () => { 
    setWarning({
      ...warning,
      isWarning: false,
      warningText: ""
    })
  }

  const checkHash = (text) => { 
    let hash = /#/;
    if(hash.test(text)) text = text.slice(1)
    return text
  }

  const convertToRGB = (y,len) => { 
    let channels = ['R', 'G', 'B'];
    let eachChar = []
    let result = {};
    for (let i of y) {
      eachChar.push(i)
    }
    /* convert each letter to decimal value */
    eachChar.forEach((char,index)=>{
      switch (char) {
          case 'a': eachChar[index] = 10; break;
          case 'b': eachChar[index] = 11; break;
          case 'c': eachChar[index] = 12; break;
          case 'd': eachChar[index] = 13; break;
          case 'e': eachChar[index] = 14; break;
          case 'f': eachChar[index] = 15; break;
          default: eachChar[index] = +(eachChar[index]);
      }
    })
    if(len > 3){ //if we have our 6 digits/characters
      //[0,1,2,3,4,5]
      for (let i = 0; i < channels.length; i++) {
        result[channels[i]] = 16 * eachChar[i * 2] + eachChar[i * 2 + 1];
      }
    } else{//[0,1,2]
      for (let i = 0; i < channels.length; i++) {
        result[channels[i]] = 16 * eachChar[i] + eachChar[i];
      }
    }
    console.log(result)
    const {R,G,B} = result;
    //dispatch
    dispatch({type: "UPDATE_BG", payload:{
      hex: `#${y}`,
      R,G,B
    }})
    /* setColorsFormat({
      ...colorsFormat,
      hex: `#${y}`,
      R,G,B
    }) */
    //Clean input
    setData({
      ...data,
      hexVal: ''
    })
    //hack lazy
    document.querySelector('.hexControl').classList.remove('focus') 
  }

  const handleToRGB = () => { 
    const {hexVal} = data
    let y = checkHash(hexVal.toLowerCase().trim())
    //console.log(y)
    let len = y.length;
    let rgx6 = /[a-f\d]{6}/ig; // Check correct y value, let y = /[a-f0-9]{6}/ig;
    let rgx3 = /[a-f\d]{3}/ig;
    if(!y) {
      setWarning({
          ...warning,
          isWarning: true,
          warningText: "the entry can't be empty"
      })
    }
    else if((len === 3 && rgx3.test(y)) || (len === 6 && rgx6.test(y))){
      // console.log('success')
      convertToRGB(y,len)
    }
    else{
      setData({
        ...data,
        hexVal: ''
      })
      setWarning({
        ...warning,
        isWarning: true,
        warningText: "Oops! something went wrong with the given value"
      })
      //hack lazy
      document.querySelector('.hexControl').classList.remove('focus') 
    }
  }

  const convertToHEX = (arrRGB,R,G,B) => { 
    let myArr = []
    arrRGB.forEach(i =>{
        let q = Math.floor(i/16); //quotient
        let r = i%16; //remainder
        myArr.push(q,r)
    })
    myArr.forEach((y,index) =>{
      switch(y){
          case 10 : myArr[index] = 'A'; break;
          case 11 : myArr[index] = 'B'; break;
          case 12 : myArr[index] = 'C'; break;
          case 13 : myArr[index] = 'D'; break;
          case 14 : myArr[index] = 'E'; break;
          case 15 : myArr[index] = 'F'; break;
          default: break;
      }
    });
    /* setColorsFormat({
      ...colorsFormat,
      hex: `#${myArr.join("")}`,
      R,G,B
    }) */
    //dispatch
    dispatch({type: "UPDATE_BG", payload:{
      hex: `#${myArr.join("")}`,
      R,G,B
    }})
  }

  const handleToHex = () => { 
    const {rValue: R, gValue: G, bValue: B} = data
    let inputsVal = [R,G,B]
    let arrRGB = [];
    try {
      inputsVal.forEach(i => {
        if(isNaN(i)) throw new Error("Only numbers allowed")
        else if(!i || i>255 || i<0) throw new Error("Please Check the values")
        else arrRGB.push(i)
      })
    } catch (e) {
      console.log(e.message)
      setWarning({
        ...warning,
        isWarning: true,
        warningText: e.message
      })
    }
    finally{
      setData({
        ...data,
        rValue: "",
        gValue:"",
        bValue: "",
      })
       //hack lazy
       document.querySelectorAll('.rgbf').forEach(i=> i.parentNode.classList.remove('focus'))
    }
    if(arrRGB.length >= 3){
      convertToHEX(arrRGB,R,G,B)
    }
  }  

  // ************ End of Functionality - calculations ****************************
  const handleFormat = (e) => { 
    e.preventDefault();
    if(!isSwitch) handleToRGB()
    else handleToHex()
  }
  

  return {
    isSwitch,
    handleSwitch,
    handleFocus,
    handleBlur,
    data,
    handleChange,
    handleFormat,
    warning,
    closeAlert,
    colorsFormat
  }
}

export default useSwitch