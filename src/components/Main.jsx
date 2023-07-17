import React, { useState, useEffect } from "react";
import classes from "./appear.module.css";
import Select from "./Select";
import axios from "axios";



const Main = () => {
  const [currencyFirstSelect, setCurrencyFirstSelect] = useState();
  const [currencySecondSelect, setCurrencySecondSelect] = useState();
  const [ratesInOption, setRatesInOption] = useState([]);
  const [baseOfCurrentCurrency, setBaseOfCurrentCurrency] = useState(0);
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
      const changingBaseCurrency = await axios.get(`https://api.apilayer.com/fixer/latest?apikey=${process.env.REACT_APP_API_KEY}&base=${currencyFirstSelect}&symbols=${currencySecondSelect}`)
      setBaseOfCurrentCurrency(changingBaseCurrency.data.rates[currencySecondSelect])
  }
  async function getData() {
    const listOfCurrencies = await axios.get(`https://api.apilayer.com/fixer/latest?apikey=${process.env.REACT_APP_API_KEY}`);
    const baseInCurrencyFile= listOfCurrencies.data.base 
    const listOfRates = Object.keys(listOfCurrencies.data.rates)
    setRatesInOption([baseInCurrencyFile, ...listOfRates]);
    setCurrencyFirstSelect(baseInCurrencyFile);
    setCurrencySecondSelect(listOfRates[0]);
    setBaseOfCurrentCurrency(listOfCurrencies.data.rates[listOfRates[0]]);
  }

  function handleOnChangeCurrentInput(amount) {
    setResultSecondAmount((amount * baseOfCurrentCurrency).toFixed(2));
    setResultFirstAmount(amount);
  }
  function handleOnChangeCurrentInput2(amount) {
    setResultFirstAmount((amount / baseOfCurrentCurrency).toFixed(2));
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
            />
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
