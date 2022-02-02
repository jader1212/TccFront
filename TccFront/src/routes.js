import React from 'react';

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import ListContaComponent from './components/ListContaComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateContaComponent from './components/CreateContaComponent';
import HomeComponent from './components/HomeComponent';
import RelatorioComponent from './components/RelatorioComponent';
import ViewContaComponent from './components/ViewContaComponent';
import LoginComponent from './components/LoginComponent';
import LoginAddComponent from './components/LoginAddComponent';
// import UpdateContaComponent from './components/UpdateContaComponent';

import { isAuthenticated } from './services/auth';

// this.state = {
//   count: ''
// };

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route 
    {...rest} 
    render={props => //console.log('->', props)
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    } 
  />
);

// console.log('isAuthenticated() = ', isAuthenticated());

const Routes = () => (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path="/" exact component={LoginComponent} />
                          <Route path="/login-add" exact component={LoginAddComponent} />
                          <PrivateRoute path="/contas" component={ListContaComponent} />
                          <PrivateRoute path="/add-conta/:id" component={CreateContaComponent} />
                          <PrivateRoute path="/view-conta/:id" component={ViewContaComponent} />
                          <PrivateRoute path="/show-home" component={HomeComponent} />
                          <PrivateRoute path="/show-relatorio" component={RelatorioComponent} />
                          <PrivateRoute path="/app" component={() => <h1>Você está logado</h1>} />
                          {/* <PrivateRoute path = "/update-conta/:id" component = {UpdateContaComponent} /> */}
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
);

export default Routes;