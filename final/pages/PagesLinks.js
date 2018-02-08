import React from 'react';
import { NavLink } from 'react-router-dom';

import './PagesLinks.scss';

class PagesLinks extends React.Component {

    constructor( props ) {
        super( props );
        this.classCSS =        'iAccount_header';
        this.menuCSSClass =    'iAccount_main_menu';
        this.linkClass =       'iAccount_nav_link';
        this.linkClassActive = 'iAccount_nav_link_active';
    }

    /* == render functions == */

    renderLogo = () => {
        return (
            <div className = { `${ this.classCSS }_logo` }>
                <span className = { `${ this.classCSS }_logo_title` }
                      key="title">
                    iAccount
                </span>
                <span className = { `${ this.classCSS }_logo_subtitle` }
                      key="subtitle">
                    управление домашними финансами
                </span>
            </div>
        )
    };

    renderMenu = () => {
        return (
            <div className = { this.menuCSSClass }>
                <NavLink to = "/" exact     className = { this.linkClass + ' main_menu_links' } activeClassName = { this.linkClassActive }>Главная</NavLink>
                <NavLink to = "/currency"   className = { this.linkClass + ' main_menu_links' } activeClassName = { this.linkClassActive }>Курсы валют</NavLink>
                <NavLink to = "/accounts"   className = { this.linkClass + ' main_menu_links' } activeClassName = { this.linkClassActive }>Счета</NavLink>
                <NavLink to = "/operations" className = { this.linkClass + ' main_menu_links' } activeClassName = { this.linkClassActive }>Операции</NavLink>
                <NavLink to = "/settings"   className = { this.linkClass + ' main_menu_links' } activeClassName = { this.linkClassActive }>Настройки</NavLink>
                <NavLink to = "/about"      className = { this.linkClass + ' main_menu_links' } activeClassName = { this.linkClassActive }>О системе</NavLink>
            </div>
        )
    };

    render() {
        return (
            <div className = { this.classCSS }>
                <div className = { `${ this.classCSS }_logo_bar` }
                     key="logo">
                    { this.renderLogo() }
                </div>
                <div className = { `${ this.classCSS }_menu_bar` }
                     key="menu">
                    { this.renderMenu() }
                </div>
            </div>
        )
    }

}

export default PagesLinks;