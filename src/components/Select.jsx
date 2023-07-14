import React from "react";
import "./appear.module.css";

const Select = (props) => {
  const options = props.ratesInOption.map((text, index) => {
    return (
      <option key={index+text} value={text}>
        {text}
      </option>
    );
  });

  return (
    <div>
      <select
        value={props.currentForSelect}
        onChange={props.сhangeCurrency}
      >
        {options}
      </select>

      <div >
        <input
          type="number"
          value={props.amount}
          onChange={(e) => props.onChangeCurrentInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Select;
