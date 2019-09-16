import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import './global.css';
import Logo from './logo';


/**
 * @description Side bar component
 *
 * @param {object} event  - object
 * @return {void}
 */
const Sidebar = () => {
  const isClient = sessionStorage.getItem('isClient');
  const isAdmin = sessionStorage.getItem('isAdmin');
  const isStaff = sessionStorage.getItem('isStaff');


  return (
    <div className="sidemenu">
      <Nav vertical>
        <Logo />

        <div className="Navlink">
          {isClient ? (
            <div>
              <NavItem>
                <NavLink to="/portal/client/profile" className="eachNavlink">
                  <i className="far fa-user-circle" />
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/portal/client/account/create"
                  className="eachNavlink"
                >
                  <i className="fas fa-plus-circle" />
                  Create Account
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/portal/client/transaction/history"
                  className="eachNavlink"
                >
                  <i className="fas fa-transgender-alt" />
                  Transaction History
                </NavLink>
              </NavItem>
            </div>
          ) : (
            ''
          )}
          {isAdmin || isStaff ? (
            <div>
              <NavItem>
                <NavLink to="/portal/dashboard" className="eachNavlink">
                  <i className="fas fa-tachometer-alt" />
                  Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/portal/accounts" className="eachNavlink">
                  <i className="far fa-user-circle" />
                  Accounts
                </NavLink>
              </NavItem>
            </div>
          ) : (
            ''
          )}
          {isAdmin ? (
            <div>
              <NavItem>
                <NavLink to="/portal/new" className="eachNavlink">
                  <i className="fas fa-plus-circle" />
                  Create Account
                </NavLink>
              </NavItem>
            </div>
          ) : (
            ''
          )}
          {isStaff ? (
            <div>
              <NavItem>
                <NavLink to="/portal/transaction" className="eachNavlink">
                  <i className="far fa-user-circle" />
                  Transaction
                </NavLink>
              </NavItem>
            </div>
          ) : (
            ''
          )}
        </div>
      </Nav>
    </div>
  );
};

export default Sidebar;
