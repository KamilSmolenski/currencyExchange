import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/App.css";

class App extends Component {
  state = {
    fromCurrency: "PLN",
    toCurrency: "EUR",
    fromValue: "",
    toValue: "",
    date: "",
    rate: ""
  };

  /// Get current rate from coinapi.io
  getRate = e => {
    fetch(
      `https://api.ratesapi.io/api/latest?base=${this.state.fromCurrency}&symbols=${this.state.toCurrency}`
    )
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .then(response => response.json())
      .then(data => {
        this.setState({ date: data.date });
        let dataString = JSON.stringify(data.rates);
        let dataNumber = dataString.slice(7, 12);
        console.log(dataNumber);
        this.setState({
          rate: Math.floor(dataNumber * 100) / 100
        });
      })
      .catch(error => console.log(error));
  };

  /// HandleChange Input functions:
  hadleChangeFromValue = e => {
    this.setState({ fromValue: e.target.value, toValue: 0 });
  };
  hadleChangeFromCurrency = e => {
    this.setState({ fromCurrency: e.target.value, toValue: 0 });
  };

  hadleChangeToCurrency = e => {
    this.setState({ toCurrency: e.target.value, toValue: 0 });
  };
  /// Switch Currency function
  switchCurrency = e => {
    e.preventDefault();
    let temp = this.state.fromCurrency;
    this.setState({
      fromCurrency: this.state.toCurrency,
      toCurrency: temp,
      toValue: 0
    });
  };

  /// Count amount function

  handleCount = e => {
    this.getRate();
    let countedAmount = this.state.fromValue * this.state.rate;
    this.setState({ toValue: Math.floor(countedAmount * 100) / 100 });
    e.preventDefault();
  };
  componentDidMount() {
    this.getRate();
  }

  render() {
    return (
      <>
        <div
          className="d-flex   justify-content-center align-items-center "
          style={{ height: "100vh" }}
        >
          <form
            className={
              "d-flex   justify-content-center  col-12 col-sm-8 col-lg-4 col-md-6 align-items-center flex-wrap "
            }
            style={{ height: "60vh" }}
          >
            <h2 className="text-center">Przelicznik Walut </h2>
            <div className="d-flex col-12 justify-content-center">
              <input
                className="form-control  text-center col-6   "
                type="number"
                min="0.1"
                step="0.1"
                name="from"
                id="1"
                value={this.state.fromValue}
                onChange={this.hadleChangeFromValue}
                placeholder="Wpisz kwotę"
              />
            </div>
            <div className="d-flex col-10 justify-content-around">
              <select
                className="  form-control col-4  "
                name="from"
                required
                value={this.state.fromCurrency}
                onChange={this.hadleChangeFromCurrency}
              >
                <option value="EUR">EUR €</option>
                <option value="USD">USD $</option>
                <option value="PLN">PLN (zł)</option>
                <option value="GBP">GBP £ </option>
                <option value="UAH">UAH ₴ </option>
                <option value="RUB">RUB ₽ </option>
                <option value="CHF">CHF (CHF) </option>
                <option value="NOK">NOK (kr) </option>
                <option value="TRY">TRY (₺) </option>
                <option value="SEK">SEK (kr) </option>
                <option value="RON">RON (lei) </option>
                <option value="HUF">HUF (ft) </option>
                <option value="HRK">HRK (kn) </option>
                <option value="DKK">DKK (kr) </option>
                <option value="CZK">CZK (kr) </option>
                <option value="GEL">GEL ₾ </option>
              </select>

              <button
                onClick={this.switchCurrency}
                className=" btn btn-warning btn-sm col-2 "
              >
                <i class="fas fa-sync"></i>
              </button>
              <select
                className="form-control col-4"
                name="to"
                required
                value={this.state.toCurrency}
                onChange={this.hadleChangeToCurrency}
              >
                <option value="EUR">EUR €</option>
                <option value="USD">USD $</option>
                <option value="PLN">PLN (zł)</option>
                <option value="GBP">GBP £ </option>
                <option value="UAH">UAH ₴ </option>
                <option value="RUB">RUB ₽ </option>
                <option value="CHF">CHF (CHF) </option>
                <option value="NOK">NOK (kr) </option>
                <option value="TRY">TRY (₺) </option>
                <option value="SEK">SEK (kr) </option>
                <option value="RON">RON (lei) </option>
                <option value="HUF">HUF (ft) </option>
                <option value="HRK">HRK (kn) </option>
                <option value="DKK">DKK (kr) </option>
                <option value="CZK">CZK (kr) </option>
                <option value="GEL">GEL ₾ </option>
              </select>
            </div>
            <div className="d-flex col-12 justify-content-center">
              <button
                onClick={this.handleCount}
                className=" btn btn-success col-6 "
              >
                Przelicz
              </button>
            </div>
            {this.state.toValue > 0 && (
              <h3 className="display-4 text-center">
                <strong>
                  {this.state.toValue} {this.state.toCurrency}
                </strong>
                <h6
                  className="text-center display-5 col-12"
                  style={{ color: "grey" }}
                >
                  {" "}
                  <h6
                    className="text-center display-6 col-12"
                    style={{ color: "grey" }}
                  >
                    <em className="text-center">
                      {" "}
                      1{this.state.fromCurrency} = {this.state.rate}
                      {this.state.toCurrency}{" "}
                    </em>
                  </h6>
                  <em>
                    Aktualne kursy walut pobierane są automatycznie z serwisu
                    ratesapi.io (Ostatnia aktualizacja:{this.state.date})
                  </em>
                </h6>
              </h3>
            )}
          </form>
        </div>
      </>
    );
  }
}

export default App;
