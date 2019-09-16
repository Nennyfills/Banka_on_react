
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ModalComponent from '../global/modalComponent';
import ShowError from '../global/handleError';
import ShowSuccess from '../global/handleSuccess';
import AppTable from '../global/appTable';
import data from '../../../mockData';
import { accountsTableHeader } from '../../utils/headerData';
import {
  getAllAccounts,
  deleteAccounts,
  activateAndDeactivateAccounts
} from '../../action/acounts';


let getAccountnumber;

// eslint-disable-next-line valid-jsdoc
/**
 * @description Home component
 *
 * @return {Void} return - return html
 */
class Accounts extends Component {
  static propTypes = {
    deleteAccounts: PropTypes.func.isRequired,
    getAllAccounts: PropTypes.func.isRequired,
    activateAndDeactivateAccounts: PropTypes.func.isRequired,
  };

  state = {
    Header: accountsTableHeader,
    data,
    modal: false,
    isLoading: false,
    success: '',
    getErrors: '',
    isActive: false,
    check: '',
  };

  componentDidMount() {
    this.getAccountNumber();
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  };

  toggleOnDelete = (accountnumber) => {
    getAccountnumber = accountnumber;
    this.setState(prevState => ({
      modal: !prevState.modal,
      check: 'delete',
      isLoading: false,
    }));
  };

  toggleOnActivateOrDeactivate = (accountnumber) => {
    getAccountnumber = accountnumber;
    this.setState(prevState => ({
      modal: !prevState.modal,
      check: 'activateOrDeactivate',
      isLoading: false,
    }));
  };

  deleteAccount = async () => {
    this.setState({ isLoading: true });
    const { deleteAccounts: performDeleteAction } = this.props;
    const response = await performDeleteAction(getAccountnumber);
    if (response.type === 'DELETE_ACCOUNTS_ERROR') {
      this.setState({
        isLoading: true,
        getErrors: response.message.data.message,
        modal: false,
      });
    }
    this.setState({
      isLoading: true,
      modal: false,
      success: response.payload.message,
    });
    getAccountnumber = null;
    this.getAccountNumber();
    this.myTimer();
  };

  activateAndDeactivateAccounts = async () => {
    this.setState({ isLoading: true });
    const { activateAndDeactivateAccounts: performAction } = this.props;
    const response = await performAction(getAccountnumber);
    if (response.type === 'ACTIVATE_AND_DEACTIVATE_ACCOUNTS_ERROR') {
      this.setState({
        isLoading: true,
        getErrors: response.message,
        modal: false,
      });
    }
    this.setState({
      isLoading: true,
      modal: false,
      success: response.payload.message,
    });
    getAccountnumber = null;

    this.getAccountNumber();
    this.myTimer();
  };

  getAccountNumber = async () => {
    const { getAllAccounts: getAccounts } = this.props;
    const accounts = await getAccounts();
    this.setState({
      data: accounts.payload,
    });
  };

  myTimer = () => {
    setTimeout(() => {
      this.setState({
        getErrors: '',
        success: '',
      });
    }, 4000);
  };

  render() {
    const {
      data: userData,
      Header,
      modal,
      isLoading,
      isActive,
      success,
      getErrors,
      check,
    } = this.state;
    return (
      <div className=" pl-3 pr-3 mt-5">
        <ModalComponent
          isOpen={modal}
          toggle={this.toggle}
          check={check}
          isLoading={isLoading}
          deleteAccount={this.deleteAccount}
          handleAction={this.activateAndDeactivateAccounts}
        />
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
        <AppTable
          size="sm"
          responsive
          hover
          borderless
          striped
          name
          tableHeaders={Header}
          tableBody={userData}
          deleteUser
          activateAndDeactivateUser
          performAction={this.toggleOnActivateOrDeactivate}
          deleteAccount={this.toggleOnDelete}
          isLoading={isLoading}
          isActive={isActive}
        />
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
    getAllAccounts,
    deleteAccounts,
    activateAndDeactivateAccounts
  },
)(Accounts);
