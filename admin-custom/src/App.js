import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import CPT from './components/CPT';

class App extends Component {
  render() {
    const routes = (
      <Switch>
        <Route path='/wp-admin/admin.php' render={(props) => (
          <CPT location={this.props.location}/>
        )}/>
      </Switch>
    );
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
