import React, { useState, useEffect } from "react";
import classes from "./appear.module.css";
import Select from "./Select";
import axios from "axios";

const Appear = () => {
  const [currentForSelect1, setCurrentForSelect1] = useState();
  const [currentForSelect2, setCurrentForSelect2] = useState();
  const [ratesInOption, setRatesInOption] = useState([]);
  const [baseCurrent, setBaseCurrent] = useState(0);
  const [resultAmount1, setResultAmount1] = useState(1);
  const [resultAmount2, setResultAmount2] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  
  useEffect(() => {
    if (currentForSelect1 != null && currentForSelect2 != null) {
      fetch(
        `https://api.apilayer.com/fixer/latest?apikey=YqhRNvM5o7NJ166b5scPPs1hAjoOcNFL&base=${currentForSelect1}&symbols=${currentForSelect2}`,
      )
      //fetch(`https://www.cbr-xml-daily.ru/latest.js`)
        .then((res) => res.json())
        .then((data) => setBaseCurrent(data.rates[currentForSelect2]));
    }
  }, [currentForSelect1, currentForSelect2]);

  async function getData() {
    const curren = await axios.get("https://www.cbr-xml-daily.ru/latest.js");
    setRatesInOption([curren.data.base, ...Object.keys(curren.data.rates)]);
    setCurrentForSelect1(curren.data.base);
    setCurrentForSelect2(Object.keys(curren.data.rates)[0]);
    setBaseCurrent(curren.data.rates[Object.keys(curren.data.rates)[0]]);
  }

  function handleOnChangeCurrentInput(amount) {
    setResultAmount2((amount * baseCurrent).toFixed(2));
    setResultAmount1(amount);
  }
  function handleOnChangeCurrentInput2(amount) {
    setResultAmount1((amount / baseCurrent).toFixed(2));
    setResultAmount2(amount);
  }

  return (
    <div className={classes.Main}>
      <div className={classes.child}>
        <h1>
          <strong>Конвертер валют</strong>
        </h1>
        <div className={classes.wrapper}>
          <h3 className={classes.s1}>Вы переводите из</h3>

          <div className={classes.s1}>
            <Select
              currentForSelect={currentForSelect1}
              ChangeCurrency={(e) => setCurrentForSelect1(e.target.value)}
              ratesInOption={ratesInOption}
              amount={resultAmount1}
              onChangeCurrentInput={handleOnChangeCurrentInput}
            ></Select>
          </div>
          <div className={classes.s2}>
            <h4>в</h4>
            <h4>=</h4>
          </div>

          <div className={classes.s1}>
            <Select
              currentForSelect={currentForSelect2}
              ratesInOption={ratesInOption}
              ChangeCurrency={(e) => setCurrentForSelect2(e.target.value)}
              amount={resultAmount2}
              onChangeCurrentInput={handleOnChangeCurrentInput2}
            ></Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appear;
