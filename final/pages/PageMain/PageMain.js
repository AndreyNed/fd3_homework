import React from 'react';

import Clock from '../../components/Clock/Clock';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_PAGE_MAIN } from '../../config/config';

import './PageMain.scss';

class PageMain extends React.PureComponent {

    constructor( props ) {
        super( props );
        this.classCSS = 'PageMain';
        this.debugMode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_PAGE_MAIN;
    }

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debugMode ) &&
            console.log( 'PageMain: prepareData: props: ', props );
    };

    clockProps = () => {
        return {
            clockSide:      400,
            dialStroke:     'rgba(0,0,0,0)',
            dialFill:       'rgba(0,0,0,0)',
            indexStroke:    'rgba(141,182,205,1)',
            indexFill:      'rgba(141,182,205,1)',
            handSStroke:    'rgba(205,38,38,1)',
            handSFill:      'rgba(205,38,38,1)',
            handMStroke:    'rgba(39,64,139,1)',
            handMFill:      'rgba(39,64,139,1)',
            handHStroke:    'rgba(16,78,139,1)',
            handHFill:      'rgba(16,78,139,1)',
        }
    };

    /* == render functions == */

    render() {
        const props = this.clockProps();
        return (
            <div className = { this.classCSS }>
                <div className="wrapper">
                    <div className = { `${ this.classCSS }_clock_container` }>
                        <Clock { ...props } />
                    </div>
                </div>
            </div>
        )
    }
}

export default PageMain;
