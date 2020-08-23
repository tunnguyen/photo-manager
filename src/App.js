import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import PhotosContainer from './components/PhotosContainer';
import './App.scss';

function App() {
  return (
    <Provider store={ store }>
      <PhotosContainer/>
    </Provider>
  );
}

export default App;
