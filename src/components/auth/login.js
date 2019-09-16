import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Row, Col, Form, FormGroup, Label, Input, Button
} from 'reactstrap';

import './auth.css';
import footer from '../global/footer';
import Slide from './slide';
import { login } from '../../action/auth';
import AppSpinner from '../global/spinner';
import ShowError from '../global/handleError';
import Logo from '../global/logo';

const { Footer } = footer;

/**
 * @description Login component
 *
 * @param {object} event  - object
 * @return {void}
 */
class Login extends Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Object).isRequired,
    login: PropTypes.func.isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    email: '',
    password: '',
    isLoading: false,
    getErrors: ''
  };

  componentDidMount() {}

  updateUser = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  /**
   * @description login method
   *
   * @param {object} event  - object
   * @return {void}
   */
  loginUser = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { email, password } = this.state;
    const { login: loggedData } = this.props;
    const userDetail = { email, password };
    await loggedData(userDetail);
    const { auth: { data }, history } = this.props;
    if (data.user) {
      const { user: { permission } } = data;
      this.setState({ getErrors: '', isLoading: false });
      if (permission === 'USER') {
        sessionStorage.setItem('isClient', true);
        history.push('/portal/client/profile');
      } else if (permission === 'ADMIN') {
        sessionStorage.setItem('isAdmin', true);
        history.push('/portal/dashboard');
      } else {
        sessionStorage.setItem('isStaff', true);
        history.push('/portal/dashboard');
      }
    } else {
      this.setState({ getErrors: data.message, isLoading: false });
    }
  };

  render() {
    const {
      email,
      password,
      isLoading,
      getErrors,
    } = this.state;
    const loginLink = (
      <Link className="secondary-btn link" to="/signup">
        Create an account to get started
      </Link>
    );

    return (
      <Row>
        <Col sm="" className="authCol">
          <div className="loginContainer">
            <Logo />
            <Form onSubmit={this.loginUser}>
              <FormGroup className="authForm">
                { getErrors ? <ShowError className="showerror" getErrors={getErrors} /> : ''}
                <Label for="loginEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="loginEmail"
                  placeholder="email"
                  required
                  value={email}
                  onChange={this.updateUser}
                />
              </FormGroup>
              <FormGroup>
                <Label for="loginPassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="loginPassword"
                  placeholder="password"
                  value={password}
                  required
                  onChange={this.updateUser}
                />
              </FormGroup>
              <Button
                block
                outline
                className="primary-btn"
                onSubmit={this.loginUser}
                disabled={isLoading}
              >
                {isLoading && <AppSpinner /> }
                {!isLoading ? 'Login' : ''}
              </Button>
            </Form>
            <div className="link">
              <a href="/">Forgot password</a>
            </div>
            <div className="or">
              <hr className="bar" />
              <span>OR</span>
              <hr className="bar" />
            </div>
            <Link className="secondary-btn link" to="/signup">
              Create an account
            </Link>
          </div>
          <Footer />
        </Col>
        <Col xs="8" className="showcase">
          <Slide loginLink={loginLink} />
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth.items,
});

export default withRouter(connect(mapStateToProps, { login })(Login));
