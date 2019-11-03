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
import Homepage from './containers/homepage';
import Login from './containers/login';
import Register from './containers/register';
import Info from './containers/info';
import './css/index.css';

// Function save state
function saveToLocalStorage(state) {
    try {
        if (state.roomReducers.roomInfo) {
            localStorage.setItem('state', JSON.stringify(state));
        }
        else {
            localStorage.setItem('state', null);
        }
    } catch (err) {
        console.log('Error when call function saveToLocalStorage()', err);
    }
}

// Function load state
function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state');
        if (!serializedState || serializedState === 'null') return undefined;
        return JSON.parse(serializedState);
    } catch (err) {
        console.log('Error when call function loadFromLocalStorage()', err);
        return undefined;
    }
}

const persistedState = loadFromLocalStorage();

// Create store
const store = createStore(
    rootReducers,
    persistedState,
    applyMiddleware(
        thunkMiddleware
    )
);
store.subscribe(() => saveToLocalStorage(store.getState()));

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
                <Route path='/changeinfo'>
                    <Provider store={store}>
                        <Info />
                    </Provider>
                </Route>
                <Route path='/'>
                    <Provider store={store}>
                        <Homepage />
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