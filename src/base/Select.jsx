import React from "react";
import classes from "./appear.module.css";

const Select = (props) => {
  const options = props.ratesInOption.map((text, index) => {
    return (
      <option key={index} value={text}>
        {text}
      </option>
    );
  });

  return (
    <div>
      <select
        className={classes.Sel1}
        value={props.currentForSelect}
        onChange={props.ChangeCurrency}
      >
        {options}
      </select>

      <div className={classes.f_select_money}>
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
