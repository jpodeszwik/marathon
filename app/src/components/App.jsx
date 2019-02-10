import React, { Component } from 'react';
import { Container, Alert } from 'reactstrap';
import { FadeLoader } from 'react-spinners';
import './App.css';
import AppHeader from './AppHeader.jsx';
import UserInfo from './UserInfo.jsx';
import { checkPermissionToRegisterFights, onUserChange } from '../services/firebase';
import AppView from './AppView.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.round = new Date();
    this.state = {
      user: null,
      hasPermissionToRegisterFights: false,
      alerts: [],
      loading: false,
    };

    this.displayAlert = this.displayAlert.bind(this);
    onUserChange(user => {
      this.setState({ user, hasPermissionToRegisterFights: false });
      if (user !== null) {
        this.setState({ loading: true });
        checkPermissionToRegisterFights(user)
          .then(hasPermissionToRegisterFights => {
            this.setState({ hasPermissionToRegisterFights });
          })
          .finally(() => {
            this.setState({ loading: false });
          });
      }
    });
  }

  displayAlert(alert) {
    this.setState(prevState => {
      const newAlerts = prevState.alerts.slice();
      newAlerts.unshift(alert);
      return {
        alerts: newAlerts,
      };
    });

    setTimeout(
      () =>
        this.setState(prevState => {
          const newAlerts = prevState.alerts.slice();
          newAlerts.splice(0, 1);
          return {
            alerts: newAlerts,
          };
        }),
      3000,
    );
  }

  render() {
    return (
      <div className="App">
        <Container>
          <AppHeader />
          {this.state.alerts.map((alert, key) => (
            <Alert key={key} color="danger">
              {alert}
            </Alert>
          ))}
          <UserInfo user={this.state.user} />
          <div style={{ width: '50px', margin: 'auto' }}>
            <FadeLoader loading={this.state.loading} />
          </div>

          {this.state.user && this.state.hasPermissionToRegisterFights && <AppView displayAlert={this.displayAlert} />}
          {this.state.user && !this.state.hasPermissionToRegisterFights && !this.state.loading && (
            <span style={{ color: 'red' }}>Brak uprawnień. Skontaktuj się z administratorem.</span>
          )}
        </Container>
      </div>
    );
  }
}

export default App;
