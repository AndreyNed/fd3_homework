'use strict';

import React from 'react';
import { NavLink } from 'react-router-dom';

import './PagesLinks.scss';

class PagesLinks extends React.Component {

    cssClass =        'iAccount_main_menu';
    linkClass =       'iAccount_nav_link';
    linkClassActive = 'iAccount_nav_link_active';

    render() {
        return (
            <div className = { this.cssClass }>
                <NavLink to = "/" exact     className = { this.linkClass + ' main_menu_links' } activeClassName = { this.linkClassActive }>Главная</NavLink>
                <NavLink to = "/currency"   className = { this.linkClass + ' main_menu_links' } activeClassName = { this.linkClassActive }>Курсы валют</NavLink>
                <NavLink to = "/accounts"   className = { this.linkClass + ' main_menu_links' } activeClassName = { this.linkClassActive }>Счета</NavLink>
                <NavLink to = "/operations" className = { this.linkClass + ' main_menu_links' } activeClassName = { this.linkClassActive }>Операции</NavLink>
                <NavLink to = "/settings"   className = { this.linkClass + ' main_menu_links' } activeClassName = { this.linkClassActive }>Настройки</NavLink>
                <NavLink to = "/about"      className = { this.linkClass + ' main_menu_links' } activeClassName = { this.linkClassActive }>О системе</NavLink>
            </div>
        )
    }

}

export default PagesLinks;