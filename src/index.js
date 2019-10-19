import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Game from './containers/app';
import * as serviceWorker from './serviceWorker';
import rootReducers from './reducers/rootReducers';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './css/index.css';
  

// Initial state of store
const initialState = {}

// Create store
const store = createStore(rootReducers, initialState);

const appRoot = (
    <Router>
        <div>
            <Switch>
                <Route path="/login">
                    <Provider store={store}>
                        <></>
                    </Provider>
                </Route>
                <Route path="/register">
                    <Provider store={store}>
                        <></>
                    </Provider>
                </Route>
                <Route path="/">
                    <Provider store={store}>
                        <Game />
                    </Provider>
                </Route>
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(appRoot, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
