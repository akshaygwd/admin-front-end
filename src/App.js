import './App.css';
import { Route, Switch }  from 'react-router-dom';
import Layout from './components/Layout';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUSerLOggedIn } from './actions';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import { getInitialData } from './actions';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state =>  state.auth);

  useEffect(() => {
    dispatch(getInitialData());
    if(!auth.authenticate) {
      dispatch(isUSerLOggedIn())
    }

  }, [])

  return (
    <div className="App">
      <Switch>
        <Route path="/signin" component={Signin}/>
        <Route path="/signup" component={Signup}/>
        <PrivateRoute path="/products" exact component={Products}/>
        <PrivateRoute path="/category" exact component={Category}/>
        <PrivateRoute path="/orders" exact component={Orders}/>
        <PrivateRoute path="/" exact component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
