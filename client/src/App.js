import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ApolloProvider } from 'react-apollo';

import { Route, Switch } from 'react-router';

import { HashRouter } from 'react-router-dom';
import { gqlClient } from './Utils/Graphql';
import AppReducer from './AppReducer';
import Login from './Login/Login';
import Main from './Main/Main';
import './App.css';

let store = createStore(
  AppReducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

window.location.hash = '#/login';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={gqlClient}>
          <HashRouter>
            <div className="App">
              <Switch>
                <Route exact path="/login" component={Login}/>
                <Route path="/" component={Main}/>
              </Switch>
            </div>
          </HashRouter>
        </ApolloProvider>
      </Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
