import React, { useState, useEffect } from "react";
import classes from "./appear.module.css";
import Select from "./Select";
import axios from "axios";

const URL = "https://api.apilayer.com/fixer/latest?";

const Main = () => {
  const [fromCurrencySelect, setFromCurrencySelect] = useState();
  const [toCurrencySelect, setToCurrencySecondSelect] = useState();
  const [ratesInOption, setRatesInOption] = useState([]);
  const [baseOfCurrentCurrency, setBaseOfCurrentCurrency] = useState(0);
  const [resultFirstAmount, setResultFirstAmount] = useState(1);
  const [resultSecondAmount, setResultSecondAmount] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (fromCurrencySelect !== null && toCurrencySelect !== null) {
      setData();
    }
  }, [fromCurrencySelect, toCurrencySelect]);

  async function setData() {
    try {
      const changingBaseCurrency = await axios.get(
        `${URL}apikey=${process.env.REACT_APP_API_KEY}&base=${fromCurrencySelect}&symbols=${toCurrencySelect}`
      );
      setBaseOfCurrentCurrency(
        changingBaseCurrency.data.rates[toCurrencySelect]
      );
    } catch (error) {
      console.log(error.name);
    }
  }

  async function getData() {
    try {
      const listOfCurrencies = await axios.get(
        `${URL}apikey=${process.env.REACT_APP_API_KEY}`
      );
      const baseInCurrencyFile = listOfCurrencies.data.base;
      const listOfRates = Object.keys(listOfCurrencies.data.rates);
      setRatesInOption([baseInCurrencyFile, ...listOfRates]);
      setFromCurrencySelect(baseInCurrencyFile);
      setToCurrencySecondSelect(listOfRates[0]);
      setBaseOfCurrentCurrency(listOfCurrencies.data.rates[listOfRates[0]]);
    } catch (error) {
      console.log(error.name);
    }
  }

  function handleOnChangeCurrencyFrom(amount) {
    setResultSecondAmount((amount * baseOfCurrentCurrency).toFixed(2));
    setResultFirstAmount(amount);
  }

  function handleOnChangeCurrencyTo(amount) {
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
              currentForSelect={fromCurrencySelect}
              сhangeCurrency={(e) => setFromCurrencySelect(e.target.value)}
              ratesInOption={ratesInOption}
              amount={resultFirstAmount}
              onChangeCurrencyInput={handleOnChangeCurrencyFrom}
            />
          </div>
          <div className={classes.column}>
            <p>в</p>
            <p>=</p>
          </div>
          <div className={classes.column}>
            <Select
              currentForSelect={toCurrencySelect}
              ratesInOption={ratesInOption}
              сhangeCurrency={(e) => setToCurrencySecondSelect(e.target.value)}
              amount={resultSecondAmount}
              onChangeCurrencyInput={handleOnChangeCurrencyTo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
