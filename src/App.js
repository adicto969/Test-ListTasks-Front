import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import LayoutApp from './layout/layout';
import store from './store';

class App extends React.Component {
  render()  {
    return <Provider store={store}>
      <LayoutApp></LayoutApp>
    </Provider>;
  };
}

export default App;
