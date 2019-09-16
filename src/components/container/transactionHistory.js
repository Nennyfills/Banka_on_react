import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import AppTable from '../global/appTable';
import transactionTableHeader from '../../utils/headerData';
import { transactionHistory } from '../../action/transaction';
import { getAccountByOwnerId } from '../../action/acounts';

// eslint-disable-next-line valid-jsdoc
/**
 * @description Transaction component
 *
 * @return {Void} return - return html
 */
class Transaction extends Component {
  static propTypes = {
    transactionHistory: PropTypes.func.isRequired,
    getAccountByOwnerId: PropTypes.func.isRequired,
    transaction: PropTypes.arrayOf(Object).isRequired,
    account: PropTypes.arrayOf(Object).isRequired,
  };

  state = {
    selectButtonOpen: false,
    ifAccount: false,
    header: transactionTableHeader,

  };

  componentDidMount() {
    this.showAccount();
    this.setAccountNumber();
  }

  toggleSelectButton = () => {
    this.setState(previousState => ({
      selectButtonOpen: !previousState.selectButtonOpen,
    }));
  };

  setAccountNumber = async (e) => {
    const { transactionHistory: getHistory } = this.props;
    const { accountnumber } = JSON.parse(e.target.value);
    await getHistory(accountnumber);
  };

  showAccount = async () => {
    const { getAccountByOwnerId: getUserAccount } = this.props;

    const userAccount = await getUserAccount();
    if (userAccount.payload) {
      this.setState({
        ifAccount: true,
      });
    } else {
      this.setState({
        ifAccount: false,
      });
    }
  };

  render() {
    const {
      header,
      ifAccount,
      selectButtonOpen,
    } = this.state;
    const { account } = this.props;
    const { transaction } = this.props;

    return (
      <div className=" pl-3 pr-3 mt-5">
        <div className="stats">
          <div className="actions center-account">
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
        </div>
        <AppTable
          size="sm"
          responsive
          hover
          borderless
          striped
          sortBy={this.handleSortBy}
          handleChange={this.handleRowChange}
          rowChecked={this.handleChecked}
          name
          tableHeaders={header}
          tableBody={transaction.data}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transaction: state.transaction.items,
  account: state.account.items,
});
export default connect(
  mapStateToProps,
  { transactionHistory, getAccountByOwnerId },
)(Transaction);
