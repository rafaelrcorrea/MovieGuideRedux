import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { Provider } from 'react-redux';
import Routes from './pages/routes';

import store from './store';
export let navigatorRef;

class App extends Component {

  constructor(props) {
    super(props);

  }
  componentDidMount() {
    navigatorRef = this.navigatorRef;
  }
  render() {
    return (
      <Provider store={store}>
        <Routes ref={nav => { this.navigatorRef = nav; }}/>
      </Provider>
    );
  }
}

export default App;
