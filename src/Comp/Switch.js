import '../styles/Switch.css';
import useSwitch from '../utilities/useSwitch';

const Switch = () => {
  const {
    isSwitch,
    handleSwitch,
    handleFocus,
    handleBlur,
    data: {rValue,gValue,bValue, hexVal},
    handleChange,
    handleFormat,
    warning: {isWarning, warningText},
    closeAlert,
    colorsFormat: {hex,R,G,B}
  } = useSwitch()

  return (
    <div className="switch-container">
      <div className="switch-top">
        <h1 className="title">Switch Colors</h1>
        <div className="switch">
          <input type="checkbox" checked={isSwitch} id="checkbox" 
            onChange={handleSwitch}/>
        </div>
      </div>
      {isWarning && (
        <section className="message" onClick={closeAlert}>
          <span>{warningText}</span> <span>X</span>
        </section>
      )}
      <div className="board" style={{backgroundColor: hex}}></div>
      <div className="control">
        <form onSubmit={handleFormat}>
          {isSwitch ? (
            <>
              <div className="form-control">
                <input type="text" id="rValue" name="rValue" 
                    value={rValue}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="control-input rgbf" />
                <h4 id="current_rValue">{`R-${R}`}</h4>
              </div>
              <div className="form-control">
                  <input type="text" id="gValue" name="gValue" 
                     value={gValue}
                     onFocus={handleFocus}
                     onBlur={handleBlur}
                     onChange={handleChange} 
                  className="control-input rgbf" />
                  <h4 id="current_gValue">{`G-${G}`}</h4>
              </div>
              <div className="form-control">
                  <input type="text" id="bValue" name="bValue"
                     value={bValue}
                     onFocus={handleFocus}
                     onBlur={handleBlur}
                     onChange={handleChange} 
                  className="control-input rgbf" />
                  <h4 id="current_bValue">{`B-${B}`}</h4>
              </div>
            </>
          ) : (
            <div className="form-control hexControl">
              <input type="text" id="hexVal" name="hexVal"
                 value={hexVal}
                 onFocus={handleFocus}
                 onBlur={handleBlur}
                 onChange={handleChange} 
              className="control-input hexf" />
              <h4 id="current_hexVal">{hex}</h4>
            </div>
          )}
          <button className="cta" type='submit'>Convert</button>
        </form>
        <div className="results">
          <h3 id="resul">{isSwitch ? hex : (`rgb(${R},${G},${B})`)}</h3>
        </div>
      </div>
    </div>
  )
}

export default Switch