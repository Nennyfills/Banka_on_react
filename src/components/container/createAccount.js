/* eslint-disable valid-jsdoc */
import React, { Component } from 'react';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppSpinner from '../global/spinner';
import { createBankAccount } from '../../action/acounts';

/**
 * @description Account component
 *
 * @returns {Void}return  - return html
 * @event {Event} event  - listens to an event;
 */
class CreateAccount extends Component {
  static propTypes = {
    createBankAccount: PropTypes.func.isRequired,
  };

  state = {
    userDetails: {
      openingbalance: '',
      type: 'savings',
    },
    getErrors: '',
    isLoading: false,
    success: '',
  };

  handleOnChange = ({ target }) => {
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

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { userDetails } = this.state;
    const { createBankAccount: createAccount } = this.props;
    const responses = await createAccount(userDetails);

    if (responses.type === 'CREATE_BANK_ACCOUNT_ERROR') {
      this.setState({ getErrors: responses.message, isLoading: false });
    }
    this.setState({ success: responses.payload, isLoading: false });
  };

  render() {
    const { isLoading, getErrors, success } = this.state;
    return (
      <div className="card-account">
        <div className="card-header"> Create Account</div>
        <div className="innerCard-account">
          <Form onSubmit={this.handleSubmit}>
            {getErrors || success ? (
              <span className="badRequest">{getErrors || success}</span>
            ) : (
              ''
            )}
            <FormGroup>
              <Input
                onChange={this.handleOnChange}
                onFocus={this.onFocus}
                type="number"
                name="openingbalance"
                id="openingBalance"
                placeholder="Opening Balance"
              />
            </FormGroup>
            <FormGroup>
              <Label for="accountType">Type of account</Label>
              <Input
                onChange={this.handleOnChange}
                onFocus={this.onFocus}
                type="select"
                name="type"
                id="accountType"
              >
                <option disabled>Select</option>
                <option>savings</option>
                <option>current</option>
              </Input>
            </FormGroup>
            <Button block className="secondary-btn">
              {isLoading && <AppSpinner />}
              {!isLoading ? 'Submit' : ''}
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
  { createBankAccount },
)(CreateAccount);
