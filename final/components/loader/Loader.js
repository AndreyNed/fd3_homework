'use strict';

import React from 'react';
import MatGlass from  '../MatGlass/MatGlass';
import { BrowserRouter } from 'react-router-dom';
import PagesRouter from '../../pages/PagesRouter';
import PagesLinks  from '../../pages/PagesLinks';

class Loader extends React.PureComponent {

    classCSS = 'Loader';

    render() {
        return (
            <div className = { this.classCSS }>
                <MatGlass />
                <BrowserRouter>
                    <div className = { this.classCSS + "_router" }>
                        <PagesLinks />
                        <PagesRouter />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default Loader;