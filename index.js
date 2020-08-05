/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { UserProvider } from './GlogalContext';
// import { Provider } from 'react-redux';

// import configureStore from './src/actions/store';

export const MyContext= React.createContext(
    {
        id: 'yes'
    }
  )

// const store = configureStore();

const ReduxTutorial = () => 
    <UserProvider>
        <App/>
    </UserProvider>


AppRegistry.registerComponent(appName, () => ReduxTutorial);
