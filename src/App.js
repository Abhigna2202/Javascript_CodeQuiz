import React, {Component} from 'react';
import CurrentConditions from './components/CurrentConditions';

const API_KEY = "0100ceed70ca2e5c8d4143fee9e743e7"
class App extends Component {

  render() {
    return (
      <div>
      <CurrentConditions API_KEY={API_KEY}/>
      </div>
    )
  }
}

export default App;
