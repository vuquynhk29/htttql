import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';
import useAccount from './useAccount';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const removeAccount = () => {
  const account = localStorage.getItem("account")
  if (account && account != "") {
    localStorage.removeItem("account")
  }
  return null
}

const getAccount = () => {
  const account = localStorage.getItem("account")
  if (account && account != "") {
    return account
  }
  return null
}

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/logout" name="Lgout" render={props => removeAccount() ? (<Redirect to={{ pathname: "/login" }} />) : (<Redirect to={{ pathname: "/login" }} />)} />
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => getAccount()? (<TheLayout {...props}/>):(<Redirect to={{ pathname: "/login" }} />)} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
