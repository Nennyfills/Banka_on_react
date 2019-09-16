
/* eslint-disable valid-jsdoc */
import React, { Component } from 'react';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ShowError from '../global/handleError';
import ShowSuccess from '../global/handleSuccess';
import AppSpinner from '../global/spinner';
import { newEmployee } from '../../action/acounts';

/**
 * @description Account component
 *
 * @param {Void}return  - return html
 */
class CreateStaffAdmin extends Component {
  static propTypes = {
    newEmployee: PropTypes.func.isRequired,
  };

  state = {
    isLoading: false,
    getErrors: '',
    userDetails: {
      type: 'STAFF'
    }
  };

  componentDidMount() {}

  updateUser = ({ target }) => {
    const { name, value } = target;

    this.setState(prevState => ({
      ...prevState,
      userDetails: {
        ...prevState.userDetails,
        [name]: value,
      },
    }));
  };

  onFocus = () => {
    this.setState(prevState => ({
      ...prevState,
      getErrors: '',
      success: '',
    }));
  };

  CreateUser = async (event) => {
    event.preventDefault();
    const { userDetails } = this.state;

    if (userDetails.password !== userDetails.confirmPassword) {
      return this.setState({
        isLoading: false,
        getErrors: 'Password and confirm password is not a match ',
      });
    }

    const { newEmployee: loggedData } = this.props;
    const response = await loggedData(userDetails);

    if (response.type === 'NEW_EMPLOYEE_ERROR') {
      this.setState({ getErrors: response.message, isLoading: false });
    }
    this.setState({ success: response.payload.message, isLoading: false });
  };

  render() {
    const {
      getErrors,
      isLoading,
      success,
    } = this.state;

    return (
      <div className="card-account ">
        <div className="card-header"> Create Account</div>
        <div className="innerCard-account">
          <Form onSubmit={this.CreateUser}>
            {getErrors ? (
              <ShowError className="showerror" getErrors={getErrors} />
            ) : (
              ''
            )}
            {success ? (
              <ShowSuccess className="showerror" getSuccess={success} />
            ) : (
              ''
            )}
            <FormGroup>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First Name"
                onChange={this.updateUser}
                onFocus={this.onFocus}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="surname"
                id="surname"
                placeholder="Last Name"
                onChange={this.updateUser}
                onFocus={this.onFocus}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={this.updateUser}
                onFocus={this.onFocus}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="number"
                name="phonenumber"
                id="phonenumber"
                placeholder="Phonenumber"
                onChange={this.updateUser}
                onFocus={this.onFocus}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={this.updateUser}
                onFocus={this.onFocus}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                id="confirmpassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={this.updateUser}
                onFocus={this.onFocus}
              />
            </FormGroup>
            <FormGroup>
              <Label for="accountType">Type</Label>
              <Input
                type="select"
                onChange={this.updateUser}
                onFocus={this.onFocus}
                name="type"
                id="accountType"
              >
                <option disabled>Select</option>
                <option>STAFF</option>
                <option>ADMIN</option>
              </Input>
            </FormGroup>
            <Button block className="secondary-btn" disabled={isLoading}>
              {isLoading && <AppSpinner />}
              {!isLoading ? 'Create Account' : ''}
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  account: state.account.items,
});
export default connect(
  mapStateToProps,
  { newEmployee },
)(CreateStaffAdmin);
