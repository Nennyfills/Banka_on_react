import React from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  DropdownMenu,
  DropdownToggle,
  ButtonDropdown,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';

import './global.css';
import placeHolder from '../../../public/asset/nenny1.jpg';
import Hamburger from './hamburger';

const ToolBar = ({
  hamburger, logMeOut, ifOpen, toggle
}) => {
  const user = JSON.parse(sessionStorage.data);

  return (
    <Navbar className="navDesign" expand="xs">
      <div>
        <Hamburger click={hamburger} />
      </div>
      <Nav className="ml-auto" navbar>
        <NavItem className="welcome">
          <p>
            Welcome
            <span>{user.firstname}</span>
          </p>
        </NavItem>
        <NavItem className="userimage">
          <img src={placeHolder} alt="Loading..." />
        </NavItem>
        <NavItem>
          <NavLink>
            <ButtonDropdown isOpen={ifOpen} toggle={toggle}>
              <DropdownToggle caret>
                <i className="fas fa-sort-down design-toolbar-icon" />
              </DropdownToggle>
              <DropdownMenu style={{ marginLeft: '-6rem' }}>
                <DropdownItem onClick={logMeOut}>
                  <strong>
                    <i className="fas fa-sign-out-alt" />
                    Log out
                  </strong>
                </DropdownItem>
                <DropdownItem>
                  <strong>
                    <i className="far fa-user-circle" />
                      Profile
                  </strong>
                </DropdownItem>
                <DropdownItem>
                  <strong>
                    <i className="far fa-edit" />
                    Photo
                  </strong>
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

ToolBar.propTypes = {
  hamburger: PropTypes.func,
  logMeOut: PropTypes.func.isRequired,
  ifOpen: PropTypes.func.isRequired,
  toggle: PropTypes.string.isRequired,
};
ToolBar.defaultProps = {
  hamburger: '',
};
export default ToolBar;
