import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../main.css';
import nenny1 from '../../../public/asset/nenny1.jpg';
import { getAllAccounts } from '../../action/acounts';

// eslint-disable-next-line valid-jsdoc
/**
 * @description Dashboard component
 *
 * @return {void}
 */
class Dashboard extends Component {
  static propTypes = {
    getAllAccounts: PropTypes.func.isRequired,
  };

  state = {
    selectButtonOpen: false,
    numsOfAccounts: '',
    numsOfActiveAccount: '',
    numsOfDormantAccount: '',
  };

  componentDidMount() {
    this.getNumberOfAccountNumber();
  }

  toggleSelectButton = () => {
    this.setState(previousState => ({
      selectButtonOpen: !previousState.selectButtonOpen,
    }));
  };

  getNumberOfAccountNumber = async () => {
    const { getAllAccounts: getAccount } = this.props;
    const accounts = await getAccount();
    if (accounts.payload) {
      const numsOfActive = accounts.payload.filter(account => account.status === 'active');
      const numsOfDormant = accounts.payload.filter(account => account.status === 'dormant');

      this.setState({
        numsOfAccounts: accounts.payload.length,
        numsOfActiveAccount: numsOfActive.length,
        numsOfDormantAccount: numsOfDormant.length,
      });
    }
  };

  render() {
    const user = JSON.parse(sessionStorage.data);
    const {
      numsOfActiveAccount,
      numsOfDormantAccount,
      numsOfAccounts,
    } = this.state;
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
            <div className="box">
              <span className="value">Accounts</span>
              <span className="parameter">
                {numsOfAccounts}
                {' '}
                Accounts
              </span>
            </div>
            <div className="box">
              <span className="value">Active accounts</span>
              <span className="parameter">
                {numsOfActiveAccount}
                {' '}
                Active Accounts
              </span>
            </div>
            <div className="box">
              <span className="value">Dormant accounts</span>
              <span className="parameter">
                {numsOfDormantAccount}
                {' '}
                Dormant Accounts
              </span>
            </div>
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
  { getAllAccounts },
)(Dashboard);
