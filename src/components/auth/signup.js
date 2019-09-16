/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import {
  Row, Col, Form, FormGroup, Input, Button
} from 'reactstrap';

import footer from '../global/footer';
import Slide from './slide';
import ShowError from '../global/handleError';
import { signup } from '../../action/auth';
import AppSpinner from '../global/spinner';
import './auth.css';

const { Footer } = footer;

/**
 * @description Signup component
 *
 * @param {object} event  - object
 * @return {void}
 */
class SignUp extends Component {
    static propTypes = {
      auth: PropTypes.instanceOf(Object).isRequired,
      signup: PropTypes.func.isRequired,
      history: PropTypes.instanceOf(Object).isRequired,
    };

    state = {
      isLoading: false,
      getErrors: '',
      email: '',
      firstname: '',
      surname: '',
      password: '',
      phonenumber: '',
      confirmPassword: '',

    };

    componentDidMount() {}

  updateUser = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  signupUser = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const {
      email,
      firstname,
      surname,
      password,
      phonenumber,
      confirmPassword
    } = this.state;
    if (password !== confirmPassword) {
      return this.setState({ isLoading: false, getErrors: 'Password and confirm password is not a match ' });
    }
    const { signup: loggedData, history } = this.props;
    const userDetail = {
      email, firstname, surname, password, phonenumber
    };
    await loggedData(userDetail);
    const { auth: { data } } = this.props;
    if (data.status === 400) {
      return this.setState({ getErrors: data.message, isLoading: false });
    }
    this.setState({ getErrors: '', isLoading: false });
    sessionStorage.setItem('isClient', true);
    history.push('/portal/client/profile');
  };

  render() {
    const {
      email,
      firstname,
      surname,
      password,
      phonenumber,
      confirmPassword,
      getErrors,
      isLoading
    } = this.state;
    const signUpLink = (
      <Link className="secondary-btn link" to="/">
        Already have an account click here to login
      </Link>
    );
    return (
      <Row>
        <Col className="authCol">
          <div className="signupContainer">
            <div className="logo">
              <h1>
                <span>B</span>
                anka
              </h1>
            </div>
            <Form onSubmit={this.signupUser} className="authForm">
              {getErrors ? <ShowError className="showerror" getErrors={getErrors} /> : ''}
              <Row form>
                <Col md={6}>
                  <FormGroup className="">
                    <Input
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      value={firstname}
                      onChange={this.updateUser}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="">
                    <Input
                      type="text"
                      name="surname"
                      placeholder="Surname"
                      value={surname}
                      onChange={this.updateUser}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup className="">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.updateUser}
                />
              </FormGroup>
              <FormGroup className="">
                <Input
                  type="number"
                  name="phonenumber"
                  placeholder="Phone Number"
                  className="phone-number"
                  required
                  value={phonenumber}
                  onChange={this.updateUser}
                />
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.updateUser}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Input
                      type="password"
                      name="confirmPassword"
                      placeholder="confirm Password"
                      value={confirmPassword}
                      onChange={this.updateUser}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button
                block
                outline
                className="primary-btn"
                disabled={isLoading}
              >
                {isLoading && <AppSpinner />}
                {!isLoading ? 'Sign up' : ''}
              </Button>
            </Form>
            <div className="or">
              <hr className="bar" />
              <span>OR</span>
              <hr className="bar" />
            </div>
            <p>already have an account</p>
            <Link className="secondary-btn link" to="/">
              Log in
            </Link>
          </div>
          <Footer />
        </Col>
        <Col xs="8" className="showcase">
          <Slide signUpLink={signUpLink} />
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth.items,
});

export default withRouter(connect(
  mapStateToProps,
  { signup },
)(SignUp));
