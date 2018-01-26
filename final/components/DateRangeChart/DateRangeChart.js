'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_DATE_RANGE_CHART } from "../../config/config";

import {
    acCurrencyDynamicLoadStart,
    acCurrencyDynamicLoadSuccess,
    acCurrencyDynamicLoadError,
    acCurrencySetDynamicCurrencyData,
    acCurrencyDynamicSelect,
} from "../../actions/acCurrency";

import { fCurrencyDynamicRates } from "../../network/fCurrency";

import './DateRangeChart.scss';
import {isNotEmpty} from "../../utils/utils";

class DateRangeChart extends React.PureComponent {

    static propTypes = {
        currencyDynamicSource:          PropTypes.arrayOf(
            PropTypes.shape({
                Cur_ID:                 PropTypes.number,
                Date:                   PropTypes.string,
                Cur_OfficialRate:       PropTypes.number,
            })
        ),
        currencyDynamicData:            PropTypes.arrayOf(
            PropTypes.shape({
                Cur_ID:                 PropTypes.number,
                Date:                   PropTypes.objectOf( Date ),
                Cur_OfficialRate:       PropTypes.number,
            })
        ),
        currencyDynamicLoadStatus:      PropTypes.number,
        currencyDynamicPrepareStatus:   PropTypes.number,
        currencyDynamicStartDate:       PropTypes.objectOf( Date ),
        currencyDynamicEndDate:         PropTypes.objectOf( Date ),
    };

    static defaultProps = {

    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'DateRangeChart_' + DateRangeChart.classID;
    };

    constructor( props ) {
        super( props );
        DateRangeChart.classID++;
        this.state = {
            htmlID: DateRangeChart.getHtmlID( props.htmlID ),
        };
        this.debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_DATE_RANGE_CHART;
        this.classCSS = 'DateRangeChart';
    }

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'DateRangeChart: prepareData: new props: ', props )

        const {
            dispatch,
            currencyDynamicSource,
            currencyDynamicData,
            currencyDynamicLoadStatus,
            currencyDynamicPrepareStatus,
            currencyDynamicStartDate,
            currencyDynamicEndDate,
        } = props;

        if ( !currencyDynamicLoadStatus ) {
            fCurrencyDynamicRates( dispatch, null, null, {
                Cur_ID: 145, startDate: '2017-1-1', endDate: '2017-12-31'
            } )
        }

        if ( currencyDynamicLoadStatus === 2 && !currencyDynamicPrepareStatus ) {
            this.prepareDynamicRatesData( currencyDynamicSource );
        }
    };

    prepareDynamicRatesData = ( currencyDynamicSource ) => {
        const { dispatch } = this.props;
        let currencyDynamicData = ( isNotEmpty( currencyDynamicSource ) )
            ? currencyDynamicSource.map( ( item ) => {
                let date = new Date( Date.parse( item.Date ) );
                return {
                    ...item,
                    Date: date,
                }
            } )
            : currencyDynamicSource;
        dispatch( acCurrencySetDynamicCurrencyData( currencyDynamicData ) );
    };

    render() {
        const { currencyDynamicLoadStatus, currencyDynamicPrepareStatus } = this.props;
        return (
            <div className = { this.classCSS }>
                DateRangeChart
                {
                    ( currencyDynamicLoadStatus === 2 ) &&
                    "*** The data is loaded ***"
                }
                {
                    ( currencyDynamicPrepareStatus === 2 ) &&
                        "*** The data is prepared ***"
                }
            </div>
        )
    }

}

const mapStateToProps = function ( state ) {
    return {
        currencyDynamicSource:          state.currency.currencyDynamicSource,
        currencyDynamicData:            state.currency.currencyDynamicData,
        currencyDynamicLoadStatus:      state.currency.currencyDynamicLoadStatus,
        currencyDynamicPrepareStatus:   state.currency.currencyDynamicPrepareStatus,
        currencyDynamicStartDate:       state.currency.currencyDynamicStartDate,
        currencyDynamicEndDate:         state.currency.currencyDynamicEndDate,

        matGlassIsVisible:              state.ui.matGlassIsVisible,
    }
};

export default connect( mapStateToProps )( DateRangeChart );