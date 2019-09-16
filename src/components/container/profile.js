import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import '../main.css';
import nenny1 from '../../../public/asset/nenny1.jpg';
import { getAccountByOwnerId } from '../../action/acounts';

// eslint-disable-next-line valid-jsdoc
/**
 * @description Profile component
 *
 * @return {void}
 */
class Profile extends Component {
  static propTypes = {
    getAccountByOwnerId: PropTypes.func.isRequired,
    account: PropTypes.arrayOf.isRequired,
  };

  state = {
    selectButtonOpen: false,
    ifAccount: false,
    type: '',
    status: '',
    balance: '',
    accountnumber: '',
    response: '',
  };

  componentDidMount() {
    this.showAccount();
  }

  toggleSelectButton = () => {
    this.setState(previousState => ({
      selectButtonOpen: !previousState.selectButtonOpen,
    }));
  };

  setAccountNumber = (e) => {
    const {
      balance, status, type, accountnumber
    } = JSON.parse(e.target.value);
    sessionStorage.setItem('accountnumber', accountnumber);
    this.setState({
      balance,
      status,
      type,
      accountnumber,
    });
  };

  showAccount = async () => {
    const { getAccountByOwnerId: getUserAccount } = this.props;

    const userAccount = await getUserAccount();
    if (userAccount.payload) {
      this.setState({
        ifAccount: true,
        accountnumber: userAccount.payload[0].accountnumber,
        balance: userAccount.payload[0].balance,
        status: 'dormant',
        type: userAccount.payload[0].type,
      });
    } else {
      this.setState({
        ifAccount: false,
        response: 'You have no account',
      });
    }
  };

  render() {
    const user = JSON.parse(sessionStorage.data);
    const {
      selectButtonOpen,
      balance,
      status,
      type,
      accountnumber,
      response,
      ifAccount,
    } = this.state;
    const { account } = this.props;
    const statusClass = (status === 'active') ? 'success'
      : 'danger';
    return (
      <div className="frame">
        <div className="center">
          <div className="profile">
            <div className="image">
              <div className="circle-1" />
              <div className="circle-2" />
              <img src={nenny1} alt="Profileimage" />
            </div>

            <div className="userName">
              {user.firstname}
              {' '}
              {user.surname}
            </div>
            <div className="email">{user.email}</div>
            <div className="number">{user.phonenumber}</div>
          </div>
          <div className="stats">
            <div className="actions">
              <ButtonDropdown
                className="dropDownDesing"
                isOpen={selectButtonOpen}
                toggle={this.toggleSelectButton}
              >
                <DropdownToggle caret className="dropDownFirstChild">
                  Select An account
                </DropdownToggle>
                <DropdownMenu className="dropDownChild">
                  {ifAccount
                    ? account.map(value => (
                      <DropdownItem
                        key={value.id}
                        value={JSON.stringify(value)}
                        onClick={this.setAccountNumber}
                      >
                        {value.accountnumber}
                      </DropdownItem>
                    ))
                    : null}
                </DropdownMenu>
              </ButtonDropdown>
            </div>
            {ifAccount ? (
              <div className="box">
                <span className="value">Account Number</span>
                <span className="parameter">{accountnumber}</span>
                <span className="value">Balance</span>
                <span className="parameter">{balance}</span>
                <span className="value">Type</span>
                <span className="parameter">{type}</span>
                <span className="value">Account Status</span>
                <p className="parameter">
                  <span className={`badge badge-${statusClass} mr-4 ml-4`}>
                    {status}
                  </span>
                </p>
              </div>
            ) : (
              <div className="box">
                <p className="value">{response}</p>
                <p className="value">
                  <Link to="/portal/client/account/create">
                    Click Here
                  </Link>
                </p>
                <p>
                    to create an account
                </p>
              </div>
            )}
          </div>
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
  { getAccountByOwnerId },
)(Profile);
