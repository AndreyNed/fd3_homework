'use strict';

import React from 'react';
import { Route } from 'react-router-dom';

import PageAbout from './PageAbout/PageAbout';
import PageMain  from './PageMain/PageMain';
import PageCurrency from './PageCurrency/PageCurrency';
import PageAccounts from './PageAccounts/PageAccounts';
import PageOperations from './PageOperations/PageOperations';
import PageSettings from './PageSettings/PageSettings';

class PagesRouter extends React.Component {

    render() {
        return (
            <div>
                <Route path = "/" exact     component = { PageMain }/>
                <Route path = "/about"      component = { PageAbout }/>
                <Route path = "/currency"   component = { PageCurrency }/>
                <Route path = "/accounts"   component = { PageAccounts }/>
                <Route path = "/operations" component = { PageOperations }/>
                <Route path = "/settings"   component = { PageSettings }/>
            </div>
        )
    }

}

export default PagesRouter;
