import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Avatar, Popover, Icon } from 'antd';
import { logout } from './../../redux/actions/auth-actions';

const content = logout => (
  <div className='userDropdown'>
    <div className='dropdownLink logoutbtn' onClick={logout}>
      <Icon type='poweroff' />
      Logout
    </div>
  </div>
);

const Header = ({ isOpen, onClick, user, logout }) => {
  const headerClass = isOpen ? 'header' : 'header collapsed';
  return (
    <header className={headerClass}>
      <div className='headerLeft'>
        <div className='menu-box' onClick={onClick}>
          <div className='menu-inner'></div>
        </div>
      </div>

      <div className='headerRight'>
        <div className='name'>
          {user.name}
          <span>{user.email}</span>
        </div>
        <div className='user'>
          <Popover
            arrowPointAtCenter
            placement='bottomRight'
            content={content(logout)}
          >
            <Avatar size='large' className='userAvatar' icon='user' />
          </Popover>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
