"use strict";

import React from 'react';

import AdminPanel from '../components/AdminPanel/AdminPanel';

require('./App.scss');

class App extends React.Component {

    render() {
        let props = {
            test: 'test',
        };
        return (
            <div className="IShop_wrapper">
                <div className="IShop_header border">

                </div>
                <AdminPanel { ...props }/>
            </div>
        );
    }
}
export default App;
