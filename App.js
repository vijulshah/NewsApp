import React from 'react';
import ConfigureStore from './src/redux/ConfigureStore.js';
import { Provider } from 'react-redux';
import NewsApp from './src/NewsApp.js';
import SplashScreen from 'react-native-splash-screen';

const store = ConfigureStore();

class App extends React.Component {
  
  componentDidMount() {  
    setTimeout(()=>{
      SplashScreen.hide();
    },300);
  }

  render(){
    return(
      <Provider store = {store}>
        <NewsApp />
      </Provider>
    );
  }
}

export default App;
