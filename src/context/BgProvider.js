import { createContext, useEffect, useReducer } from "react";

const initialState = {
  hex: '#222',
    R:"34",
    G:"34",
    B:"34"
}

export const BgContext = createContext()
// it is not neccesary to createContext(initialState)

const BgReducer = (state, action) => { 
  switch (action.type) {
    case "UPDATE_BG":
      return {
        ...state,
        hex: action.payload.hex,
        R: action.payload.R,
        G: action.payload.G,
        B: action.payload.B,
      }
    default:
      return state
  }
 }

export const BgProvider = ({children}) => { 
  const [colorsFormat, dispatch] = useReducer(BgReducer, initialState, () => {
    let LS_Colors = localStorage.getItem('currColor')
    return LS_Colors ? JSON.parse(LS_Colors) : initialState
  })

  useEffect(() => {
      //console.log(JSON.stringify(colorsFormat))    
      localStorage.setItem('currColor', JSON.stringify(colorsFormat))
  }, [colorsFormat])
  

  return(
    <BgContext.Provider value={{colorsFormat,dispatch}}>
      {children}
    </BgContext.Provider>
  )
}