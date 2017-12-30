"use strict";

import React from 'react';
import ColorBox from '../components/ColorBox/ColorBox';

import {isExists, isNotEmpty, isNotNaN} from "../utils/utils";

import { COLORS } from "../config/constants";

require('./App.scss');

class App extends React.Component {

    constructor( props ) {
        super( props );
        this.state = props;
    }

    componentWillMount() {
        this.prepareState( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareState( newProps );
    }

    prepareState = ( props ) => {
        let state = { ...props };

    };

    render() {
        return (
            <div className="container">
                {
                    ( isNotEmpty( COLORS ) ) &&
                        <ColorBox>
                            { COLORS }
                        </ColorBox>
                }
            </div>
        );
    }
}
export default App;
