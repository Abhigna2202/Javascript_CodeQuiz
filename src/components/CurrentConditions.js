import React, { Component } from 'react'
import '../styles/CurrentConditions.css';



export default class CurrentConditions extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
      weatherData: [],
      WeatherCondition: 'noweather'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    //http://api.openweathermap.org/data/2.5/weather?q=Sydney,AU&appid=0100ceed70ca2e5c8d4143fee9e743e7
    const API_CALL = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.state.location + '&appid=' + this.props.API_KEY;
    console.log(API_CALL);
    fetch(API_CALL)
    // fetch('http://127.0.0.1:5000/')
      .then(weather => weather.json())
      .then(data => { 
          if (data.weather) {
          var date = new Date(parseInt(data.dt) * 1000);
          var temp = parseInt(data.main.temp)-273;
          var rtemp = parseInt(data.main.feels_like)-273;
          this.setState({
            weatherData: [
              'Location : ' + data.name,
              'Weather Conditions : ' + data.weather.map((wea) => {return wea.main}),
              'Temperature : ' + temp.toString() + ' °C',
              'Real Feel Temperature : ' + rtemp.toString()+ ' °C',
              'Date : ' + date.toUTCString()
            ]
          })
          var Weather = data.weather.map((wea) => {return wea.main}).toString()
          console.log(Weather)
          if(Weather.match(/Clear/gi) !== null ){
              this.setState({WeatherCondition: 'clear'})
          }
          else if(Weather.match(/sunny/gi) !== null){
            this.setState({WeatherCondition: 'sunny'})
          }
          else if(Weather.match(/rain/gi) !== null ){
            this.setState({WeatherCondition: 'rain'})
          }
          else if(Weather.match(/Clouds/gi) !== null){
            this.setState({WeatherCondition: 'clouds'})
          }
          else if(Weather.match(/Drizzle/gi) !== null){
            this.setState({WeatherCondition: 'drizzle'})
          }
          else if(Weather.match(/Thunderstorm/gi) !== null){
            this.setState({WeatherCondition: 'thunderstorm'})
          }
          else if(Weather.match(/Snow/gi) !== null){
            this.setState({WeatherCondition: 'Snow'})
          }
          else{
            this.setState({WeatherCondition: 'atmos'}) //Thiruvananthapuram,IN
          }
          
        }
        else {
          this.setState({ weatherData: ["Enter valid location"] })
        }
          return (
            <div></div>
          )

        // })
      })

  }

  handleChange(event) {
    this.setState({ location: event.target.value });
  }

  render() {
    return (
      <div className={this.state.WeatherCondition}>
        <center>
          <h1>Enter location below to get weather details</h1>
          <input className="InputText" ref="searchInput" type="text" onChange={this.handleChange} />
          <button className="RoundedButton" onClick={this.handleSubmit}>Search</button>

          <table>
            {this.state.weatherData.map((r) => (
              <tr>
                <td className="Cell">{r}</td>
              </tr>
            ))}
          </table>
        </center>
      </div>
    )
  }

};
