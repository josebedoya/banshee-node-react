import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Routes from '../routes/Routes';

import menuItems from './../../data/menu';

class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: true,
      windowWidth: window.innerWidth,
      showOptions: true
    };
  }

  componentDidMount() {
    this.onResizeWindowHandler();
  }

  onResizeWindowHandler = () => {
    window.addEventListener('resize', () => {
      this.setState({ windowWidth: window.innerWidth });
      this.responsiveSidebar();
    });
  };

  getWindowSize = () => {
    this.setState({ windowWidth: window.innerWidth });
    this.responsiveSidebar();
  };

  responsiveSidebar = () => {
    if (this.state.windowWidth <= 1024) {
      this.setState({ isSidebarOpen: false });
    } else {
      this.setState({ isSidebarOpen: true });
    }
  };

  menuButtonHandleClick = () => {
    this.setState(prevState => ({
      isSidebarOpen: !prevState.isSidebarOpen
    }));
  };

  render() {
    const { user } = this.props;
    const { isSidebarOpen, showOptions } = this.state;
    return (
      <div className='app-layout'>
        <Header
          user={user}
          isOpen={isSidebarOpen}
          showOptions={showOptions}
          onClick={this.menuButtonHandleClick}
        />
        <div className='layout'>
          <Sidebar
            menuItems={menuItems}
            isOpen={isSidebarOpen}
            showOptions={showOptions}
          />
          <div className='main-side'>
            <div className='content'>
              <div className='content-wrapper'>
                <Routes />
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

AppLayout.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  {}
)(AppLayout);
