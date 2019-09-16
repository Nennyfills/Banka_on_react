/* eslint-disable react/destructuring-assignment */
import { Container, Row } from 'reactstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

import routes from '../../router';
import ToolBar from '../global/toolbar';
import Sidebar from '../global/sidebar';
import footer from '../global/footer';
import '../main.css';

const { MainFooter } = footer;

/**
 * @description Home component
 *
 * @return {Void} return - return html
 */
class Home extends Component {
  static propTypes = {
    location: PropTypes.arrayOf.isRequired,
    history: PropTypes.arrayOf.isRequired,
  };

  state = {
    sideBarOpen: false,
    toolsOpen: false,
  };

  componentDidMount() {}

  toggleSidebar = () => {
    this.setState(previousState => ({
      sideBarOpen: !previousState.sideBarOpen,
    }));
  };

  logOut = () => {
    const { location, history } = this.props;
    sessionStorage.removeItem('isClient');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('isStaff');
    sessionStorage.removeItem('accountnumber');
    sessionStorage.removeItem('data');
    history.push('/');
    location.reload();
  };

  toggleTools = () => {
    const { toolsOpen } = this.state;
    this.setState({
      toolsOpen: !toolsOpen,
    });
  };

  render() {
    const { sideBarOpen } = this.state;
    let sidebar;
    if (sideBarOpen) {
      sidebar = <Sidebar />;
    }
    // const token = localStorage.getItem('token');
    const isLoggedIn = sessionStorage.getItem('isClient')
      || sessionStorage.getItem('isAdmin')
      || sessionStorage.getItem('isStaff');
    const isAuth = isLoggedIn;
    const page = isAuth ? (
      <div className="profile-body">
        <ToolBar
          hamburger={this.toggleSidebar}
          ifOpen={this.state.toolsOpen}
          toggle={this.toggleTools}
          logMeOut={this.logOut}
        />
        <div className="smallScreenSidebar">{sidebar}</div>
        <div className="bigScreenSidebar">
          <Sidebar />
        </div>
        <div className="content-area">
          <Row>
            <Container>
              <Switch>
                {routes.map(route => (route.component ? (
                  <Route
                    key={route.name}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => <route.component {...props} />}
                  />
                ) : null))}
              </Switch>
            </Container>
          </Row>
        </div>
        <MainFooter />
      </div>
    ) : (
      <Redirect to="/" />
    );
    return <div>{page}</div>;
  }
}
export default connect()(Home);
