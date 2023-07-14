import React, { useState, useEffect } from "react";
import classes from "./appear.module.css";
import Select from "./Select";
import axios from "axios";

const apikey="YqhRNvM5o7NJ166b5scPPs1hAjoOcNFL"

const Appear = () => {
  const [currencyFirstSelect, setCurrencyFirstSelect] = useState();
  const [currencySecondSelect, setCurrencySecondSelect] = useState();
  const [ratesInOption, setRatesInOption] = useState([]);
  const [baseOfCurrent, setBaseOfCurrent] = useState(0);
  const [resultFirstAmount, setResultFirstAmount] = useState(1);
  const [resultSecondAmount, setResultSecondAmount] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() =>  {
    if (currencyFirstSelect !== null && currencySecondSelect !== null) {
    setData();
    }
   },  [currencyFirstSelect, currencySecondSelect])

   async function setData() {
      const changingBaseCurrency = await axios.get(`https://api.apilayer.com/fixer/latest?apikey=${apikey}&base=${currencyFirstSelect}&symbols=${currencySecondSelect}`)
      setBaseOfCurrent(changingBaseCurrency.data.rates[currencySecondSelect])
  }
  async function getData() {
    const ListOfCurrencies = await axios.get(`https://api.apilayer.com/fixer/latest?apikey=${apikey}`);
    setRatesInOption([ListOfCurrencies.data.base, ...Object.keys(ListOfCurrencies.data.rates)]);
    setCurrencyFirstSelect(ListOfCurrencies.data.base);
    setCurrencySecondSelect(Object.keys(ListOfCurrencies.data.rates)[0]);
    setBaseOfCurrent(ListOfCurrencies.data.rates[Object.keys(ListOfCurrencies.data.rates)[0]]);
  }

  function handleOnChangeCurrentInput(amount) {
    setResultSecondAmount((amount * baseOfCurrent).toFixed(2));
    setResultFirstAmount(amount);
  }
  function handleOnChangeCurrentInput2(amount) {
    setResultFirstAmount((amount / baseOfCurrent).toFixed(2));
    setResultSecondAmount(amount);
  }

  return (
    <div className={classes.main}>
      <div className={classes.child}>
        <h1>
         <strong>Конвертер валют</strong> 
        </h1>
        <div className={classes.wrapper}>
          <p className={classes.text}>Вы переводите из</p>

          <div className={classes.column}>
            <Select
              currentForSelect={currencyFirstSelect}
              сhangeCurrency={(e) => setCurrencyFirstSelect(e.target.value)}
              ratesInOption={ratesInOption}
              amount={resultFirstAmount}
              onChangeCurrentInput={handleOnChangeCurrentInput}
            ></Select>
          </div>
          <div className={classes.column}>
            <p>в</p>
            <p>=</p>
          </div>

          <div className={classes.column}>
            <Select
              currentForSelect={currencySecondSelect}
              ratesInOption={ratesInOption}
              сhangeCurrency={(e) => setCurrencySecondSelect(e.target.value)}
              amount={resultSecondAmount}
              onChangeCurrentInput={handleOnChangeCurrentInput2}
            ></Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appear;
