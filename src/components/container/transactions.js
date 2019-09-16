
/* eslint-disable valid-jsdoc */
import React, { Component } from 'react';
import {
  Button, Form, FormGroup, Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  creditAccount,
  debitAccount,
} from '../../action/acounts';
import ShowError from '../global/handleError';
import AppSpinner from '../global/spinner';
import ShowSuccess from '../global/handleSuccess';

/**
 * @description Credit and debit component
 *
 * @param {Void}return  - return html
 */
class CreditAndDebit extends Component {
  static propTypes = {
    creditAccount: PropTypes.func.isRequired,
    debitAccount: PropTypes.func.isRequired,
  };

  state = {
    debit: false,
    credit: true,
    isLoading: false,
    getErrors: '',
    success: '',
    accountnumber: '',
    amount: '',
    depositor: '',
  };

  toggleDebit = () => {
    this.setState(previousState => ({
      debit: !previousState.debit,
      credit: false,
    }));
  };

  toggleCredit = () => {
    this.setState(previousState => ({
      credit: !previousState.credit,
      debit: false,
    }));
  };

  onFocus = () => {
    this.setState(prevState => ({
      ...prevState,
      getErrors: '',
      success: '',
    }));
  };

  handleDebitOnChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleCreditOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  creditUser = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });

    const { accountnumber, amount, depositor } = this.state;
    const payLoad = { depositor, amount };
    const { creditAccount: creditUser } = this.props;
    const responses = await creditUser(payLoad, accountnumber);

    if (responses.type === 'CREDIT_ERROR') {
      this.setState({ getErrors: responses.message, isLoading: false });
    }
    this.setState({ success: responses.payload.message, isLoading: false });
  };

  debitUser = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const {
      accountnumber, amount
    } = this.state;
    const payLoad = { amount };
    const { debitAccount: debitUser } = this.props;
    const responses = await debitUser(payLoad, accountnumber);

    if (responses.type === 'DEBIT_ERROR') {
      this.setState({ getErrors: responses.message, isLoading: false });
    }
    this.setState({ success: responses.payload.message, isLoading: false });
  };

  render() {
    const {
      credit, debit, getErrors, success, isLoading
    } = this.state;
    const ActiveClassName = 'credit-and-debit-active';
    const creditClass = credit ? ActiveClassName : '';
    const debitClass = debit ? ActiveClassName : '';

    return (
      <div className="card-account">
        <div className="credit-and-debit-header">
          <button
            type="submit"
            onClick={this.toggleDebit}
            className={`account-debit ${debitClass}`}
          >
            {' '}
            Debit Account
          </button>
          <button
            type="submit"
            onClick={this.toggleCredit}
            className={`account-credit ${creditClass}`}
          >
            {' '}
            Credit Account
          </button>
        </div>
        {credit ? (
          <div className="innerCard-account">
            <Form onSubmit={this.creditUser}>
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
                  type="number"
                  name="accountnumber"
                  id="accountnumber"
                  placeholder="Account Number"
                  onChange={this.handleCreditOnChange}
                  onFocus={this.onFocus}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Amount"
                  onChange={this.handleCreditOnChange}
                  onFocus={this.onFocus}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="depositor"
                  id="depositor"
                  placeholder="Depositor's Name"
                  onChange={this.handleCreditOnChange}
                  onFocus={this.onFocus}
                />
              </FormGroup>
              <Button block className="secondary-btn">
                {isLoading && <AppSpinner />}
                {!isLoading ? 'Credit Account' : ''}
              </Button>
            </Form>
          </div>
        ) : (
          <div className="innerCard-account">
            <Form onSubmit={this.debitUser}>
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
                  type="number"
                  name="accountnumber"
                  id="accountnumber"
                  onChange={this.handleDebitOnChange}
                  onFocus={this.onFocus}
                  placeholder="Account Number"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="number"
                  name="amount"
                  id="amount"
                  onChange={this.handleDebitOnChange}
                  onFocus={this.onFocus}
                  placeholder="Amount"
                />
              </FormGroup>
              <Button disabled={isLoading} block className="secondary-btn">
                {isLoading && <AppSpinner />}
                {!isLoading ? 'Debit Account' : ''}
              </Button>
            </Form>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account.items,
});

export default connect(
  mapStateToProps,
  {
    creditAccount,
    debitAccount,
  },
)(CreditAndDebit);
