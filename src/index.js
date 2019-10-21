import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import rootReducers from './reducers/rootReducers';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Game from './containers/homepage';
import Login from './containers/login';
import Register from './containers/register';
import './css/index.css';

// Create store
const store = createStore(
    rootReducers,
    applyMiddleware(
        thunkMiddleware
    )
);

const appRoot = (
    <Router>
        <div>
            <Switch>
                <Route path='/login'>
                    <Provider store={store}>
                        <Login />
                    </Provider>
                </Route>
                <Route path='/register'>
                    <Provider store={store}>
                        <Register />
                    </Provider>
                </Route>
                <Route path='/'>
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
