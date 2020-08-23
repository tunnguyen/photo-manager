import React, { useState } from 'react';

const Selector = ({ options = [], selectedValue, label = 'Select', onChange }) => {
  const [optionsDisplayed, setOptionsDisplayed] = useState(false);
  const [selectedVal, setSelectedVal] = useState(selectedValue);

  const onUpdate = option => {
    setSelectedVal(option);
    onChange(option);
    setOptionsDisplayed(false);
  }

  return (
    <div className="selector">
      <span 
        className="selector__current" 
        onClick={ () => setOptionsDisplayed(!optionsDisplayed) }
      >{ selectedVal || label }</span>
      <div className={ `selector__options ${ optionsDisplayed && 'displayed' }` }>
        {options.map((op, idx) =>
          <button 
            className="btn" 
            key={ idx } 
            onClick={ () => onUpdate(op) }
          >{ op }</button>
        )}
      </div>
    </div>
  )
}

export default Selector;