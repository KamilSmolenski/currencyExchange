import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const APIkey = '77CD12D8-2B91-464B-98EC-24650211B2BD'
const APIkey2 = '22320EA1-A351-4176-B63A-851C357DAF4A'
const APIkey3 = '790BF43E-9023-4C0A-BA93-4ABCA7521BC6'
const APIkey4 = '36A9B6A1-489E-4ED7-99FF-F9D72772CCFE'

class App extends Component {
  state = {
    fromCurrency: 'EUR',
    toCurrency: 'PLN',
    fromValue: '',
    toValue: 0,
    data: [],
    rate: 4
  }
  /// Get current rate from coinapi.io
  getRate = () => {
    fetch(
      `https://rest.coinapi.io/v1/exchangerate/${this.state.fromCurrency}/${this.state.toCurrency}?apikey=${APIkey}`
    )
      .then(response => {
        if (response.ok) {
          return response
        }
        throw Error(response.status)
      })
      .then(response => response.json())
      .then(data => {
        this.setState({ rate: Math.floor(data.rate * 100) / 100 })
      })
  }

  /// HandleChange Input functions:
  hadleChangeFromValue = e => {
    this.setState({ fromValue: e.target.value })
    e.preventDefault()
  }
  hadleChangeFromCurrency = e => {
    this.setState({ fromCurrency: e.target.value })
    e.preventDefault()
  }

  hadleChangeToCurrency = e => {
    this.setState({ toCurrency: e.target.value })
    e.preventDefault()
  }
  /// Switch Currency function
  switchCurrency = e => {
    e.preventDefault()

    let temp = this.state.fromCurrency
    this.setState({
      fromCurrency: this.state.toCurrency,
      toCurrency: temp
    })
    this.handleCount()
  }

  /// Count amount function

  handleCount = () => {
    // this.getRate();
    let countedAmount = this.state.fromValue * this.state.rate
    this.setState({ toValue: Math.floor(countedAmount * 100) / 100 })
  }
  // componentDidMount() {
  //   this.handleCount();
  // }

  render () {
    return (
      <div
        className='d-flex  justify-content-center align-items-center'
        style={{ height: '100vh' }}
      >
        <form className='d-flex  flex-column col-8 align-items-center '>
          <input
            className='form-control col-10 text-center '
            type='number'
            min='0.1'
            step='0.1'
            name='from'
            id='1'
            value={this.state.fromValue}
            onChange={this.hadleChangeFromValue}
            placeholder='Wpisz kwotę'
          />

          <label htmlFor='FROM'>
            <select
              className='  form-control col-10 flex-shrink-1'
              name='from'
              required
              value={this.state.fromCurrency}
              onChange={this.hadleChangeFromCurrency}
            >
              <option value='EUR'>EUR €</option>
              <option value='USD'>USD $</option>
              <option value='PLN'>PLN (zł)</option>
              <option value='GBP'>GBP £ </option>
              <option value='UAH'>UAH ₴ </option>
              <option value='RUB'>RUB ₽ </option>
              <option value='CHF'>CHF (CHF) </option>
              <option value='NOK'>NOK (kr) </option>
              <option value='TRY'>TRY (₺) </option>
              <option value='SEK'>SEK (kr) </option>
              <option value='RON'>RON (lei) </option>
              <option value='HUF'>HUF (ft) </option>
              <option value='HRK'>HRK (kn) </option>
              <option value='DKK'>DKK (kr) </option>
              <option value='CZK'>CZK (kr) </option>
              <option value='GEL'>GEL ₾ </option>
            </select>
          </label>
          <button
            onClick={this.switchCurrency}
            className=' btn btn-warning btn-sm col-2 '
          >
            Z
          </button>
          <label htmlFor='TO'>
            <select
              className='form-control col-10'
              name='to'
              required
              value={this.state.toCurrency}
              onChange={this.hadleChangeToCurrency}
            >
              <option value='EUR'>EUR €</option>
              <option value='USD'>USD $</option>
              <option value='PLN'>PLN (zł)</option>
              <option value='GBP'>GBP £ </option>
              <option value='UAH'>UAH ₴ </option>
              <option value='RUB'>RUB ₽ </option>
              <option value='CHF'>CHF (CHF) </option>
              <option value='NOK'>NOK (kr) </option>
              <option value='TRY'>TRY (₺) </option>
              <option value='SEK'>SEK (kr) </option>
              <option value='RON'>RON (lei) </option>
              <option value='HUF'>HUF (ft) </option>
              <option value='HRK'>HRK (kn) </option>
              <option value='DKK'>DKK (kr) </option>
              <option value='CZK'>CZK (kr) </option>
              <option value='GEL'>GEL ₾ </option>
            </select>
          </label>

          <button
            onClick={this.handleCount}
            className=' btn btn-success col-8 '
          >
            Przelicz
          </button>
          {this.state.toValue > 0 && (
            <h3>
              {this.state.toValue} {this.state.toCurrency}
            </h3>
          )}
        </form>
      </div>
    )
  }
}

export default App
