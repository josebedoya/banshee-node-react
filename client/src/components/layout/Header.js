import React from 'react';
import { Avatar, Popover, Icon } from 'antd';

const content = () => (
  <div className='userDropdown'>
    <div className='dropdownLink logoutbtn'>
      <Icon type='poweroff' />
      Sign out
    </div>
  </div>
);

const Header = ({ isOpen, onClick, user }) => {
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
            content={content()}
          >
            <Avatar size='large' className='userAvatar' icon='user' />
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
