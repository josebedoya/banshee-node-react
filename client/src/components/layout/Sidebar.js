import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { Menu, Icon } from 'antd';

import logoBanshee from './../../assets/images/banshee-logo.svg';
import iconBanshee from './../../assets/images/banshee-isotipo.svg';

const SubMenu = Menu.SubMenu;

class AppSidebar extends Component {
  renderMenu = menuItems => {
    return menuItems.map((item, key) => {
      return item.sub
        ? this.renderSubMenuIconItem(item)
        : this.renderMenuIconItem(item);
    });
  };

  renderSubMenuIconItem = item => {
    return (
      <SubMenu
        key={item.key}
        title={this.renderMenuIconTitle(item.icon, item.title)}
      >
        {this.renderSubmenu(item.sub)}
      </SubMenu>
    );
  };

  renderSubmenu = submenu => {
    return submenu.map(data => (
      <Menu.Item key={data.key} className={this.getSelected(data.path)}>
        <Link to={data.path}>{data.title}</Link>
      </Menu.Item>
    ));
  };

  renderMenuIconItem = item => {
    return (
      <Menu.Item key={item.key} className={this.getSelected(item.path)}>
        <Link to={item.path}>
          {this.renderMenuIconTitle(item.icon, item.title)}
        </Link>
      </Menu.Item>
    );
  };

  renderMenuIconTitle = (icon, title) => {
    return (
      <span className='menuHolder'>
        <Icon type={icon} />
        <span className='nav-text'>{title}</span>
      </span>
    );
  };

  getSelected = path => {
    if (this.props.location.pathname === path) {
      return 'ant-menu-item-selected';
    }
  };

  render() {
    const { menuItems, isOpen, showOptions } = this.props;
    const sidebarClass = isOpen ? 'sidebar' : 'sidebar sidebar-collapsed';
    const logoApp = isOpen ? logoBanshee : iconBanshee;
    return (
      <aside className={sidebarClass}>
        <div className='app-logo'>
          <img src={logoApp} alt='logo' />
        </div>
        <div className='sidebar-content'>
          <div className='inner'>
            <div className='menu'>
              {showOptions && (
                <Menu
                  className='main-menu'
                  defaultOpenKeys={['sub1']}
                  mode='inline'
                  inlineCollapsed={!isOpen}
                >
                  {this.renderMenu(menuItems)}
                </Menu>
              )}
            </div>
          </div>
        </div>
      </aside>
    );
  }
}

AppSidebar.propTypes = {
  menuItems: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default withRouter(AppSidebar);
