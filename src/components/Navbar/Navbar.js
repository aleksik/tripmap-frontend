import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import { login, logout } from '../../actions/user';
import Button from '../../components/Button';
import Icon, { ICONS } from '../../components/Icon';
import './Navbar.css';

export class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLoginForm: false
    }
  }

  onLoginInputKeyDown(e) {
    if (e && e.key === 'Enter') {
      const credentials = {
        username: this.usernameInput.value,
        password: this.passwordInput.value
      };
      this.props.login(credentials);
    }
  }

  toggleLoginForm(e) {
    e.preventDefault();
    !this.state.showLoginForm && this.usernameInput.focus();
    this.setState({
      showLoginForm: this.state.showLoginForm ? false : true
    });
  }

  render() {

    const { isAuthenticated, message } = this.props;

    return (
      <div className="Navbar">

        {isAuthenticated && (
          <Button onClick={this.props.onAddButtonClick}>
            <Icon icon={ICONS.ADD_PLACE} />
          </Button>
        )}

        {isAuthenticated && (
          <Button onClick={e => { e.preventDefault(); this.props.logout(); }}>
            Log out
          </Button>
        )}

        {!isAuthenticated && (
          <Button onClick={this.toggleLoginForm.bind(this)}>
            Log in
          </Button>
        )}

        {!isAuthenticated && (
          <form className={classNames('Navbar-LoginForm', { 'open': this.state.showLoginForm })}>
            <input
              type="text"
              name="username" 
              id="username" 
              placeholder="Username" 
              onKeyDown={this.onLoginInputKeyDown.bind(this)}
              ref={ref => { this.usernameInput = ref; }}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onKeyDown={this.onLoginInputKeyDown.bind(this)}
              ref={ref => { this.passwordInput = ref; }}
            />
            {message && (
              <div className="Navbar-LoginForm-Error">
                {message}
              </div>
            )}
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.user.isFetching,
    isAuthenticated: state.user.isAuthenticated,
    message: state.user.message,
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  login: credentials => login(credentials),
  logout,
  onAddButtonClick: _ => push('/add')
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);