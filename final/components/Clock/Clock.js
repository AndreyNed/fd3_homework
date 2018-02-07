import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_CLOCK } from "../../config/config";
import { DATA_TYPES } from "../../data_const/data_const";
import '../../utils/utils';

import './Clock.scss';

class Clock extends React.PureComponent {

    static propTypes = {
        clockSide:              PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        viewBox:                PropTypes.string,
        preserveAspectRatio:    PropTypes.string,
        dialStroke:             PropTypes.string,
        dialFill:               PropTypes.string,
        indexStroke:            PropTypes.string,
        indexFill:              PropTypes.string,
        handSStroke:            PropTypes.string,
        handSFill:              PropTypes.string,
        handMStroke:            PropTypes.string,
        handMFill:              PropTypes.string,
        handHStroke:            PropTypes.string,
        handHFill:              PropTypes.string,
        nailStroke:             PropTypes.string,
        nailFill:               PropTypes.string,
    };

    static defaultProps = {
        clockSide:              200,
        viewBox:                '0 0 200 200',
        preserveAspectRatio:    'xMidYMid meet',
        dialStroke:             '#898989',
        dialFill:               '#e3e3e3',
        indexStroke:            '#898989',
        indexFill:              '#e3e3e3',
        handSStroke:            '#898989',
        handSFill:              '#e3e3e3',
        handMStroke:            '#898989',
        handMFill:              '#e3e3e3',
        handHStroke:            '#898989',
        handHFill:              '#e3e3e3',
        nailStroke:             '#898989',
        nailFill:               '#e3e3e3',
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'Clock_' + Clock.classID;
    };

    constructor( props ) {
        super( props );
        Clock.classID++;
        const degrees = this.getDegrees();
        this.state = {
            htmlID: Clock.getHtmlID( props.htmlID ),
            degreeS: degrees.s,
            degreeM: degrees.m,
            degreeH: degrees.h,
        };
        this.t = null;
        this.debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_CLOCK;
        this.classCSS = 'Clock';
    }

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentDidMount() {
        this.startClock();
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    componentDidUpdate() {
        //console.log( 'didUpdate' );
        //this.startClock();
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
        console.log( 'Clock: prepareData: new props: ', props )

        // todo
    };

    /* == action functions == */

    startClock = () => {
        // console.log( 'startClock' );
        let d = new Date();
        const s = d.getTime();
        let ms = s % 1000;
        ms = ( ms !== 0 ) ? ms : 1;
        const degrees = this.getDegrees();
        setTimeout(
            () => {
                this.handS.style.cssText = "transform-origin: 50% 50%;transform: rotate(" +  degrees.s + "deg)";
                this.handM.style.cssText = "transform-origin: 50% 50%;transform: rotate(" +  degrees.m + "deg)";
                this.handH.style.cssText = "transform-origin: 50% 50%;transform: rotate(" +  degrees.h + "deg)";
                // console.log( degrees );
                this.startClock();
            }, ( 1000 - ms )
        );
    };

    /* == service functions == */

    getDegrees = () => {
        let d = new Date();
        let s = d.getSeconds() * 6;
        let m = d.getMinutes() * 6 + 6 * ( s / 360 );
        let h = d.getHours() * 30 + 30 * ( m / 360 );
        return { s, m, h };
    };

    /* == render functions == */

    renderHands = () => {
        const degrees = this.getDegrees();
        const {
            handSStroke,
            handSFill,
            handMStroke,
            handMFill,
            handHStroke,
            handHFill,
            nailStroke,
            nailFill,
        } = this.props;

        /*transform = { `rotate(${ degrees.m }, 100, 100)` }*/
        /*transform = { `rotate(${ degrees.h }, 100, 100)` }*/

        const handH = <path key = { 1 }
                            ref = { ( elm ) => { this.handH = elm } }
                            d="M 97 105 L 98 35 H 103 L 103 105 Z"
                            stroke = { handHStroke }
                            strokeWidth="1"
                            fill = { handHFill }
                             />;;

        const handM = <path key = { 2 }
                            ref = { ( elm ) => { this.handM = elm } }
                            d="M 97 110 L 98 15 H 102 L 103 110 Z"
                            stroke = { handMStroke }
                            strokeWidth="1"
                            fill = { handMFill }
                            />;

        /*transform = { `rotate(${ degrees.s }, 100, 100)` }*/

        const handS = <path key = { 3 }
                            ref = { ( elm ) => { this.handS = elm } }
                            d="M 98 110 L 99 5 H 101 L 102 110 Z"
                            stroke = { handSStroke }
                            strokeWidth="1"
                            fill = { handSFill }
                             />;

        const nail = <circle key = { 4 }
                            cx="100"
                            cy="100"
                            r="5"
                            stroke = { nailStroke }
                            strokeWidth="1"
                            fill = { nailFill } />;

        return (
            <g>
                { handH }
                { handM }
                { handS }
                { nail }
            </g>
        )
    };

    renderDial = () => {
        const { dialStroke, dialFill, indexStroke, indexFill } = this.props;
        let indexes = [];
        for ( let i = 0; i < 60; i++ ) {
            const g = i * 6;
            let index = ( i % 5 > 0 )
                ?
                <path key = { i }
                        d="M 99 0.5 H 101 L 101 5.5 H 99 Z"
                        stroke = { indexStroke }
                        strokeWidth="1"
                        fill = { indexFill }
                        transform = { `rotate(${ g }, 100, 100)` }
                />
                :
                <path key = { i }
                      d="M 98 0.5 H 102 L 102 15.5 H 98 Z"
                      stroke = { indexStroke }
                      strokeWidth="1"
                      fill = { indexFill }
                      transform = { `rotate(${ g }, 100, 100)` }
                />;
            indexes.push(
                index
            );
        }
        return (
            <g>
                <circle cx="100"
                        cy="100"
                        r="99"
                        stroke = { dialStroke }
                        strokeWidth = "1"
                        fill = { dialFill } />
                { indexes }
            </g>
        )
    };

    render() {
        const { clockSide, viewBox, preserveAspectRatio } = this.props;
        return (
            <div className = { this.classCSS }
                 style = {{
                     width: ( clockSide !== 0 )
                        ? clockSide
                        : 'auto',
                     height: ( clockSide !== 0 )
                        ? clockSide
                        : 'auto',
                 }}>
                <svg className = { `${ this.classCSS }_dial` }
                     width =   "100%"
                     height =  "100%"
                     viewBox = { viewBox }
                     preserveAspectRatio = { preserveAspectRatio }
                     xmlns =   "http://www.w3.org/2000/svg">
                    { this.renderDial() }
                    { this.renderHands() }
                </svg>

            </div>
        )
    }

}

export default Clock;