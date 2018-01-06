'use strict';

import React from 'react';
import { Route } from 'react-router-dom';

import PageAbout from './PageAbout';
import PageMain  from './PageMain';
import PageAccounts from './PageAccounts';
import PageOperations from './PageOperations';

class PagesRouter extends React.Component {

    render() {
        return (
            <div>
                <Route path = "/" exact     component = { PageMain }/>
                {/*<Route path = "/main"       component = { PageMain }/>*/}
                <Route path = "/about"      component = { PageAbout }/>
                <Route path = "/accounts"   component = { PageAccounts }/>
                <Route path = "/operations" component = { PageOperations }/>
            </div>
        )
    }

}

export default PagesRouter;
